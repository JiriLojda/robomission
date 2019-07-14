export const invalidProgramError = (message: string, place: string = ''): Error => {
    const where = place ? ` in ${place}` : '';
    return new Error(`Invalid program${where}: '${message}'.`);
};
