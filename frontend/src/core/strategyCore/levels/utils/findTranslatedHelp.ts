import {translate} from "../../../../localization";
import {LevelHelp} from "../../battleRunner/IGameLevel";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";

export const findTranslatedHelpTitle = (urlSlug: HelpTranslationKey): string =>
    translate(`help.${urlSlug}.title`);

export const findTranslatedHelpMessage = (urlSlug: HelpTranslationKey): string =>
    translate(`help.${urlSlug}.message`);

export const createTranslatedHelp = (urlSlug: HelpTranslationKey): LevelHelp => ({
    title: findTranslatedHelpTitle(urlSlug),
    text: findTranslatedHelpMessage(urlSlug),
});
