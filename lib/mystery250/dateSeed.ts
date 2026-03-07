export function getUtcDaySeed(date = new Date()): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  return Math.floor(Date.UTC(year, month, day) / 86400000);
}
