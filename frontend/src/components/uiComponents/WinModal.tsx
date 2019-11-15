import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {translate} from "../../localization";
import {Link} from "react-router-dom";

type NextLevel = { link: string; name: string };

interface IWinModalProps {
    readonly message: string;
    readonly nextLevel?: NextLevel;
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly durationSeconds: number;
}

const getModalActions = (onClose: () => void, nextLevel?: NextLevel) => [
    nextLevel && <Link to={nextLevel.link} title={nextLevel.name}><FlatButton
      label={`${translate('winModal.nextLevelLink')}: ${nextLevel.name}`}
      primary
    /></Link>,
    <FlatButton
        label={translate('Close')}
        primary={!nextLevel}
        onClick={onClose}
    />,
].filter(action => !!action) as JSX.Element[];

const getSeconds = (timeSeconds: number) => timeSeconds % 60;
const getMinutes = (timeSeconds: number) => Math.floor((timeSeconds / 60) % 60);
const getHours = (timeSeconds: number) => Math.floor((timeSeconds / 60 / 60) % 60);
const createDisplayMessageTime = (timeSeconds: number) => {
    const hours = getHours(timeSeconds);
    const minutes = getMinutes(timeSeconds);
    const seconds = getSeconds(timeSeconds);

    return `${hours > 0 ? `${hours} ${translate('time.hours')}, ` : ''}
    ${minutes > 0 || hours > 0 ? `${minutes} ${translate('time.minutes')}, ` : ''}
    ${seconds} ${translate('time.seconds')}`;
};

export const WinModal: React.ComponentType<IWinModalProps> = props =>
    (<Dialog
        title={translate('winModal.title')}
        open={props.isOpened}
        actions={getModalActions(props.onClose, props.nextLevel)}
        onRequestClose={props.onClose}
        autoScrollBodyContent
    >
        {props.message}<br/>
        {
            props.durationSeconds > 0 &&
            <span>{translate('time.itTookYou')} {createDisplayMessageTime(props.durationSeconds)}</span>
        }
    </Dialog>);
