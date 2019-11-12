import {translate} from "../../../localization";

export enum UserProgramError {
    ShipCannotMove = 'ShipCannotMove',
    VariableDoesNotExist = 'VariableDoesNotExist',
    VariableIsNotNumerical = 'VariableIsNotNumerical',
    ReferencedPositionIsNotOnMap = 'ReferencedPositionIsNotOnMap',
    GotDifferentTypeThanExpected = 'GotDifferentTypeThanExpected',
    ProvidedShipIdDoesNotExist = 'ProvidedShipIdDoesNotExist',
    ProvidedStringIsNotCoordinate = 'ProvidedStringIsNotCoordinate',
    None = 'None',
}

export const isUserProgramError = (variable: any): variable is UserProgramError => {
    for (const item in UserProgramError) {
        if (UserProgramError[item] === variable) {
            return true;
        }
    }

    return false;
};

export const getUserProgramErrorDisplayName = (userProgramError: UserProgramError): string | undefined =>
    userProgramError === UserProgramError.None ? undefined : translate(`UserProgramError.${userProgramError}`);
