export enum UserProgramError {
    ShipCannotMove = 'ShipCannotMove',
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
        default:
            return undefined;
    }
};
