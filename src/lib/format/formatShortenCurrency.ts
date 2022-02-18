export const formatShortenCurrency = (num) => {
    const digits = 2;
    const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let decimal;
    let value = num;
    for(let i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return value = Number(num / decimal).toFixed(digits) + units[i];
        }
    }

    return Number(value).toFixed(digits);
}