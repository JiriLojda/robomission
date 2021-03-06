import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {translate} from "../../localization";

interface IHelpModalProps {
    readonly title: string;
    readonly message: string | JSX.Element;
    readonly isOpened: boolean;
    readonly onClose: () => void;
}

const getModalActions = (onClose: () => void) => [
    <FlatButton
        label={translate('Close')}
        primary={true}
        onClick={onClose}
    />,
];

export const HelpModal: React.ComponentType<IHelpModalProps> = props =>
    (<Dialog
        title={props.title}
        open={props.isOpened}
        actions={getModalActions(props.onClose)}
        onRequestClose={props.onClose}
        autoScrollBodyContent
    >
        {props.message}
    </Dialog>);
