const read = Deno.readTextFileSync("day2_input.txt");


function checkSafe(numbers) {
    let isInc = true;
    let isSafe = true;
    if(numbers[0] >= numbers[numbers.length - 1]) {
        isInc = false;
    }
    for(let i = 1; i < numbers.length; i++) {
        const pre = numbers[i-1];
        const now = numbers[i];
        let diff = now - pre;
        if(!isInc) {
            diff = diff * -1;
        }
        if(!((diff >= 1) && (diff <= 3))) {
            isSafe = false;
            break;
        }
    }
    return isSafe;
}

const safe = [];
const unsafe = [];
read.split("\n").forEach((line) => {
    const numbers = line.trim().split(' ').map(num => parseInt(num, 10));
    let isSafe = checkSafe(numbers);
    if(!isSafe) {
        // part 2
        for(let i = 0; i < numbers.length; i++) {
            const strippedNumbers = numbers.slice();
            strippedNumbers.splice(i, 1);
            if(checkSafe(strippedNumbers)) {
                isSafe = true;
                break;
            }
        }
    }
    if(isSafe) {
        safe.push(numbers);
    } else {
        unsafe.push(numbers);
    }
});

console.log(safe.length);