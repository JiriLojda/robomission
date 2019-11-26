import {Map} from 'immutable';
import {HelpEntry} from "./helpMessages-en";
import {HelpTranslationKey} from "./helpTranslationKey";
import Image from "../components/Image";
import React from "react";

const firstChallengeTitle = 'Znič protivníka';
const firstChallengeMessage = 'Teď se pokusíme porazit protivníka, který se bude trochu bránit. ' +
    'Tento level má svoje specialní asteroidy. Tyto zelené asteroidy je možné tlačit před raketkou. ' +
    'To ovšem za podmínky, že za asteroidem ' +
    've směru letu raketky je volné místo. Pokud není, nic se nestane. Raketka i asteroid zůstávají ' +
    'na stejném místě.';

const firstChallengeMessage2 = <span>
    Vědeli jste, že při nárazu do zeleného asteroidu svoji loď nezničíte, ale posune asteroid?<br/>
    <Image imageId="help/firstChallenge/pushAsteroid.gif" style={{}} height={246} />
</span>;

const firstIfsTitle = 'Posbírej diamanty';
const firstIfsMessage = 'Teď si vyzkoušíme podmínky. "pokud" blok spustí svoje tělo jenom v případě, že se ' +
    'jemu daná podmínka vyhodnotí na "pravda". ' +
    'V opačném případě se celé jeho tělo přeskočí. "pokud-jinak" blok má další část. Tato další část (jinak blok) ' +
    'je naopak spuštěna pouze pokud se podmínka vyhodnotí na "nepravda". ' +
    'V této misi musíte posbírat všechny diamanty. Váš protivník nebude nic dělat. ' +
    'Budete potřebovat podmínku z kategorie "podmínky". Konkrétně podmínku jestli pole obsahuje/neobsahuje ' +
    'specifikovaný objekt. V této podmínce si vyberete který objekt chcete hledat na dané pozici. ' +
    'Další parameter je pozice. Blok pozice najdete v kategorii "hodnoty". ' +
    'Blok "pozice" označuje jednu pevně danou pozici na mapě bez ohlednu na aktuální pozici lodě. ' +
    'Zatímco "relativní pozice" označuje pozici relativně k aktuální pozici vaší lodě. ' +
    'Takže když například budete chtít vybrat pozici která bude vždy o jedno pole nad vaší lodí, ' +
    'vyberete "relativní pozice" s hodnotami x=0 (znamenající souřadnice x stejná jako x lodě) a y=-1 (znamenající ' +
    'y o jedna menší než y lodě). Ještě by bylo vhodné poznamenat, že levý horní okraj mapy má souřadnice ' +
    '(x=0, y=0) a y roste směrem dolů, zatímco x roste směrem doprava. ' +
    'Zároveň jste omezeni pouze na 7 bloků programu (nápověda: pomůže cyklus). Je zbytečné střílet, zbraně jsou vypnuté.';

const firstIfsMessage2 = <span>
    Tip: Do některých bloků je nutné vložit jiné bloky. Zkus přenést jeden blok nad jiný a vyzkoušet
    jestli do něj pasuje. Například následující bloky vyžadují aby do nich byla vložena podmínka
    (blok který vrací pravda/nepravda) <br />
    <Image imageId="help/firstIfs/cs_BlocksWithConditions" style={{}} height={379} /> <br/>
    Většina podmínek taky vyžaduje vložení nějakého bloku(obvykle hodnotu nebo konstantu).<br/>
    <Image imageId="help/firstIfs/cs_conditions" style={{}} height={595} /> <br/>
    Níže můžete vidět ukázkový program. Program raketce říká, aby se podívala na první pole nad svojí
    aktuální pozicí (relativní pozice s x=0 and y=-1) a pokud to pole obsahuje diamant leť rovně a
    vezmi diamant. Jinak leť doprava a vystřel.
    <Image imageId="help/firstIfs/cs_ifElseExample" style={{}} height={394} />
</span>;

const firstRepeatTitle = 'Posbírej diamanty';
const firstRepeatMessage = 'Na této úrovni se podíváme na "opakuj" cyklus. "opakuj", jak už název napovídá, ' +
    'opakuje svoje tělo tolikrát, jaké číslo dostane. Tento blok vám pomáhá nevytvářet stejnou věc pořád ' +
    'dokola. Vaším úkolem je posbírat všechny diamanty s využítím jenom 3 bloků.';

const firstRepeatMessage2 = <span>
    Věděli jste, že do těla bloku se vejde víc než jeden další blok?<br/>
    <Image imageId="help/firstRepeat/cs_insideRepeat" style={{}} height={323} />
</span>;

const firstWhileTitle = 'Posbírej diamanty';
const firstWhileMessage = 'Teď cyklus "dokud". Cyklus "dokud" je podobný jako blok "pokud". ' +
    'Kromě toho, že když je dokončeno tělo "dokud" cyklu, jeho podmínka se vyhodnotí znova. ' +
    'Pokud se podmínka opět vyhodnotí na "pravda", je tělo spuštěno znova.' +
    'A takto je tělo "dokud" cyklu vykonáváno dokola, dokud se podmínka vyhodnocuje na "pravda". ' +
    '"pokud" pomáhá opakovat kusy kódu, u kterých nevíte dopředu, kolikrát je bude potřeba opakovat. Například: ' +
    'můžete chtít střílet dokud je před lodí asteroid a potom letět dopředu nebo ' +
    'letět nahoru, dokud nepřítel není na stejné úrovni jako vaše loď a potom se otočit a vystřelit. ' +
    'Na této úrovni se podíváme na jednoduchý případ. Leťte dopředu a sbírejte diamanty, dokud je pole před raketkou ' +
    'přístupné. Na to budete potřebovat podmínku "je přístupjné". ' +
    'A nemůžete použít "opakuj" blok, aby jste si vyzkoušeli "dokud" ;-)';

const flyLeftShootTitle = 'Znič svého protivníka';
const flyLeftShootMessage = 'Vítej v robomisi. V této misi si vyzkoušíte létání a střílení s lodí. ' +
    'Vaším úkolem je zničit nepřátelskou loď. Vaše loď je červená a nepřítel má modrou.. ' +
    'V této misi platí standardní pravidla. Můžete ničit ostatní lodě a malé meteory střelou do nich. ' +
    'Vždy se zničí jen první předmět na trase střely. Ke zničení několika objektů v řadě musíte vystřelit ' +
    'několikrát. Velké asteroidy není možné zničit. Pokud s lodí narazíte do jiného objektu nebo' +
    ' vyletíte mimo mapu, vaše loď se zničí. ' +
    'Tyto standardní pravidla se v pozdějších úrovních mohou měnit, pozorně čtěte nápovědu. Teď se podíváme na příkazy. ' +
    'Můžete letět rovně povelem "leť" z kategorie "povely". Na povel "vpravo" nebo "vlevo" poletí loď ' +
    'diagonálně dopředu a doprava nebo doleva. Její orientace se nezmění (neotočí se). ' +
    'Střílet můžete pomocí povelu "vystřel".';

const flyLeftShootMessage2 = <span>
    Připrav povely pro svoji loď. Všechny povely které pro tuto úroveň potřebuješ najdeš v kategorii povely.<br/>
    <Image imageId="help/flyLeftShoot/cs_commandsCategory" style={{margin: '2%'}} height={136}/>
    <Image imageId="help/flyLeftShoot/cs_clicked" style={{margin: '2%'}} height={331}/>
    <Image imageId="help/flyLeftShoot/cs_firstBlockAdded" style={{margin: '2%'}} height={129}/>
</span>;

const flyLeftShootMessage3 = <span>
    Věděl jsi, že si svůj program můžeš vyzkoušet kliknutím na tlačítko "spusť bitvu"?
    <Image imageId="help/flyLeftShoot/cs_runBattle" style={{margin: '2%'}} height={120} />
</span>;

const secondIfsTitle = 'Posbírej diamanty';
const secondIfsMessage = 'Tato úroveň je podobná předchozí, pouze tady několik diamantů chybí. ' +
    'Pokuste se je všechny posbírat a vyhněte se ostatním objektům. ' +
    'Opět jste limitováni na 7 bloků. Tak je využívejte opatrně.';

const secondIfsMessage2 = <span>
    Tip: Pokud chcete něco vykonat v obou větvích "pokud-jinak" bloku, můžete společnou část obou větví
    dát až za "pokud-jinak" blok. Například oba program které vidíme a obrázcích níže dělají totéž,
    zatímco ten druhý je o jeden blok kratší. <br/>
    <Image imageId="help/secondIfs/cs_duplicatedIfElse" style={{}} height={407} />
    <Image imageId="help/secondIfs/cs_normalizedIfElse" style={{}} height={363} />
</span>;

const secondIfsMessage3 = <span>
    Pokud vaše loď potřebuje reagovat na více než dvě různé situace, můžete použít více "pokud" podmínek za sebou.
    Ale opatrně, akce vykonané v prvním "pokud" bloku mohou ovlivnit výsledek podmínky v druhém.
    <Image imageId="help/secondIfs/cs_switch" style={{}} height={531} />
</span>;

const secondWhileTitle = 'Dostaň se na zelené pole';
const secondWhileMessage = 'Nyní si "dokud" procvičíme trošku víc. Váš úkol je dostat se na zelené pole. ' +
    'Váš soupeř se vás pokusí zničit, ale vy nemůžete střílet. Vaší jedinou naději je vyhnout se jeho střelám. ' +
    'Váš protivník zustane na vršku mapy (x=0), náhodně měnit pozice vlevo a vpravo a střílet, pokud vás uvidí. ' +
    'Leťte rovně tak dlouho, dokud na pozici [0,0] nebude loď, tzn nepřítel je před vámi. Potom zatočte doprava, ' +
    'aby jste se mu vyhnuli. Vyčkejte a jakmile na pozici [0,0] loď není, můžete se vrátit do levého pruhu ' +
    'a pokračovat. TIP: použijte "dokud" a do podmínky vložte "pravda"(true), ta se vždy vyhodnotí na "pravda" ' +
    'a tento cyklus bude vykonáván do nekonečna. ' +
    'TIP2: jakmile vaše loď doletí na zelené políčko, hra skončí. Takže se nemusíte bát, že vyletíte mimo mapu. ' +
    'TIP3: pokud chcete přeskočit tah (čekáte až nepřítel odletí) můžete použít povel "vezmi diamant". ' +
    'I v případě že na dané pozici žádný diamant není, loď provede tah, nikam se nepohne a pokračuje nepřítel. ' +
    'TIP4: Přestože můžete se při výhýbání nepříteli letět dopředu i v pravém pruhu, riskujete, že netrefíte ' +
    'cílové políčko, které je jen v levém. Bezpečnější strategie je v pravém pruhu se nehýbat a postupovat jen v levém.';

const turnPickUpTitle = 'Posbírej všechny diamanty';
const turnPickUpMessage = 'Teď se naučíme zbytek povelů, které můžete lodi dát. ' +
    'V tomto kole můsíte posbírat víc diamantů než váš soupeř. Nezvítězíte tím že soupeře sestřelíte.' +
    'Jediný způsob jak vyhrát je posbírat víc diamantů. ' +
    'Váš nepřítel sebere jen jeden diamant, ten na kterém stojí. Vy teda musíte sebrat zbývající dva. ' +
    'Pro zvednutí diamantu použijte povel "vezmi diamant". Budete se také muset otáčet. ' +
    'Pro otočení použijte povel "otoč se vpravo" nebo "otoč se vlevo".';

const turnPickUpMessage2 = <span>
    Věděl jsi, že můžeš použít povel "otoč se" pro otočení lodi a povel "zvedni diamant" pro zvednutí diamantu? <br/>
    <Image imageId={'help/turnPickup/cs_turnPickup'} style={{}} height={603} />
</span>;

const basicRaceTitle = 'Závod.';
const basicRaceMessage = 'V této misi vyhrává nejrychlejší raketka, která se dostane na jedno z barevně vyznačených polí ' +
    'na druhé straně mapy. Zároveň narážením do zeleného asteroidu nebo lodě dané předměty posouváte. ' +
    'Při pohybu na pole obsazené jedním z takových předmětů se stane jedna ze dvou možností. ' +
    '1) Ve směru pohybu je volné pole. ' +
    'Pak se loď i objekt před ní pohnou ve směru pohybu. Tedy loď tlačí objekt před sebou. ' +
    '2) Pole ve směru pohybu lodě buď obsazený nebo mimo mapu. ' +
    'Potom se nestane nic. Loď se nemůže pohnout.';

const basicScanKillAllTitle = 'Jednoduchý souboj ve střelbě';
const basicScanKillAllMessage = 'Toto je velmi jednoduchý souboj ve střelbě. ' +
    'Vaším úkolem je sestřelit loď protivníka.';

const narrowAlleyPassTitle = 'Projdi kolem stráže';
const narrowAlleyPassMessage = 'Toto je speciální kolo. Vaším úkolem je dostat se na jedno ze zelených polí.' +
    'Trik je v tom, že protivník se vás pokusí zastavit. Navíc vaš loď nemůže střílet ' +
    'a protivník může. Musíte se vyhýbat jeho střelám a dostat se za něj.';

const starCollectDiamondsBasicTitle = 'Jenom test';
const starCollectDiamondsBasicMessage = 'Tento level je jen na testování. Neměl by být zveřejněn.';

const starWithDiamondsTitle = 'Posbírej diamanty';
const starWithDiamondsMessage = 'Posbírej co nejvíc diamantů dokážeš. Na této misi žádná z lodí nemůže ' +
    'střílet a srážky jsou smrtelné, tak dávejete pozor. Kontrolujte prostor před svou lodí. ' +
    'Tip: kontrolujte, jestli diamant, pro který letíte tam pořád je. Mohl ho soupeř před vámi sebrat.';

const emptyWorldDuelTitle = 'Jednoduchý duel';
const emptyWorldDuelMessage = 'V tomto jednoduchém duelu se pokusíte setřelit loď soupeře na prázdné mapě.' +
    'Každý z vás může editovat svůj kód pomocí tlačítka "edit first/second player code". ' +
    'Jakmile jste se svým kódem spokojeni. Potvďte ho tlačítkem "Potvrdit kód" a sposťte bitvu.';

const distributedIntroTitle = 'Dostaň je do cíle';
const distributedIntroMessage = 'V následující sadě úrovní se pokusíme vytvářet programy pro několik lodí najednou. ' +
    'Lodě pak budou muset splnit zadaný úkol jako tým. ' +
    'V této úrovni je vaším úkolem dostat obě lodě na jejich cílové pozice. ' +
    'Červenou loď na červené pole a zelenou na zelené. Program který vytvoříte bude spuštěn na obou raketkách ' +
    'současně. Takže když například budete mít program obsahující pouze povel vystřel as pustíte ho. ' +
    'Obě vaše lodě vystřelí.';

const distributedIntro2Title = 'Znovu je dostaň do cíle';
const distributedIntro2Message = 'Zde opět musíte dostat obě lodě na jejich cílové pozice. ' +
    'Jediný rozdíl s předchozím kolem je, že obě lodě mají rozlišné trasy. ' +
    'To nám napovídá, že bude potřeba použít nějaké větvení.';

export const allCsHelpMessages: Map<HelpTranslationKey, HelpEntry> = Map([
    [HelpTranslationKey.FirstChallenge, {title: firstChallengeTitle, message: firstChallengeMessage}],
    [HelpTranslationKey.FirstChallenge2, {title: firstChallengeTitle, message: firstChallengeMessage2}],
    [HelpTranslationKey.FirstIfs, {title: firstIfsTitle, message: firstIfsMessage}],
    [HelpTranslationKey.FirstIfs2, {title: firstIfsTitle, message: firstIfsMessage2}],
    [HelpTranslationKey.FirstRepeat, {title: firstRepeatTitle, message: firstRepeatMessage}],
    [HelpTranslationKey.FirstRepeat2, {title: firstRepeatTitle, message: firstRepeatMessage2}],
    [HelpTranslationKey.FirstWhile, {title: firstWhileTitle, message: firstWhileMessage}],
    [HelpTranslationKey.FlyLeftShoot, {title: flyLeftShootTitle, message: flyLeftShootMessage}],
    [HelpTranslationKey.FlyLeftShoot2, {title: flyLeftShootTitle, message: flyLeftShootMessage2}],
    [HelpTranslationKey.FlyLeftShoot3, {title: flyLeftShootTitle, message: flyLeftShootMessage3}],
    [HelpTranslationKey.SecondIfs, {title: secondIfsTitle, message: secondIfsMessage}],
    [HelpTranslationKey.SecondIfs2, {title: secondIfsTitle, message: secondIfsMessage2}],
    [HelpTranslationKey.SecondIfs3, {title: secondIfsTitle, message: secondIfsMessage3}],
    [HelpTranslationKey.SecondWhile, {title: secondWhileTitle, message: secondWhileMessage}],
    [HelpTranslationKey.TurnPickUp, {title: turnPickUpTitle, message: turnPickUpMessage}],
    [HelpTranslationKey.TurnPickUp2, {title: turnPickUpTitle, message: turnPickUpMessage2}],
    [HelpTranslationKey.BasicRace, {title: basicRaceTitle, message: basicRaceMessage}],
    [HelpTranslationKey.BasicScanKillAll, {title: basicScanKillAllTitle, message: basicScanKillAllMessage}],
    [HelpTranslationKey.NarrowAlleyPass, {title: narrowAlleyPassTitle, message: narrowAlleyPassMessage}],
    [HelpTranslationKey.StarCollectDiamondsBasic, {title: starCollectDiamondsBasicTitle, message: starCollectDiamondsBasicMessage}],
    [HelpTranslationKey.StarWithDiamonds, {title: starWithDiamondsTitle, message: starWithDiamondsMessage}],
    [HelpTranslationKey.EmptyWorldDuel, {title: emptyWorldDuelTitle, message: emptyWorldDuelMessage}],
    [HelpTranslationKey.DistributedIntro, {title: distributedIntroTitle, message: distributedIntroMessage}],
    [HelpTranslationKey.DistributedIntroLevel2, {title: distributedIntro2Title, message: distributedIntro2Message}],
]);
