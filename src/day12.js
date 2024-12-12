const read = Deno.readTextFileSync("day12_input.txt").split("\n").map(line => line.split(""));
// console.log(read);

const used_coordinates = new Set();
const areas_by_letter = [];

for(let y = 0; y < read.length; y++) {
    for(let x = 0; x < read[y].length; x++) {
        let value = read[y][x];
        const coordinate_s = `${x},${y}`;
        const p = perimeter_for_field(x,y);
        const coordinate = [x,y,p];
        used_coordinates.add(coordinate_s);
        // find area
        let areas_for_letter = areas_by_letter.find(area => area.get("value") == value);
        if(areas_for_letter == undefined) {
            areas_for_letter = new Map();
            areas_for_letter.set("value", value);
            areas_for_letter.set("areas", []);
            areas_by_letter.push(areas_for_letter);
        }
        let areas = areas_for_letter.get("areas");
        let close_area = areas.find(area =>
            area.find(element =>  
                isNearByCoordinate(x,y,element[0], element[1]))
        );
        if(close_area == undefined) {
            close_area = [];
            areas.push(close_area);
        }
        close_area.push(coordinate);
        areas_for_letter.set("areas", areas);
    }
}

function isNearByCoordinate(x,y,n_x,n_y) {
    return ((x == n_x + 1 || x == n_x - 1) && n_y == y) ||
            ((y == n_y + 1 || y == n_y - 1) && n_x == x) ||
            (x == n_x && y == n_y);
}

function perimeter_for_field(x,y) {
    const v = read[y][x];
    let p = 0;
    if(y == 0 || y == read.length - 1) {
        p += 1;       
    }
    if(x == 0 || x == read[0].length - 1) {
        p += 1;       
    }
    // left
    if(x - 1 >= 0 && read[y][x-1] != v) {
        p += 1;
    }
    // up
    if(y - 1 >= 0 && read[y-1][x] != v) {
        p += 1;
    }
    // right
    if(x + 1 < read[0].length - 1 && read[y][x + 1] != v) {
        p += 1;
    }
    // down
    if(y + 1 < read.length - 1 && read[y + 1][x] != v) {
        p += 1;
    }
    return p;
}

const allFields = areas_by_letter.reduce((acc, by_letter) => {
    const a = by_letter.get("areas");
    return acc + a.reduce((acc, area) => {
        return acc + area.length;
    },0);
}, 0);


console.log(allFields);

const p1 = areas_by_letter.reduce((acc, by_letter) => {
    const v = by_letter.get("value");
    const a = by_letter.get("areas");
    const res_areas = a.reduce((acc, area) => {
        const count = area.length;
        const perimeters = area.reduce((acc, field) => {
            return acc + field[2];
        }, 0);
        // console.log(`-- ${count} * ${perimeters}`);
        return acc + (count * perimeters);
    }, 0);
    // console.log(`${v}: ${res_areas}`);
    return acc + res_areas;
}, 0);

console.log(p1);
