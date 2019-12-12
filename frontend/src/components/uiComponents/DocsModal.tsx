import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {translate} from "../../localization";

interface IDocsModalProps {
    readonly title: string;
    readonly message: string | JSX.Element;
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly showNext: boolean;
    readonly onShowNext: () => void;
    readonly nextTitle: string | undefined;
    readonly showPrev: boolean;
    readonly onShowPrev: () => void;
    readonly prevTitle: string | undefined;
}

const getModalActions = (props: IDocsModalProps) => [
    props.showPrev ? (
            <FlatButton
                label={`Previous: ${props.prevTitle || ''}`}
                primary={false}
                onClick={props.onShowPrev}
            />
        ) : undefined,
    props.showNext ? (
        <FlatButton
            label={`Next: ${props.nextTitle || ''}`}
            primary={false}
            onClick={props.onShowNext}
        />
    ) : undefined,
    <FlatButton
        label={translate('Close')}
        primary={true}
        onClick={props.onClose}
    />,
].filter(action => action !== undefined) as any[];

export const DocsModal: React.ComponentType<IDocsModalProps> = props =>
    (<Dialog
        title={props.title}
        open={props.isOpened}
        actions={getModalActions(props)}
        onRequestClose={props.onClose}
        autoScrollBodyContent
    >
        {props.message}
    </Dialog>);
