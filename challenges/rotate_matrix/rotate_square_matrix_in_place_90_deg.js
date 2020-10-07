
function rotateSquareMatrixInPlace90Deg(m) {
    for (let layer = 0; layer < Math.ceil(m.length / 2); layer += 1) {
        const cursorStart = layer;
        const cursorEnd = m.length - layer - 1;
        for (let cursor = cursorStart; cursor < cursorEnd; cursor += 1) {
            let tmp = null;
            for (const side of ['top', 'right', 'bottom', 'left']) {
                if (side === 'top') {
                    const source = m[layer][cursor];
                    const target = m[cursor][m.length - layer - 1];
                    tmp = target;
                    m[cursor][m.length - layer - 1] = source;
                } else if (side === 'right') {
                    const source = tmp;
                    const target = m[m.length - layer - 1][m.length - cursor - 1];
                    tmp = target;
                    m[m.length - layer - 1][m.length - cursor - 1] = source;
                } else if (side === 'bottom') {
                    const source = tmp;
                    const target = m[m.length - cursor - 1][layer];
                    tmp = target;
                    m[m.length - cursor - 1][layer] = source;
                } else if (side === 'left') {
                    const source = tmp;
                    // const target = m[layer][cursor];
                    m[layer][cursor] = source;
                }
            }
        }
    }
}
let matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];
rotateSquareMatrixInPlace90Deg(matrix);
console.log(matrix);
matrix = [[1]];
rotateSquareMatrixInPlace90Deg(matrix);
console.log(matrix);
matrix = [
    [1, 2],
    [3, 4]
];
rotateSquareMatrixInPlace90Deg(matrix);
console.log(matrix);