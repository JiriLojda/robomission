import {IGameLevel, IWinModal} from "../../battleRunner/IGameLevel";
import {standardWinModalMessageContinued, standardWinModalMessageFinal} from "../constants/UIConstants";

export const createWinModalWithStandardMessage = (nextLevel?: IGameLevel): IWinModal => ({
    message: !nextLevel ? standardWinModalMessageFinal : standardWinModalMessageContinued,
    nextLevelLink: nextLevel ? nextLevel.urlSlug : undefined,
    nextLevelName: nextLevel ? nextLevel.name : undefined,
});
