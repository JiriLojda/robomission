/* eslint-disable quote-props, max-len */
import {allCsHelpMessages} from "./helpMessages-cs";
import {HelpTranslationKey} from "./helpTranslationKey";

const messages: {[index: string]: JSX.Element | string} = {
  'Close': 'Zavřít',
  'I understand': 'Rozumím',
  'Intro': 'Intro',
  'Run': 'Spusť program',
  'Speed': 'Rychlost',
  'Task': 'Úkol',
  'Tasks': 'Přehled úloh',
  'Task Editor': 'Editor úloh',
  'Practice': 'Trénink',
  'Previous': 'Předchozí',
  'Feedback': 'Napište nám',
  'Help': 'Nápověda',
  'ALG': 'Laboratoř adaptabilního učení',
  'FI-MU': 'Fakulta informatiky MU',
  'For hackers': 'Pro hackery',
  'New instructions': 'Nové nápovědy',
  'All instructions': 'Všechny nápovědy',
  'Mission completed': 'Mise úspěšně dokončena.',
  'New mission': 'Nová mise',

  'easy-task-challenge': 'Pro změnu něco jednoduššího. Zvládneš to vyřešit do minuty?',
  'excellent-task-solved': 'Skvěle, úloha vyřešena!',

  'not tackled': 'neřešeno',
  'recommended': 'doporučujeme',
  'relative': 'relativní',

  'intro.learn-programming': 'Nauč se programovat!',
  'intro.explore-universe': 'Prozkoumej tajemný vesmír',
  'intro.collect-diamonds': 'a posbírej všechny diamanty',
  'intro.learn-program-spaceship': 'Nauč se ovládat vesmírnou loď',
  'intro.using-computer-programs': 'pomocí počítačových programů',
  'intro.game-driven-by-ai': 'Hra je poháněna umělou inteligencí,',
  'intro.adapting-to-your-skills': 'díky které se hra přizpůsobuje tvým dovednostem',
  'intro.developed-by-alg': 'Aplikaci vyvíjí tým Adaptabilního učení',
  'intro.at-fi-mu': 'na Fakultě informatiky Masarykovy Univerzity',
  'intro.fly-into-space': 'Vyleť do vesmíru!',

  'task.2diamonds-2meteorids': '2 diamanty, 2 meteoroidy',
  'task.arrow': 'Šipka',
  'task.belgian-flag': 'Belgická vlajka',
  'task.beware-of-asteroid': 'Pozor na asteroid',
  'task.big-left-turn': 'Velká levá zatáčka',
  'task.big-right-turn': 'Velká pravá zatáčka',
  'task.big-slalom': 'Velký slalom',
  'task.blocked-wormhole': 'Zablokovaná červí díra',
  'task.bouncing-from-edge': 'Odrážení od kraje',
  'task.chessboard': 'Šachovnice',
  'task.clean-your-path': 'Ukliď si cestu',
  'task.collect-diamonds': 'Sběr diamantů',
  'task.color-navigation': 'Barevná navigace',
  'task.color-slalom': 'Barevný slalom',
  'task.colorful-flowers': 'Barevné květy',
  'task.cross-2': 'Kříž 2',
  'task.diagonal-diamonds': 'Diamantové diagonály',
  'task.diagonal-lines': 'Diagonální čáry',
  'task.diamond-cross': 'Diamantový kříž',
  'task.diamond-in-house': 'Diamant v domku',
  'task.diamond-lines': 'Řady diamantů',
  'task.diamond-on-right': 'Diamant napravo',
  'task.diamond-path': 'Diamantová cesta',
  'task.diamond-ring': 'Diamantový prsten',
  'task.diamonds-in-meteoroid-cloud': 'Diamanty v mraku meteoroidů',
  'task.diamonds-on-yellow': 'Diamanty na žluté',
  'task.diamonds-with-signals': 'Diamanty se signály',
  'task.direct-flight-ahead': 'Přímý let vpřed',
  'task.direction-change': 'Změna směru',
  'task.dont-forget-shot': 'Nezapomeň střílet',
  'task.double-bend': 'Dvojitá zatáčka',
  'task.double-track': 'Dvojitá dráha',
  'task.edge-to-edge': 'Od kraje ke kraji',
  'task.edge-wormholes': 'Okrajové červí díry',
  'task.find-the-path': 'Najdi cestu',
  'task.five-diamonds': 'Pět diamantů',
  'task.follow-colors': 'Následuj barvy',
  'task.four-vs': 'Čtyři véčka',
  'task.free-column': 'Volný sloupec',
  'task.ladder': 'Žebřík',
  'task.last-shot': 'Poslední výstřel',
  'task.letter-d': 'Písmeno D',
  'task.letter-e': 'Písmeno E',
  'task.letter-h': 'Písmeno H',
  'task.maneuvers-on-left': 'Manévry nalevo',
  'task.meteoroids-and-wormholes': 'Meteoroidy a červí díry',
  'task.meteoroids-on-left': 'Meteoroidy nalevo',
  'task.mirror': 'Zrcadlo',
  'task.n': 'Písmeno N',
  'task.nameless-task': 'Nepojmenovaná úloha',
  'task.narrow-passage': 'Úzký průchod',
  'task.on-yellow-to-left': 'Na žluté doleva',
  'task.one-step-forward': 'Jeden krok vpřed',
  'task.plan-your-shooting': 'Naplánuj si střelbu',
  'task.plus': 'Plus',
  'task.rectangle': 'Obdélník',
  'task.red-shooting': 'Červená střelba',
  'task.shooting': 'Střelba',
  'task.shot': 'Střela',
  'task.six-diamonds': 'Šest diamantů',
  'task.slalom-position-testing': 'Poziční slalom',
  'task.stairs': 'Schody',
  'task.steal-the-nose': 'Ukradni nos',
  'task.stop-on-red': 'Zastav na červenou',
  'task.stripes': 'Pruhy',
  'task.surrounded-diamond': 'Obklíčený diamant',
  'task.three-steps-forward': 'Tři kroky vpřed',
  'task.triangle': 'Trojúhelník',
  'task.triple-slalom': 'Trojitý slalom',
  'task.triple-steps': 'Trojté kroky',
  'task.tunnel': 'Tunel',
  'task.turning-in-square': 'Zatáčení ve čtverci',
  'task.turning-left': 'Zatáčení doleva',
  'task.turning-left-and-right': 'Doleva a doprava',
  'task.turning-right': 'Zatáčení doprava',
  'task.turning-right-and-left': 'Doprava a doleva',
  'task.two-bit-instructions': 'Dvoubitové instrukce',
  'task.two-color-tracks': 'Dvoubarevné dráhy',
  'task.two-diamonds': 'Dva diamanty',
  'task.two-steps-forward': 'Dva kroky vpřed',
  'task.wave': 'Vlna',
  'task.wormhole-cloud': 'Mrak červích děr',
  'task.wormhole-demo': 'Červí díra: ukázka',
  'task.yellow-hint': 'Žlutá nápověda',
  'task.yellow-is-not-red': 'Žlutá není červená',
  'task.yellow-squares': 'Žluté čtverce',
  'task.zig-zag': 'Cik cak',
  'task.zig-zag-plus': 'Cik cak plus',

  'blockly.start': 'start',
  'blockly.fly': 'leť',
  'blockly.turn': 'otoč se',
  'blockly.ahead': 'vpřed',
  'blockly.left': 'vlevo',
  'blockly.right': 'vpravo',
  'blockly.shoot': 'vystřel',
  'blockly.color': 'barva',
  'blockly.position': 'pozice',
  'blockly.while': 'dokud',
  'blockly.repeat': 'opakuj',
  'blockly.if': 'pokud',
  'blockly.else': 'jinak',
  'blockly.green': 'zelená',
  'blockly.blue': 'modrá',
  'blockly.red': 'červená',
  'blockly.yellow': 'žlutá',
  'blockly.black': 'černá',
  'blockly.tile': 'pole na',
  'blockly.contains': 'obsahuje',
  'blockly.notContains': 'neobsahuje',
  'blockly.pickUpDiamond': 'vezmi diamant',
  'blockly.isAccessible': 'je přístupné',
  'blockly.set': 'nastav',
  'blockly.to': 'na',
  'blockly.get': 'vezmi',
  'blockly.string': 'řetězec',
  'blockly.number': 'číslo',
  'blockly.boolean': 'pravda/nepravda',
  'blockly.as': 'jako',
  'blockly.not': 'ne',
  'blockly.function': 'funkce',
  'blockly.parameter': 'parametr',
  'blockly.parameters': 'parametry',
  'blockly.value': 'hodnota',
  'blockly.next': 'další',
  'blockly.call': 'zavolej',
  'blockly.void': 'bez návratové hodnoty',
  'blockly.return': 'vrať',
  'blockly.getDirectionOfShip': 'vezmi směr lodě',
  'blockly.of': 'z',
  'blockly.getCoordinate': 'vezmi souřadnici',
  'blockly.toShip': 'k lodi',
  'blockly.getPositionOfShip': 'vezmi pozici lodě',
  'blockly.true': 'pravda',
  'blockly.false': 'nepravda',
  'blockly.noop': 'nic nedělej',
  'blockly.getShipId': 'získej id této lodě',

  'blockly.categories.commands': 'povely',
  'blockly.categories.variables': 'proměnné',
  'blockly.categories.cycles': 'smyčky',
  'blockly.categories.values': 'hodnoty',
  'blockly.categories.constants': 'konstanty',
  'blockly.categories.conditions': 'podmínky',
  'blockly.categories.branching': 'větvení',
  'blockly.categories.logic': 'logika',
  'blockly.categories.functions': 'funkce',

  'editor.runBattle': 'spusť bitvu',
  'editor.showMap': 'zobraz mapu',
  'editor.showHelp': 'zobraz nápovědu',
  'editor.submitCode': 'potvrdit kód',
  'editor.useCodeEditor': 'použij textový editor',
  'editor.backToEditor': 'zpátky do editoru',

  'object.ship': 'loď',
  'object.diamond': 'diamant',
  'object.meteoroid': 'meteorit',
  'object.asteroid': 'asteroid',
  'object.wormhole': 'červí díra',
  'object.endOfMap': 'konec mapy',

  'ps.story.commands': 'Ovládání vesmírné lodě',
  'ps.story.commands-2': 'Střelba a červí díry',
  'ps.story.repeat': 'Opakuj N-krát',
  'ps.story.while': 'Opakuj dokud',
  'ps.story.loops': 'Cyklická výzva',
  'ps.story.if': 'Barevné rozhodování',
  'ps.story.comparing': 'Poziční rozhodování',
  'ps.story.if-else': 'Úplné rozhodování',
  'ps.story.loops-if': 'Závěrečná výzva',

  'ps.commands': 'Základní příkazy',
  'ps.commands-2': 'Pokročilé příkazy',
  'ps.repeat': 'Cyklus s daným počtem opakování',
  'ps.while': 'Cyklus s podmínkou',
  'ps.loops': 'Opakování cyklů',
  'ps.if': 'Podmíněný příkaz',
  'ps.comparing': 'Porovnávání',
  'ps.if-else': 'Pokud-jinak',
  'ps.loops-if': 'Cykly a podmíněné příkazy',

  'category.moves': 'Základní kroky',
  'category.world': 'Tajemný vesmír',
  'category.repeat': 'Opakuj N-krát',
  'category.while': 'Opakuj dokud',
  'category.loops': 'Zákeřné cykly',
  'category.if': 'Podmíněné příkazy',
  'category.comparing': 'Porovnávání',
  'category.if-else': 'Pokud-jinak',
  'category.final-challenge': 'Závěrečná výzva',

  'feedback.title': 'Napište nám',
  'feedback.question': 'Narazili jste na chybu v aplikaci? Máte nápad na vylepšení?',
  'feedback.email': 'E-mail (prosím vyplňte, ať Vám můžeme dát vědět odpověď)',
  'feedback.submit': 'Odeslat',
  'feedback.thanks': 'Děkujeme za zpětnou vazbu!',

  'fail-reason.crashed-last-row': 'Raketka musí v cílové rovince zastavit',
  'fail-reason.crashed-edge': 'Raketka vyletěla z vesmírné dráhy a rozbila se',
  'fail-reason.crashed-meteoroid': 'Raketka narazila do meteoroidu a rozbila se',
  'fail-reason.crashed-asteoroid': 'Raketka narazila do asteroidu a rozbila se',
  'fail-reason.last-row-not-reached': 'Raketka musí doledět do cílové rovinky',
  'fail-reason.missing-diamonds': 'Raketka musí posbírat všechny diamanty',

  'instruction.env-recommended-task-button':
    'Modrá tlačítka s šipkou označují doporučenou úlohu.',
  'instruction.env-menu':
    'Kliknutím na toto tlačitko rozbalíš menu.',
  'instruction.env-levelbar':
    'Za každou vyřešenou úlohu dostáváš kredity. ' +
    'Až jich máš dostatek, postupuješ do dalšího levelu.',
  'instruction.env-help':
    'Kliknutím na otazník se zobrazí všechny nápovědy. ' +
    'Pokud je otazník oranžový, jsou připraveny nové, nepřečtené nápovědy.',
  'instruction.env-feedback':
    'Když něco nebude fungovat podle tvých představ, dej nám o tom vědět.',
  'instruction.env-login':
    'Pro zapamatování postupu je potřeba se přihlásit. ' +
    'K přihlášení lze využít i účet u Googlu nebo Facebooku.',
  'instruction.task-space-world':
    'Tvým úkolem je proletět s raketkou celou vesmírnou dráhou až na modrou čáru.',
  'instruction.task-toolbox':
    'Tohle jsou příkazy k ovládání raketky. ' +
    'Příkazy můžeš ve svém programu používat opakovaně.',
  'instruction.task-snapping':
    'Tady skládáš svůj program. Bloky mají malé zobáčky, kterými je lze ' +
    'zapojovat do sebe. Raketka bude vykonávat pouze příkazy zapojené pod start.',
  'instruction.task-controls':
    'Program spustíš kliknutím na toto tlačítko. Můžeš ho spouštět opakovaně, ' +
    'dokud tvoje řešení nebude správné.',
  'instruction.task-diamond':
    'Raketka musí po cestě posbírat všechny diamanty.',
  'instruction.task-asteroid':
    'Asteroid. Pokud do něj raketka narazí, tak se rozbije.',
  'instruction.task-meteoroid':
    'Meteoroid. Pokud do něj raketka narazí, tak se rozbije.',
  'instruction.task-wormhole':
    'Pokud raketka vletí do červí díry, okamžitě se objeví v druhé červí díře.',
  'instruction.task-length-limit':
    'Ukazatel délky programu. ' +
    'Raketka má omezenou paměť, program proto nesmí být příliš dlouhý.',
  'instruction.task-diamond-status':
    'Počítadlo diamantů zobrazuje, kolik diamantů raketka posbírala a ' +
    'kolik jich musí posbírat celkem.',
  'instruction.task-energy-status':
    'Ukazatel energie. Každý výstřel odebere raketce 1 jednotku energie.',
  'instruction.task-block-fly':
    'Příkaz pro let o jedno políčko vpřed.',
  'instruction.task-block-shoot':
    'Raketka vystřelí a pak se posune o jedno políčko vpřed.' +
    'Rozstřelit lze malé meteoroidy v libovolné vzdálenosti.',
  'instruction.task-block-repeat':
    'Tento blok říká raketce, aby N-krát zopakovala zadanou posloupnost příkazů.',
  'instruction.task-block-while':
    'Tento blok říká raketce, aby opakovala zadanou posloupnost příkazů, ' +
    'dokud platí nějaká podmínka.',
  'instruction.task-block-color':
    'Testování barvy políčka pod raketkou.',
  'instruction.task-block-position':
    'Test na aktuální sloupec, ve kterém se raketka nachází. ' +
    'Sloupce jsou číslovány zleva 1, 2, 3, atd.',
  'instruction.task-block-if':
    'Podmíněný příkaz. ' +
    'Raketka vykoná vnořené příkazy, pouze pokud platí určitá podmínka.',
  'instruction.task-block-if-else':
    'Úplný podmíněný příkaz. Raketka vykoná jednu posloupnost příkazů, ' +
    'pokud podmínka platí, a jinou posloupnost příkazů, pokud podmínka neplatí.',

  'instruction.editor-setting':
    'Editor umožňuje tvorbu vlastních zadání. ' +
    'Pokud vytvoříte nějakou pěknou úlohu, tak nám ji můžete poslat.',
  'instruction.editor-space-world':
    'Každé políčko na mřížce má nějakou barvu (k = černá, r = červená, g = zelená) ' +
    'a objekty (A = asteroid, M = meteoroid, D = diamant, W = červí díra).',

  'instruction.overview-levels':
    'Úlohy jsou rozdělené do levelů podle jejich obtížnosti. ' +
    'Vyřešené levely jsou vybarvené modře, nevyřešené šedě.',
  'instruction.overview-difficulty':
    'Počet puclíků znázorňuje obtížnost úlohy v rámci daného levelu.',
  'instruction.overview-solved-task':
    'Vyřešené úlohy jsou obarvené modře.',
  'instruction.overview-recommended-task':
    'Doporučená úloha je obarvená oranžově.',

  'user.email': 'Email',
  'user.login': 'Přihlásit se',
  'user.via-facebook': 'Skrze Facebook',
  'user.via-google': 'Skrze Google',
  'user.logout': 'Odhlásit se',
  'user.delete-history': 'Smazat historii',
  'user.nickname': 'Přezdívka',
  'user.password': 'Heslo',
  'user.signup': 'Registrace',
  'user.login-failed': 'Nesprávný email nebo heslo.',
  'user.signup-success': 'Registrace proběhla úspěšně!',

  'UserProgramError.ShipCannotMove':
    'Tvoje loď se nemůže hýbat.',
  'UserProgramError.VariableDoesNotExist':
    'Pokusil ses načíst proměnnou, která neexistuje.',
  'UserProgramError.VariableIsNotNumerical':
    'Pokusil ses načíst proměnnou která neni číslo, jako číslo.',
  'UserProgramError.ReferencedPositionIsNotOnMap':
    'Ukazuješ na pole mimo mapu. Prosím zkontroluj si svůj program.',
  'UserProgramError.GotDifferentTypeThanExpected':
    'Některý z bloků vrátil jiný typ hodnoty než je očekáváno. Prosím kontaktuj autora, protože toto chování není očekávané.',
  'UserProgramError.ProvidedShipIdDoesNotExist':
    'Zadal jsi id lodě, které neexistuje. Prosím zkontroluj svůj program.',
  'UserProgramError.ProvidedStringIsNotCoordinate':
    'Zadaný řetězec nespecifikuje žádnou souřadnici. Prosím zadej "x" nebo "y".',

  'BattleResult.UserProgramError': 'způsobil chybu:',
  'BattleResult.Win': 'Vyhrál jsi!!!',
  'BattleResult.Draw': 'Jaj, vypadá to na remízu mezi',
  'BattleResult.Loose': 'Hm, prohrál jsi. Zkus to znovu.',

  'InvalidProgramReason.DefinedAdditionalProp':
    'některé property jsou definované navíc.',
  'InvalidProgramReason.InvalidStatement':
    'některý blok je nevalidní.',
  'InvalidProgramReason.NoOrBadStartStatement':
    'chybí startovní blok nebo je nevalidní.',
  'InvalidProgramReason.UnknownStatementType':
    'něěkterý blok má neznámý typ.',
  'InvalidProgramReason.MissingTestCondition':
    'Musíš nastavit podmínku ve všech blocích které ji vyžadují.',
  'InvalidProgramReason.MissingParameter':
    'Některý z tvých bloků nemají nastavený parameter.',
  'InvalidProgramReason.UndefinedRequiredProp':
    'Některý z tvých bloků nemají definovaný props.',
  'InvalidProgramReason.InvalidValueType':
    'Některá z tebou předávaných hodnot má typ jiný než je v daném bloku očekáván.',
  'InvalidProgramReason.CodeNotParsed':
    'Nepodařilo se zpracovat kód. Prosím zkontroluj zprávu níže (v angličtině).',
  'InvalidProgramReason.DuplicateFunctionName':
    'Názvy funkcí musejí být unikátní. Zkontroluj názvy svých funkcí, prosím.',
  'InvalidProgramReason.DuplicateFunctionParameters':
    'Názvy parametrů funkcí musejí být v dané funkci unikátní. Zkontroluj své funkce, prosím.',
  'InvalidProgramReason.EmptyFunctionName':
    'Název funkce nemůže být prázdný.',
  'InvalidProgramReason.EmptyParameterName':
    'Název parametru nemůže být prázdný.',
  'InvalidProgramReason.FncCallWithInvalidNumberOfParameters':
    'Některé z tvých volání funkce dostává nesprávný počet parametrů.',
  'InvalidProgramReason.UnknownFunctionCalled':
    'Pokusil ses zavolat nedefinovanou funkci. Prosím zadefinuj prvně všechny funkce.',
  'InvalidProgramReason.FncShouldReturnAndNoEndingReturn':
    'Některé z tvých funkcí by měli vracet hodnotu, ale nemají "vrať" blok na konci svého těla.',
  'InvalidProgramReason.FncIsCalledWithDifferentReturnTypes':
    'Některé z tvých funkcí jsou volané tak, že je pokaždé očekáván jiný návratový typ.',
  'InvalidProgramReason.FncReturnsDifferentTypes':
    'Některé z tvých funkcí vrací jiný typ v každém "vrať" bloku.',
  'InvalidProgramReason.FncCallReturnTypeMismatch':
    'Některé z tvých funkcí vrací jiný typ než je očekáváno při jejich volání.',
  'InvalidProgramReason.None':
    'Vše je v pořádku.',

  'InvalidProgramReason.FunctionsCannotBeDefined':
    'používání funkcí je zakázáno.',
  'InvalidProgramReason.MaximumNumberOfBlocksReached':
    'překročil jsi limit na počet bloků.',
  'InvalidProgramReason.RestrictedBlockUsed':
    'použil jsi některý ze zakázaných bloků.',

  'InvalidProgramReason.BadParserMessage': 'Chyba parseru (kontaktujte autora)',
  'InvalidProgramReason.CustomLevelMessage': 'V tomto levelu',

  'level.category.introduction': 'Úvod',
  'level.category.distributed': 'Úvod do distribuovaného programování',
  'level.category.others': 'Ostatní',
  'level.category.justOthers': 'Jen ostatní',

  'battleType.shoot': 'střílej',
  'battleType.collect': 'sbírej',
  'battleType.race': 'závod',

  'editor.standardWinModalMessageContinued': 'Gratulujeme, právě si vyhrál. Je čas oslavovat další úrovní. ;)',
  'editor.standardWinModalMessageFinal': 'Skvělé, právě jsi vyhrál závěrečnou úroveň. Podívej se do hlavní nabídky na další výzvy.',
  'editor.enlargeEditorArea': 'Zvětšit editor',
  'editor.shrinkEditorArea': 'Zmenšit editor',
  'editor.battleSpeed': 'rychlost bitvy',
  'editor.makeBattleStep': 'spusť jeden krok bitvy',
  'editor.makeProgramStep': 'spusť jeden krok programu',

  'winModal.title': 'Vítězství',
  'winModal.nextLevelLink': 'další úroveň',

  'time.seconds': 'vteřin',
  'time.minutes': 'minut',
  'time.hours': 'hodin',
  'time.itTookYou': 'Trvalo ti to',

  'shipIds.aiShip1': 'Loď počítače 1',
  'shipIds.aiShip2': 'Loď počítače 2',
  'shipIds.aiShip3': 'Loď počítače 3',
  'shipIds.playerShip1': 'Loď hráče 1',
  'shipIds.playerShip2': 'Loď hráče 2',
  'shipIds.playerShip3': 'Loď hráče 3',
};

const levelNames: [HelpTranslationKey, string][] = [
  [HelpTranslationKey.EmptyWorldDuel, 'Duel v prázdném světě'],
  [HelpTranslationKey.FirstChallenge, 'První výzva'],
  [HelpTranslationKey.FirstIfs, 'Tvůj první If'],
  [HelpTranslationKey.FirstRepeat, 'Tvůj první repeat'],
  [HelpTranslationKey.FirstWhile, 'Tvůj první while'],
  [HelpTranslationKey.FlyLeftShoot, 'První mise'],
  [HelpTranslationKey.SecondIfs, 'If 2'],
  [HelpTranslationKey.SecondWhile, 'Tvůj druhý while'],
  [HelpTranslationKey.TurnPickUp, 'Otoč se'],
  [HelpTranslationKey.BasicRace, 'Jednoduchý závod'],
  [HelpTranslationKey.BasicScanKillAll, `Jednoduché střílení`],
  [HelpTranslationKey.NarrowAlleyPass, 'Úzký průchod'],
  [HelpTranslationKey.StarCollectDiamondsBasic, `Jednoduché sbírání hvězdy`],
  [HelpTranslationKey.StarWithDiamonds, 'Hvězda s diamanty'],
  [HelpTranslationKey.DistributedIntro, 'Tvůj první distribuovaný program'],
  [HelpTranslationKey.DistributedIntroLevel2, 'Tvůj druhý distribuovaný program'],
];

const registerLevelNames = () => {
  for (const [key, name] of levelNames) {
    messages[`level.${key}.name`] = name;
  }
};

const registerHelpMessages = () => {
  for (const help of allCsHelpMessages) {
    messages[`help.${help[0]}.title`] = help[1].title;
    messages[`help.${help[0]}.message`] = help[1].message;
  }

  return messages;
};

registerLevelNames();
export default registerHelpMessages();
