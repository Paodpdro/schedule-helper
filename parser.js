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

export function overlaps(meeting1, meeting2) {
    if(meeting1.day === meeting2.day) {
        if ((meeting1.start < meeting2.end && meeting2.start < meeting1.end)) {
            return true;
        }
        return false;
    } else {
        return false;
    }
}


export function optionClash(option1, option2) {
    for (let meeting1 of option1.meetings) {
        for (let meeting2 of option2.meetings) {
                if (overlaps(meeting1, meeting2)) {
                    return true;
                }
            }
        }
    
    return false;
}

export function conflicts(course1, course2) {
    let results = [];
    for (let option of course1) {
        for (let otherOption of course2) {
            for (let meeting of option.meetings) {
                for (let otherMeeting of otherOption.meetings) {
                    if(meeting.day === otherMeeting.day) {
                        if (overlaps(meeting, otherMeeting)) {
                            results.push({
                                course1: option.course,
                                option1: option.option,
                                meeting1: meeting,
                                course2: otherOption.course,
                                option2: otherOption.option,
                                meeting2: otherMeeting
                            });
                        }
                    }
                }
    
                
            }
        }
    }
    return results;
}

export function scheduleBuilder(courses) {
    let results = [];
    
    function backtrack(index, currentSchedule) {
        if (index === courses.length) {
            results.push([...currentSchedule]);
            return;
        }
    
        for (let option of courses[index]) {
            if(!currentSchedule.some(existingOption => optionClash(existingOption, option))) {
                currentSchedule.push(option);
                backtrack(index + 1, currentSchedule);
                currentSchedule.pop();
            }
        }
    }
    backtrack(0, [])
    return results;
}
