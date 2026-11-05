import {parseMeetings, parseCourse} from './parser.js';
import fs from 'fs';
import path from 'path';

const text = fs.readFileSync("sample2.txt", "utf8");

// const option1 = `Monday
// 09:00 to 10:00
// Wednesday
// 09:00 to 10:00
// Sunday
// 08:00 to 11:00`;

// console.log(parseMeetings(option1));
console.log(JSON.stringify(parseCourse(text), null, 2));
