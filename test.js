import parseMeetings from './parser.js';
import fs from 'fs';
import path from 'path';

const text = fs.readFileSync("sample1.txt", "utf8");

await parseMeetings([text])