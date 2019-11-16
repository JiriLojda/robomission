import {translate} from "../../../../localization";
import {LevelHelp} from "../../battleRunner/IGameLevel";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";

const findTranslatedHelpTitle = (key: HelpTranslationKey): string =>
    translate(`help.${key}.title`);

const findTranslatedHelpMessage = (key: HelpTranslationKey): string | JSX.Element =>
    translate(`help.${key}.message`);

export const createTranslatedHelp = (key: HelpTranslationKey, timeoutSeconds: number = 0, timeoutFailures: number = 0): LevelHelp => ({
    title: findTranslatedHelpTitle(key),
    text: findTranslatedHelpMessage(key),
    timeoutToShowSeconds: timeoutSeconds,
    timeoutToShowFailures: timeoutFailures,
});

export const findTranslatedName = (key: HelpTranslationKey): string =>
    translate(`level.${key}.name`);
