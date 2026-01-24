/**
 * 合計を算出します。
 * @param arr 
 */
export const sum = (arr:number[]) => {
    return arr.reduce( (accum, currentValue) => accum + currentValue, 0);
}

/**
 * 連番を作成します。
 * @param start 
 * @param stop 
 * @param step 
 * @returns 
 */
export const range = (start:number, stop:number, step:number) => {
    return Array.from(
      { length: Math.ceil((stop - start) / step) },
      (_, i) => start + i * step,
    );
}

const dayFormat = new Intl.DateTimeFormat("ja-JP", {weekday:'short'})

/**
 * 曜日を取得します
 */
export const getDayJp = (date:Date) => {
  return dayFormat.format(date)
}