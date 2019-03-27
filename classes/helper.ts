/**
 * Creates a 2D array which can be accessed as Array[row][col]
 * or (y, x) in coordinates.
 * 
 * @param rows The number of rows in the 2D array
 */
export function createArray2D(rows: number): any[][]
{
    let array: any[][] = [];
    for (let row = 0; row < rows; ++row)
    {
        array[row] = [];
    }
    return array;
}