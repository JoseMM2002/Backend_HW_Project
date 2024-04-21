export const generateNumbers = (length: number) => {
    let numbersString = '';
    for (let i = 0; i < length; i++) {
        numbersString += Math.floor(Math.random() * 10).toString();
    }
    return numbersString;
};
