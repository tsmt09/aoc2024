const read = Deno.readTextFileSync("day4_input.txt");

function make2DArray(text) {
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split("");
    }
    return lines;
}

function countXMas(matrix) {
    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, -1],
        [1, 1],
        [-1, -1],
        [-1, 1],
    ];
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 'X') {
                continue;
            }
            directions.forEach(dir => {
                let word = ['X'];
                for (let l = 1; l < 4; l++) {
                    const x = i + dir[0] * l;
                    const y = j + dir[1] * l;
                    if ((x < 0) || (y < 0) || x >= matrix.length || y >= matrix[i].length) {
                        break;
                    }
                    word.push(matrix[x][y]);
                }
                word = word.join('');
                if (word === "XMAS") {
                    console.log("i: %d, j: %d", i, j);
                    count += 1;
                }
            });
        }
    }
    return count;
}

function countXMas2(matrix) {
    const possible_rounds = ["MMSS", "SMMS", "SSMM", "MSSM"];
    let count = 0;
    for (let i = 1; i < matrix.length - 1; i++) {
        for (let j = 1; j < matrix[i].length - 1; j++) {
            if (matrix[i][j] !== 'A') {
                continue;
            }
            const round = [matrix[i - 1][j + 1], matrix[i + 1][j + 1], matrix[i + 1][j - 1], matrix[i - 1][j - 1]].join('');
            if (possible_rounds.includes(round)) {
                console.log("i: %d, j: %d", i, j);
                console.log(round);
                count += 1;
            }
        }
    }
    return count;
}
const matrix = make2DArray(read);
// rotate and read

const count = countXMas(matrix);
console.log("res: %d", count);
const count2 = countXMas2(matrix);
console.log("res: %d", count2);