const read = Deno.readTextFileSync("day10_input.txt").split("\n").map(line => line.split("").map(c => Number(c)));

// find trailheads
const trailheads = [];
read.forEach((line, y) => {
    line.forEach((v, x) => {
        if(v == 0) {
            trailheads.push({x: x, y: y});
        }
    })
});
let y_limit = read.length;
let x_limit = read[0].length;

function mergeIfNotPresent(set, set2) {
    set2.forEach(pos => {
        if(set.findIndex(item => item.x == pos.x && item.y == pos.y) == -1) {
            set.push(pos);
        }
    });
}

function step(pos) {
    let val = read[pos.y][pos.x];
    if(val == 9) {
        return [pos];
    }
    let trail_ends = [];
    // try up
    if(pos.y > 0) {
        let next = {x: pos.x, y: pos.y - 1};
        let next_val = read[next.y][next.x];
        if(val + 1 == next_val) {
            mergeIfNotPresent(trail_ends, step(next));
        }
    }
    // try down
    if(pos.y < y_limit - 1) {
        let next = {x: pos.x, y: pos.y + 1};
        let next_val = read[next.y][next.x];
        if(val + 1 == next_val) {
            mergeIfNotPresent(trail_ends, step(next));
        }
    }
    // try left
    if(pos.x > 0) {
        let next = {x: pos.x - 1, y: pos.y};
        let next_val = read[next.y][next.x];
        if(val + 1 == next_val) {
            mergeIfNotPresent(trail_ends, step(next));
        }
    }
    // try right
    if(pos.x < x_limit - 1) {
        let next = {x: pos.x + 1, y: pos.y};
        let next_val = read[next.y][next.x];
        if(val + 1 == next_val) {
            mergeIfNotPresent(trail_ends, step(next));
        }
    }
    return trail_ends;
}

function trailHeadScore(th) {
    return step(th).length;    
}


console.log(trailheads.reduce((ret, current, idx) => {
    let score = trailHeadScore(current);
    return ret + score;
}, 0));
