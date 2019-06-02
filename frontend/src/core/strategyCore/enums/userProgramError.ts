export enum UserProgramError {
    ShipCannotMove = 'ShipCannotMove',
    VariableDoesNotExist = 'VariableDoesNotExist',
    VariableIsNotNumerical = 'VariableIsNotNumerical',
    ReferencedPositionIsNotOnMap = 'ReferencedPositionIsNotOnMap',
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
        default:
            return undefined;
    }
};
