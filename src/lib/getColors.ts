export const getColors = (array) => {
    if(array.length === 0) {
        return [];
    }
    return array.map(e => e.color);
}