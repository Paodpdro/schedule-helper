export async function parseMeetings(meetings) {
    return meetings.map(meeting => {
        return meeting.match(/^\w\n\d\d:\d\d\n\d\d:\d\d$/gm)
    })
}
