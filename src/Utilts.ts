/**
 * 合計を算出します。
 * @param arr 
 */
export const sum = (arr:number[]) => {
    return arr.reduce( (accum, currentValue) => accum + currentValue, 0);
}
