import {translate} from "../../../../localization";
import {LevelHelp} from "../../battleRunner/IGameLevel";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";

const findTranslatedHelpTitle = (key: HelpTranslationKey): string =>
    translate(`help.${key}.title`);

const findTranslatedHelpMessage = (key: HelpTranslationKey): string =>
    translate(`help.${key}.message`);

export const createTranslatedHelp = (key: HelpTranslationKey): LevelHelp => ({
    title: findTranslatedHelpTitle(key),
    text: findTranslatedHelpMessage(key),
});

export const findTranslatedName = (key: HelpTranslationKey): string =>
    translate(`level.${key}.name`);
