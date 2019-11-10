import {translate} from "../../../localization";

export enum UserProgramError {
    ShipCannotMove = 'ShipCannotMove',
    VariableDoesNotExist = 'VariableDoesNotExist',
    VariableIsNotNumerical = 'VariableIsNotNumerical',
    ReferencedPositionIsNotOnMap = 'ReferencedPositionIsNotOnMap',
    GotDifferentTypeThanExpected = 'GotDifferentTypeThanExpected',
    ProvidedShipIdDoesNotExist = 'ProvidedShipIdDoesNotExist',
    ProvidedStringIsNotCoordinate = 'ProvidedStringIsNotCoordinate',
}

export const isUserProgramError = (variable: any): variable is UserProgramError => {
    for (const item in UserProgramError) {
        if (UserProgramError[item] === variable) {
            return true;
        }
    }

    return false;
};

export const getUserProgramErrorDisplayName = (userProgramError?: UserProgramError) => {
    const result = translate(`UserProgramError.${userProgramError}`);

    return result.startsWith('UserProgramError.') ? undefined : result;
};
