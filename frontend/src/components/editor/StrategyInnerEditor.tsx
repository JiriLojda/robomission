import CodeEditor from "./CodeEditor";
import StrategyRoboCodeHighlighter from "../../core/strategyCore/codeEditor/strategyRoboCodeHighlighter";
import * as ReactBlocklyComponent from "react-blockly-component";
import {generateBlocklyXml} from "../../core/strategyCore/codeEditor/xmlGenerator/blocklyXmlGenerator";
import React from "react";
import {IRoboAst} from "../../core/strategyCore/models/programTypes";
import {InvalidProgramReason} from "../../core/strategyCore/enums/invalidProgramReason";
import {generateStrategyRoboCode} from "../../core/strategyCore/codeEditor/codeGenerator/strategyRoboCodeGenerator";
import {parseStrategyRoboCode} from "../../core/strategyCore/codeEditor/parser/strategyParser";
import {isRoboAstValid, IValidatorResult} from "../../core/strategyCore/validator/programValidator";
import {getValidatorResult} from "../../core/strategyCore/validator/programValidationUtils";
import {List} from "immutable";
import {RoboAstValidator} from "../../core/strategyCore/battleRunner/IGameLevel";
import {blocklyXmlToRoboAst} from "../../core/blockly";
import {BlocklyToolbox} from "../../core/strategyCore/constants/strategyToolbox";
import {BlocklyEditor} from "react-blockly-component";

export interface INewEditorDataProps {
    readonly showCodeEditor: boolean;
    readonly roboAst: IRoboAst;
    readonly additionalValidators: List<RoboAstValidator>;
    readonly toolbox: BlocklyToolbox;
    readonly height: number;
    readonly isReadOnly: boolean;
    readonly highlightedLine: number | undefined;
}

export interface INewEditorCallbackProps {
    readonly onRoboAstChanged: (roboAst: IRoboAst) => void;
    readonly onSyntaxErrorRaised: (error: InvalidProgramReason) => void;
    readonly onCodeErrorRaised: (error: string) => void;
    readonly onCodeErrorCleared: () => void;
}

type Props = INewEditorDataProps & INewEditorCallbackProps;

interface IState {
    readonly code: string;
    readonly editedAst: IRoboAst;
}

const getBlocklyWorkspace = (editor: BlocklyEditor) =>
    editor.refs.workspace.state.workspace;

const blockIdRegex = /"blockId":"[^"]+"|"blockId":null/g;
const areSameExcludingIds = (firstAst: IRoboAst, secondAst: IRoboAst): boolean => {
    const firstSerialized = JSON.stringify(firstAst).replace(blockIdRegex, '');
    const secondSerialized = JSON.stringify(secondAst).replace(blockIdRegex, '');

    return firstSerialized === secondSerialized;
};

export class StrategyInnerEditor extends React.PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            code: props.showCodeEditor ? generateStrategyRoboCode(props.roboAst) : '',
            editedAst: props.roboAst,
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (prevProps.height !== this.props.height && this.blocklyEditor) {
            this.blocklyEditor.resize();
        }
        if (prevProps.showCodeEditor !== this.props.showCodeEditor) {
            this.setState({code: generateStrategyRoboCode(this.props.roboAst)});
        }
        if (
            !areSameExcludingIds(this.state.editedAst, this.props.roboAst) &&
            !areSameExcludingIds(prevProps.roboAst, this.props.roboAst)
        ) {
            if (this.props.showCodeEditor) {
                this.setState({code: generateStrategyRoboCode(this.props.roboAst), editedAst: this.props.roboAst});
            } else {
                this._updateBlockly(this.props.roboAst);
            }
        }
    }

    private blocklyEditor: BlocklyEditor | null = null;

    private _updateBlockly(roboAst: IRoboAst) {
        if (!this.blocklyEditor) {
            return;
        }

        this.setState({editedAst: roboAst});
        const xml = generateBlocklyXml(roboAst);
        getBlocklyWorkspace(this.blocklyEditor).clear();
        this.blocklyEditor.importFromXml(xml);
    }

    private _onValidationFinished = (validationResult: IValidatorResult, newAst: IRoboAst): void => {
        this.props.onSyntaxErrorRaised(validationResult.reason);

        if (!areSameExcludingIds(newAst, this.props.roboAst)) {
            this.setState({editedAst: newAst});
            this.props.onRoboAstChanged(newAst);
        }
    };

    private _onXmlChange = (e: unknown) => {
        const roboAst = blocklyXmlToRoboAst(e);
        const validationResult = isRoboAstValid(roboAst);
        const withAdditionalValidation = !validationResult.isValid ?
            validationResult :
            this.props.additionalValidators
                .reduce(
                    (found, validator) => !found.isValid ? found : validator(roboAst),
                    getValidatorResult(true, InvalidProgramReason.None)
                );

        this._onValidationFinished(withAdditionalValidation, roboAst);
    };

    private _onCodeChange = (code: string) => {
        this.setState(() => ({code: code }));
        const parseResult = parseStrategyRoboCode(code);
        if (!parseResult.isSuccessful) {
            this.props.onCodeErrorRaised(parseResult.error);
            return;
        } else {
            this.props.onCodeErrorCleared();
            const validationResult = isRoboAstValid(parseResult.result);
            const withAdditionalValidation = !validationResult.isValid ?
                validationResult :
                this.props.additionalValidators
                    .reduce(
                        (found, validator) => !found.isValid ? found : validator(parseResult.result),
                        getValidatorResult(true, InvalidProgramReason.None)
                    );
            this._onValidationFinished(withAdditionalValidation, parseResult.result);
        }
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div style={{width: '100%', height: `${this.props.height}px`}}>
            {
                this.props.showCodeEditor ? (<CodeEditor
                        code={this.state.code || ''}
                        onChange={this._onCodeChange}
                        highlighter={new StrategyRoboCodeHighlighter()}
                        isReadOnly={this.props.isReadOnly}
                        highlightedLine={this.props.highlightedLine && this.props.highlightedLine - 1}
                    />
                ) : (
                    <ReactBlocklyComponent.BlocklyEditor
                        key={`${this.props.isReadOnly}`}
                        ref={ref => {
                            this.blocklyEditor = ref;
                        }}
                        workspaceConfiguration={{trashcan: true, collapse: true, readOnly: this.props.isReadOnly}}
                        toolboxCategories={this.props.toolbox}
                        initialXml={generateBlocklyXml(this.props.roboAst)}
                        xmlDidChange={this._onXmlChange}
                        wrapperDivClassName="strategy-blokly"
                    />)
            }
        </div>
    }
}

