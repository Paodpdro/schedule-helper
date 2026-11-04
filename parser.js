export function parseMeetings(meetings) {
    return meetings.map(meeting => {
        return meeting.matchAll(/(\w+)\s+(\d{2}):(\d{2}) to (\d{2}):(\d{2})/g)
    })
}
