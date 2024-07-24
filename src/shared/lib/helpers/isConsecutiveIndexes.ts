export const isConsecutiveIndexes = (arr:number[]) => {
    const result:number[] = [arr[0]];
    if (arr.length > 1) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1] + 1) {
                result.push(arr[i]);
            } else {
                return false;
            }
        }
        return result;
    } else {
        return arr;
    }
};