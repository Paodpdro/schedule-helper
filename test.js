import {parseMeetings} from './parser.js';
import fs from 'fs';
import path from 'path';

const text = fs.readFileSync("sample1.txt", "utf8");

const option1 = `1
Open
Regular Academic Session
Lecture - Class 3413 -Section 4
Laboratory - Class 3414 -Section 5
25/08/2026 - 03/12/2026
Monday
09:00 to 10:00
Wednesday
09:00 to 10:00
Sunday
08:00 to 11:00
01.1.06
01.1.06
10.2.32
Robert Ford
Robert Ford
Robert Ford
Open Seats 10 of 72
Open Seats 5 of 24`;

console.log(parseMeetings(option1));