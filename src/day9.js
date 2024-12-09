const read = Deno.readTextFileSync("day9_input.txt");

// // part1
let disk = [];
let gid = 0;
// for(let i = 0; i < read.length; i++) {
//     let blocks = Number(read[i]);
//     let id = gid;
//     if(i % 2 == 1) {
//         // free blocks
//         id = -1;
//         gid +=1;
//     }
//     for(let b = 0; b < blocks; b++) {
//         disk.push(id);
//     }
// }


// let lastFilled = disk.findLastIndex(item => item != -1);
// let firstEmpty = disk.findIndex(item => item == -1);
// while(lastFilled > firstEmpty) {
//     disk[firstEmpty] = disk[lastFilled];
//     disk[lastFilled] = -1;
//     lastFilled = disk.findLastIndex(item => item != -1);
//     firstEmpty = disk.findIndex(item => item == -1);
// }

// let checksum = disk.reduce((res, num, idx) => { 
//     if(num == -1) {
//         return res;
//     } else {
//         return res + (num * idx);
//     }
// }, 0);

// console.log(checksum);

// part 2

disk = [];
gid = 0;
for(let i = 0; i < read.length; i++) {
    let blocks = Number(read[i]);
    let id = gid;
    if(i % 2 == 1) {
        // free blocks
        id = -1;
        gid +=1;
    }
    for(let b = 0; b < blocks; b++) {
        disk.push(id);
    }
}

function findIdWithLen(disk, id) {
    const idx = disk.findIndex(item => item == id);
    let len = 0;
    for(let i = idx; i < idx + 12; i++) {
        if(disk[i] != id) {
            break;
        }
        len += 1;
    }
    return {
        idx: idx,
        len: len
    };
}

function findFreeSpace(disk, minlen) {
    let free = false;
    let len = 0;
    for(let i = 0; i < disk.length; i++) {
        if(free == false && disk[i] == -1) {
            free = true;
        }
        if(free == true && disk[i] != -1) {
            if(len >= minlen) {
                return i - len;
            } else {
                free = false;
                len = 0;
            }
        }
        if(free == true) {
            len += 1;
        }
    }
    return -1;
}

let largest_id = disk[disk.length - 1];

console.log(largest_id);

let lf = findIdWithLen(disk, largest_id);
let free_idx = findFreeSpace(disk, lf.len);
console.log(lf);


while(largest_id > 0) {
    console.log("(%d): d[%d] %d <-> d[%d] %d", lf.len, free_idx, disk[free_idx],lf.idx, disk[lf.idx]);
    if(free_idx != -1 && free_idx < lf.idx) {
        console.log("switching (%d): d[%d] %d <-> d[%d] %d", lf.len, free_idx, disk[free_idx],lf.idx, disk[lf.idx]);
        for(let i = 0; i < lf.len; i++) {
            disk[free_idx + i] = disk[lf.idx + i];
            disk[lf.idx + i] = -1;
        } 
    }
    largest_id -= 1;
    lf = findIdWithLen(disk, largest_id);
    free_idx = findFreeSpace(disk, lf.len);
}

// console.log(disk.slice(lf.idx, lf.idx + 30));

const checksum = disk.reduce((res, num, idx) => { 
    if(num == -1) {
        return res;
    } else {
        return res + (num * idx);
    }
}, 0);

console.log(checksum);
