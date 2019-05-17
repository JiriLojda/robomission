export enum UserProgramError {
    ShipFlewOutFromWorld = 'ShipFlewOutFromWorld',
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
        case UserProgramError.ShipFlewOutFromWorld:
            return 'Your ship flew out from this world.';
        default:
            return undefined;
    }
};
