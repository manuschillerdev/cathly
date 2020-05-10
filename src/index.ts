export default function cathly(d: Date, offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  let year = d.getFullYear(),
    month = d.getMonth(),
    daysInMonth = new Date(year, month + 1, 0).getDate(),
    daysInPreviousMonth = new Date(year, month, 0).getDate(),
    // ~~(x + 1) is the same as Math.ceil(x), but saves some bytes
    weeksInMonth = ~~(daysInMonth / 7 + 1),
    offsetFirstDay = new Date(year, month, 1 - (offset | 0)).getDay(),
    length = (weeksInMonth + Math.min(offsetFirstDay, 1)) * 7;

  return Array.from({ length }, (_, day) => {
    let date = day + 1 - offsetFirstDay;
    if (date < 1) {
      return new Date(year, month - 1, daysInPreviousMonth + date);
    }

    return new Date(year, month, date);
  });
}

