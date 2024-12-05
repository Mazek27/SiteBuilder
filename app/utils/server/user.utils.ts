export const getUserId = (sessionDataId: string) => {
    return sessionDataId.split('|')[1];
};
