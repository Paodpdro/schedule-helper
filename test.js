import {parseMeetings, parseCourse, overlaps} from './parser.js';
import fs from 'fs';
import path from 'path';

const text1 = fs.readFileSync("sample1.txt", "utf8");
const text2 = fs.readFileSync("sample2.txt", "utf8");

const course1 = parseCourse(text1);   
const course2 = parseCourse(text2);   

// console.log(JSON.stringify(course1, null, 2));

const tests = [
    { name: "1 real overlap",  a: { day: "Monday", start: 540, end: 600 }, b: { day: "Monday",  start: 570, end: 630 }, expected: true },
    { name: "2 touching",      a: { day: "Monday", start: 540, end: 600 }, b: { day: "Monday",  start: 600, end: 660 }, expected: false },
    { name: "3 inside",        a: { day: "Monday", start: 540, end: 660 }, b: { day: "Monday",  start: 570, end: 600 }, expected: true },
    { name: "4 different day", a: { day: "Monday", start: 540, end: 600 }, b: { day: "Tuesday", start: 540, end: 600 }, expected: false },
    { name: "5 identical",     a: { day: "Monday", start: 540, end: 600 }, b: { day: "Monday",  start: 540, end: 600 }, expected: true },
];

for (const t of tests) {
    const result = overlaps(t.a, t.b);
    console.log(t.name, result === t.expected ? "PASS" : "FAIL", `(got ${result}, expected ${t.expected})`);
}