let read = Deno.readTextFileSync("day5_input.txt");

read = read.split("\n\n");

const instructions = read[0].split("\n").map(v => v.split('|'));
const updates = read[1].split('\n').map(v => v.split(','));

function findAllBeforeRequired(from) {
    return instructions.filter(v => v[0] == from).map(v => v[1]);
}

function checkOrdering(update) {
    // check from behind
    for(let check = update.length; check >= 0; check--) {
        const before = findAllBeforeRequired(update[check]);
        for(let precessor = check - 1; precessor >= 0; precessor--) {
            if(before.includes(update[precessor])) {
                return -1;
            }
        }
    }
    return Number(update[Math.floor(update.length/2)])
}


const res = updates.map((update) => {
    const order = checkOrdering(update);
    if(order == -1) {
        update.sort((a,b) => {
            const before_a = findAllBeforeRequired(a);
            const before_b = findAllBeforeRequired(b);
            if(before_a.includes(b)) {
                return -1;
            } else if (before_b.includes(a)) {
                return 1;
            } else {
                return 0;
            }
        });
        const reorder = checkOrdering(update);
        if(reorder == -1) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!");
            console.log(reorder);
            console.log("!!!!!!!!!!!!!!!!!!!!!!");
        }
        return [0, reorder]; 
    } else {
        return [order, 0];
    }
}).reduce((acc, val) => {
    // rust taught me this shit, this is so dumb
    return [acc[0] + val[0], acc[1] + val[1]];
}, [0,0]);

console.log(res);