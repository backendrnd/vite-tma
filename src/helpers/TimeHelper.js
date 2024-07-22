export function getTimeString(time) {
    if (time === undefined) {
        return '-:-';
    }
    const totalSeconds = parseInt(time, 10);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
        (hours === 0 ? '' : hours.toString().padStart(2, '0') + ':') +
        minutes.toString().padStart(2, '0') +
        ':' +
        seconds.toString().padStart(2, '0')
    );
}
