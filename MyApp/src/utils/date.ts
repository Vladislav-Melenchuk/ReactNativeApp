const pad = (value: number) => String(value).padStart(2, '0');

if (!Date.prototype.toYyyyMmDd) {
  Date.prototype.toYyyyMmDd = function toYyyyMmDd() {
    return [
      this.getFullYear(),
      pad(this.getMonth() + 1),
      pad(this.getDate()),
    ].join('');
  };
}

if (!Date.prototype.toSqlDateTime) {
  Date.prototype.toSqlDateTime = function toSqlDateTime() {
    return [
      [
        this.getFullYear(),
        pad(this.getMonth() + 1),
        pad(this.getDate()),
      ].join('-'),
      [pad(this.getHours()), pad(this.getMinutes()), pad(this.getSeconds())].join(
        ':',
      ),
    ].join(' ');
  };
}

export function formatRateDate(rawDate: string) {
  const [day, month, year] = rawDate.split('.');

  if (!day || !month || !year) {
    return rawDate;
  }

  return `${day}.${month}.${year}`;
}

export function formatDayLabel(date: Date) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}
