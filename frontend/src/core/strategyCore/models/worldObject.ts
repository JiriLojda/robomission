import {WorldObjectType} from "../enums/worldObjectType";
import {Record} from "immutable";

interface IWorldObject {
    type: WorldObjectType
}

const defaultValues: IWorldObject = {
    type: WorldObjectType.Asteroid,
};

export class WorldObject extends Record<IWorldObject>(defaultValues) {
}
