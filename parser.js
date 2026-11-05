export function parseMeetings(meetings) {
    const matches = [...meetings.matchAll(/(\w+)\s+(\d+):(\d+)\s+to\s+(\d+):(\d+)/g)];
    const seen = new Set();
    let courseMeetings = [];

    for (const match of matches) {
        const day = match[1];
        const start = Number(match[2]) * 60 + Number(match[3]);
        const end = Number(match[4]) * 60 + Number(match[5]);
        const key = `${day}-${start}-${end}`;

        if (!seen.has(key)) {
            seen.add(key);
            courseMeetings.push({ day, start, end, durationMinutes: end - start });
        }
    }
    return courseMeetings;
}

export function parseCourse(text) {
    const m = text.match(/^([A-Z]{4} ?\d{4})\r?\n(.+)$/m);
    const course = m[1];   
    const name = m[2];     
    const block = [...text.match(/^\d+\r?\n(Open|Closed|Wait List)[\s\S]*?(?=^\d+\r?\n(Open|Closed|Wait List)|(?![\s\S]))/gm)]
    return block.map(b => {
        const head = b.match(/^(\d+)\r?\n(Open|Closed|Wait List)/);
        return {
        course : course,
        courseName : name,
        option: Number(head[1]),
        status: head[2],
        meetings: parseMeetings(b)
        }
    })
    
} 