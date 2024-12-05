const read = Deno.readTextFileSync("day3_input.txt");

function next_dont(input, from) {
    return input.indexOf("don't()", from);
}

function next_do(input, from) {
    return input.indexOf("do()", from);
}

function find_next_mul(input, from) {
    let idx = input.indexOf("mul(",from); 
    if(idx == -1) {
        return {
            continue_from: -1,
            mul: null
        }
    }
    // jump over until next do if don't comes before mul()  (PART 2)
    const dont = next_dont(input, from);
    if((dont > 0 && dont < idx)) {
        const n_do = next_do(input, dont);
        idx = input.indexOf("mul(",n_do);        
    }
    const next_close = read.indexOf(")", idx);
    const next_comma = read.indexOf(",", idx);
    if(next_close < next_comma) {
        return {
            continue_from: idx + 1,
            mul: null
        }
    }
    const n1 = Number(read.substring(idx + 4, next_comma), 10);
    const n2 = Number(read.substring(next_comma + 1, next_close), 10);
    if(isNaN(n1) || isNaN(n2)) {
        console.log("Error parsing: %s", input.substring(idx, next_close + 1))
        return {
            continue_from: idx + 1,
            mul: null
        }
    }
    return {
        continue_from: idx + 1,
        mul: n1 * n2,
        text: input.substring(idx, next_close + 1)
    }
}

let found = find_next_mul(read, 0);
let result = found.mul;
while(found.continue_from != -1) {
    console.log(found);
    found = find_next_mul(read, found.continue_from);
    if(found.mul != null) {
        result = result + found.mul;
    }
}
console.log(result);
