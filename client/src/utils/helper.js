export function fixTime(time) {
    // Extract hours, minutes, and AMPM from the provided time string
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];

    // Adjust hours based on the AMPM value
    if (AMPM === "pm" && hours > 12) hours = hours - 12;
    if (AMPM === "am" && hours === 12) hours = hours - 12;

    // Convert hours and minutes to strings and add leading zeros if necessary
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    // Return the fixed time string in the format "HH:mm AM/PM"
    return (sHours + ":" + sMinutes + " " + AMPM);
}
