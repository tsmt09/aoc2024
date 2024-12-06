const field = Deno.readTextFileSync("day6_input.txt").split('\n').map(line => line.split(''));

const directions = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 }, // right
    { x: 0, y: 1 }, // down
    { x: -1, y: 0 } // left
]

function findGuard() {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] === "^") {
                return { x: x, y: y, dir: 0 };
            }
        }
    }
    return { x: -1, y: -1, dir: 0 };
}

const guard = findGuard();
console.log(guard);

function peek_step(coordinate) {
    return { x: coordinate.x + directions[coordinate.dir].x, 
             y: coordinate.y + directions[coordinate.dir].y, 
             dir: coordinate.dir }
}

function insert_distinct_pos(array, coordinate) {
    let foundIdx = array.findIndex(v => v.x == coordinate.x && v.y == coordinate.y);
    if (foundIdx === -1) {
        array.push({x: coordinate.x, y: coordinate.y, dir: coordinate.dir, crossed: 1});
    } else {
        if ((array[foundIdx].dir == 1 || array[foundIdx].dir == 3) && (coordinate.dir == 0 || coordinate.dir == 2)) {
            array[foundIdx].crossed = 2;
        }
        else if ((array[foundIdx].dir == 2 || array[foundIdx].dir == 0) && (coordinate.dir == 1 || coordinate.dir == 3)) {
            array[foundIdx].crossed = 2;
        }
    }
}

function walk(current_coordinate) {
    let step_count = 0;
    let distinct_pos = new Array();
    let positions = new Array();
    let potential_blockers = new Array();
    while (true) {
        insert_distinct_pos(distinct_pos, current_coordinate);
        positions.push(current_coordinate);
        const after_step = peek_step(current_coordinate);
        // check if out of field
        if ((after_step.x < 0) ||
            (after_step.y < 0) ||
            (after_step.x >= field[0].length) ||
            (after_step.y >= field.length)) {
            console.log("went out of bounds after %d distinct pos at field: %d, %d", distinct_pos.length, after_step.x, after_step.y);
            break;
        }

        if (field[after_step.y][after_step.x] == "#") {
            current_coordinate.dir = (current_coordinate.dir + 1) % 4;
            current_coordinate = peek_step(current_coordinate);
        } else {
            current_coordinate = after_step;
        }
        
        // peek if a turn could bring back into loop
        let peek_coordinate = { x: current_coordinate.x, 
            y: current_coordinate.y,
            dir: (current_coordinate.dir + 1) % 4 };
        // the potential blocker if peek was successful
        const potential_blocker = peek_step(current_coordinate);
        if(potential_blocker.x < 0 || potential_blocker.y < 0) {
            continue;
        }
        if(field[potential_blocker.y][potential_blocker.x] == "#") {
            continue;
        }
        let loop_detector = [];
        while (true) {
            // overdefine direction locally
            const after_peek_coordinate = peek_step(peek_coordinate);
            if ((after_peek_coordinate.x < 0) ||
                (after_peek_coordinate.y < 0) ||
                (after_peek_coordinate.x >= field[0].length) ||
                (after_peek_coordinate.y >= field.length)) {
                break;
            }
            if (field[after_peek_coordinate.y][after_peek_coordinate.x] == "#") {
                peek_coordinate.dir = (peek_coordinate.dir + 1) % 4;
                peek_coordinate = peek_step(peek_coordinate);
            } else {
                peek_coordinate = after_peek_coordinate;
            }
            if(loop_detector.findIndex(elem =>
               elem.x == peek_coordinate.x && elem.y == peek_coordinate.y
            ) > 0) {
                // console.log("found loop at %d %d", peek_coordinate.x, peek_coordinate.y);
                potential_blockers.push(potential_blocker);
                break;
            } else {
                insert_distinct_pos(loop_detector, potential_blocker);
            }
        }
    }
    distinct_pos.forEach(pos => {
        if(pos.crossed == 2) {
            field[pos.y][pos.x] = "+";
        } else if (pos.crossed == 1 && pos.dir % 2 == 0) {
            field[pos.y][pos.x] = "|";
        } else if (pos.crossed == 1 && pos.dir % 2 == 1) {
            field[pos.y][pos.x] = "-";
        }
    });
    potential_blockers.forEach(pos => {
        field[pos.y][pos.x] = "O";
    });
    let text = field.map(line => line.join("")).join("\n");
    console.log(text);
    console.log("potential blockers: %d", text.split("").filter(char => char == 'O').length);
    console.log("distinct: %d", distinct_pos.length);
}

walk(guard);

