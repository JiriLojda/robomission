export const invalidProgramError = (message: string): Error =>
    new Error(`Invalid program: '${message}'.`);
