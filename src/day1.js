import assert from "node:assert";

const read = Deno.readTextFileSync("day1_input.txt");

const left = [];
const right = [];
read.split("\n").forEach((line) => {
  const elems = line.split("   ");
  assert(elems.length == 2, "More than two elements in line: %s", line);
  left.push(elems[0]);
  right.push(elems[1]);
});
left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

assert(left.length && right.length, "Columns have different length");

let distance = 0;
let similarity = 0;
for (let i = 0; i < left.length; i++) {
  // similarity
  let count = 0;
  right.forEach((number) => {
    if (number == left[i]) {
      count += 1;
    }
  });
  similarity += left[i] * count;
  // distance
  distance += Math.abs(right[i] - left[i]);
}
console.log("distance: %d, similarity: %d", distance, similarty);
