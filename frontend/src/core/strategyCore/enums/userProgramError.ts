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
    switch (userProgramError) {
        case UserProgramError.ShipCannotMove:
            return 'Your ship cannot move this way.';
        case UserProgramError.VariableDoesNotExist:
            return 'You tried to get a variable that was not set before.';
        case UserProgramError.VariableIsNotNumerical:
            return 'You tried to get a non-numerical value as numerical.';
        case UserProgramError.ReferencedPositionIsNotOnMap:
            return 'You referenced a tile outside the map. Please check your program.';
        case UserProgramError.GotDifferentTypeThanExpected:
            return 'Some of your statement returned different type than was expected. Please contact the author as this is unexpected.';
        case UserProgramError.ProvidedShipIdDoesNotExist:
            return 'The shipId you provided to getShipPosition does not exist. Please revisit the statement.';
        case UserProgramError.ProvidedStringIsNotCoordinate:
            return 'The provided string does not specify any coordinate. You have to put "x" or "y" there.';
        default:
            return undefined;
    }
};
