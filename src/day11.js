const read = Deno.readTextFileSync("day11_input.txt").split(" ").map(n => Number(n));
console.log(read);

const cache = [];

function insertCache(num, blinks, result) {
    const posIdx = cache.findIndex(n => n.num == num);
    if ( posIdx == -1 ) {
        const pos = {
            num: num,
            blinks: [{
                blinks: blinks,
                result: result
            }]
        }
        cache.push(pos);
        return;
    } else {
        const pos = cache[posIdx];
        const blinkIdx = pos.blinks.findIndex(n => n.blinks == blinks);
        if(blinkIdx == -1) {
            pos.blinks.push({blinks: blinks, result: result})
        }
    }
}

function cached(num, blinks) {
    const foundNum = cache.find(n => n.num == num);
    if(foundNum == undefined) {
        return undefined;
    }
    const result = foundNum.blinks.find(blink => blink.blinks == blinks);
    if(result == undefined) {
        return undefined;
    }
    return result.result;
}

function blink(num, times) {
    if(times == 0) {
        return 1;
    }

    const s = num.toString();
    let r = cached(num, times);
    if(r == undefined) {
        if(num == 0) {
            r = blink(1, times - 1);
        } else if (s.length % 2 == 0) {
            const l = s.length / 2;
            const s1 = s.slice(0, l);
            const s2 = s.slice(l, s.length);
            r = blink(Number(s1), times - 1) + blink(Number(s2), times - 1);
        } else {
            r = blink(num * 2024, times - 1);
        }
        insertCache(num, times, r);
    } else {
        // console.log("cache hit for %d %d", num, times);
    }
    return r; 
}

let stones = 0;
for(let i = 0; i < read.length; i++) {
    const r = blink(read[i], 75);
    console.log("%d: %d", i, r);
    stones += r;
}
console.log(stones);
