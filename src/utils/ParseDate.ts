export const parseDate = (date: string) => {
  const parsedDate = Date.parse(date);
  const ownDate = new Date(parsedDate);
  const day = ownDate.getDate();
  const month = ownDate.getMonth();
  const year = ownDate.getFullYear();
  const hours = ownDate.getHours();
  const minutes = ownDate.getMinutes();
  return `${day >= 10 ? day : `0${day}`}.${month >= 10 ?
    month : `0${month}`}.${year} - ${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}`
}