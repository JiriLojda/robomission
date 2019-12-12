import {List} from "immutable";
import {DocumentationEntry} from "../../models/docsTypes";
import {actionsDocs} from "./actionsDocs";
import {cyclesDocs} from "./cyclesDocs";
import {branchingDocs} from "./branchingDocs";
import {conditions1Docs, conditions2Docs, conditions3Docs, conditions4Docs} from "./conditionsDocs";
import {variablesDocs} from "./variablesDocs";
import {functionsDocs} from "./functionsDocs";

export const allCodeDocs: List<DocumentationEntry> = List([
    actionsDocs,
    cyclesDocs,
    branchingDocs,
    variablesDocs,
    conditions1Docs,
    conditions2Docs,
    conditions3Docs,
    conditions4Docs,
    functionsDocs,
]);
