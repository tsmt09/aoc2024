let read = Deno.readTextFileSync("day7_input.txt").split("\n").map(line =>{
    let split = line.split(":");
    return {
        result: Number(split[0].trim()),
        numbers: split[1].trim().split(" ").map(v => Number(v))
    }
});


function calc(nums, ops) {
    let ret = nums.shift();
    while(nums.length > 0) {
        const op2 = nums.shift();
        const op = ops.shift();
        if(op == "||") {
            ret = Number(ret.toString().concat(op2.toString()))
        } else if(op == "+") {
            ret = ret + op2;
        } else {
            ret = ret * op2;
        }
    }
    return ret;
}

function findRightCalc(line) {
    let found = undefined;
    for(let i = 0; i < Math.pow(3, line.numbers.length - 1); i++) {
        const binaryArray = i.toString(3).split('').map(bit => parseInt(bit));
        while(binaryArray.length < line.numbers.length - 1) {
            binaryArray.unshift(0);
        }
        const ops = binaryArray.map(num => {
            switch(num) {
                case 0: return "+"; break;
                case 1: return "*"; break;
                default: return "||"; break;
            }
        });
        let res = calc(line.numbers.slice(), ops);
        if (res == line.result) {
            found = res;
        } 
    }
    return found;
}

function findAllLines(lines) {
    let result = 0;
    for(let i = 0; i < lines.length; i++) {
        let res = findRightCalc(lines[i]);
        if(res == undefined) {
            continue;
        } else {
            result += res; 
        }
    }
    return result;
}


const test = {
    result: 3267,
    numbers: [81,40,27]
}

console.log(findRightCalc(test));
console.log(findAllLines(read));