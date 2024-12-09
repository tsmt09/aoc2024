const read = Deno.readTextFileSync("day8_input.txt").split("\n").map(line => line.split(""));

const chars = new Map();

const height = read.length;
const width = read[0].length;

function isOutSideField(x,y) {
    if(x >= width || y >= height || x < 0 || y < 0) {
        return true;
    } else {
        return false;
    }
}

function isAntinodeOnOtherNode(x, y) {
    let isConflict = false;
    chars.forEach((v, _) => {
        if(v.positions.findIndex(item => item.x == x && item.y == y) !== -1) {
            isConflict = true;
            return true;
        }
    });
    if(isConflict) {
        console.log("%d, %d", x,y);
    }
    return isConflict;
}

read.forEach((line, y) => {
    line.forEach((char, x) => {
        if(char == ".") {
            return;
        }
        let value = chars.get(char);
        if(value == undefined) {
            value = {
                positions: []
            }
        }
        value.positions.push({x: x, y: y})
        chars.set(char, value);
    })
})

chars.forEach((value, key) => {
    let antinodes = [];
    for(let i = 0; i < value.positions.length; i++) {
        for(let k = 0; k < value.positions.length; k++) {
            if(i == k) {
                continue;
            }
            const dist = {
                x: value.positions[k].x - value.positions[i].x,
                y: value.positions[k].y - value.positions[i].y,
            }
            let antinode = {
                x: value.positions[i].x - dist.x,
                y: value.positions[i].y - dist.y
            };
            while(!isOutSideField(antinode.x, antinode.y)) {
                antinodes.push(antinode);
                antinode = {
                    x: antinode.x - dist.x,
                    y: antinode.y - dist.y
                };
            }
        }
    }
    value.antinodes = antinodes;
});

// console.log(chars);
const antinodes = chars.values().map(v => v.antinodes.concat(v.positions)).reduce((result, item) => result.concat(item), []);
console.log(antinodes.length);
const filtered = [];
antinodes.forEach(antinode => {
    if(filtered.findIndex(item => item.x == antinode.x && item.y == antinode.y) == -1) {
       filtered.push(antinode);
    }
});
console.log(filtered.length);
