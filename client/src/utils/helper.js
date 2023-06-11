export function fixTime(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);

    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === "pm" && hours > 12) hours = hours - 12;
    if (AMPM === "am" && hours === 12) hours = hours - 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return (sHours + ":" + sMinutes + " " + AMPM);
}
