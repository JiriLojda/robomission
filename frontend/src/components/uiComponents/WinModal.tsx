import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {translate} from "../../localization";
import {Link} from "react-router-dom";

type NextLevel = {link: string; name: string};

interface IWinModalProps {
    readonly message: string;
    readonly nextLevel?: NextLevel;
    readonly isOpened: boolean;
    readonly onClose: () => void;
}

const getModalActions = (onClose: () => void, nextLevel?: NextLevel) => [
    nextLevel && <Link to={nextLevel.link} title={nextLevel.name} ><FlatButton
        label={`${translate('winModal.nextLevelLink')}: ${nextLevel.name}`}
        primary
    /></Link>,
    <FlatButton
        label={translate('Close')}
        primary={!nextLevel}
        onClick={onClose}
    />,
].filter(action => !!action) as JSX.Element[];

export const WinModal: React.ComponentType<IWinModalProps> = props =>
    (<Dialog
        title={translate('winModal.title')}
        open={props.isOpened}
        actions={getModalActions(props.onClose, props.nextLevel)}
        onRequestClose={props.onClose}
        autoScrollBodyContent
    >
        {props.message}
    </Dialog>);
