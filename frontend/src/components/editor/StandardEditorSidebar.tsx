import SpaceWorld from "../SpaceWorld";
import {convertWorldToEditorModel, World} from "../../core/strategyCore/models/world";
import RaisedButton from "material-ui/RaisedButton";
import {
    getInvalidProgramReasonDisplayName,
    InvalidProgramReason
} from "../../core/strategyCore/enums/invalidProgramReason";
import {Toggle} from "material-ui";
import {ErrorMessage} from "../uiComponents/ErrorMessage";
import {getUserProgramErrorDisplayName, UserProgramError} from "../../core/strategyCore/enums/userProgramError";
import {ResultMessage} from "../uiComponents/ResultMessage";
import React from "react";
import {translate} from "../../localization";
import {IRoboAst} from "../../core/strategyCore/models/programTypes";
import {
    BattleResult,
    getBattleResultMessage,
    getMessageTypeForResult
} from "../../core/strategyCore/battleRunner/BattleResult";

export interface IStandardEditorSidebarDataProps {
    readonly world: World;
    readonly shouldShowMinimap: boolean;
    readonly validationResult: InvalidProgramReason;
    readonly runtimeError: UserProgramError;
    readonly shouldShowExportAst: boolean;
    readonly codeError: string | null;
    readonly roboAst: IRoboAst;
    readonly isCodeEditorShown: boolean;
    readonly battleResult: BattleResult | null;
    readonly canRunBattle: boolean;
}

export interface IStandardEditorSidebarCallbackProps {
    readonly onRunBattle: () => void;
    readonly onReset: () => void;
    readonly onShowHelp: () => void;
    readonly onShowCodeEditor: () => void;
    readonly onHideCodeEditor: () => void;
    readonly onShowMap: () => void;
    readonly onCodeSubmit: (() => void) | undefined;
}

type Props = IStandardEditorSidebarDataProps & IStandardEditorSidebarCallbackProps;

export const StandardEditorSidebar = (props: Props) => (
    <span>
        {props.shouldShowMinimap &&
            <SpaceWorld
              fields={convertWorldToEditorModel(props.world)}
              width={200}
            />
        }
        {props.canRunBattle &&
            <RaisedButton
              label={translate('editor.runBattle')}
              disabled={props.validationResult !== InvalidProgramReason.None || !!props.codeError}
              primary
              style={{margin: 2, minWidth: 50}}
              onClick={props.onRunBattle}
            />
        }
        {!!props.onCodeSubmit &&
            <RaisedButton
              label={translate('editor.submitCode')}
              disabled={props.validationResult !== InvalidProgramReason.None || !!props.codeError}
              primary
              style={{ margin: 2, minWidth: 50 }}
              onClick={props.onCodeSubmit}
            />
        }
        <RaisedButton
            label={'reset'}
            secondary
            style={{margin: 2, minWidth: 50}}
            onClick={props.onReset}
        />
        {props.shouldShowExportAst &&
        <RaisedButton
          label={'ast to console'}
          style={{margin: 2, minWidth: 50}}
          onClick={() => console.log(JSON.stringify(props.roboAst))}
        />
        }
        <RaisedButton
            label={translate('editor.showHelp')}
            style={{margin: 2, minWidth: 50}}
            onClick={props.onShowHelp}
        />
                    <Toggle
                        toggled={props.isCodeEditorShown}
                        label={translate('editor.useCodeEditor')}
                        labelStyle={{color: 'black'}}
                        onToggle={props.isCodeEditorShown ? props.onHideCodeEditor : props.onShowCodeEditor}
                    />
                        <RaisedButton
                            label={translate('editor.showMap')}
                            secondary
                            style={{margin: 2, minWidth: 50}}
                            onClick={props.onShowMap}
                        />
                    <ErrorMessage>
                        {getUserProgramErrorDisplayName(props.runtimeError)}
                    </ErrorMessage>
                    <ErrorMessage>
                        {
                            props.validationResult !== InvalidProgramReason.None ?
                                getInvalidProgramReasonDisplayName(props.validationResult) :
                                undefined
                        }
                    </ErrorMessage>
                    <ErrorMessage>
                        {props.codeError || undefined}
                    </ErrorMessage>
                    <ResultMessage type={getMessageTypeForResult(props.battleResult || undefined)}>
                        {getBattleResultMessage(props.battleResult || undefined)}
                    </ResultMessage>
                </span>
);
