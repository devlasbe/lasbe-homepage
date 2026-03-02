const current = new Date();
const todayDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
const calcBetweenDate = (start: string, end: string) => {
  const diffInTime = new Date(end).getTime() - new Date(start).getTime();
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
  return diffInDays;
};
export const date = { todayDate, calcBetweenDate };

export function getDateString(d: Date = new Date()): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
