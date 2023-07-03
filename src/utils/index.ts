export const formatTime = ({
  hours, minutes, seconds
}: {
  hours: number | string, minutes: number | string, seconds: number | string
}) => {
  if (typeof hours === 'string') {
    hours = parseInt(hours, 10);
  }
  if (typeof minutes === 'string') {
    minutes = parseInt(minutes, 10);
  }
  if (typeof seconds === 'string') {
    seconds = parseInt(seconds, 10);
  }
  const h = hours < 10 ? '0' + hours : hours;
  const m = minutes < 10 ? '0' + minutes : minutes;
  const s = seconds < 10 ? '0' + seconds : seconds;
  return `${h}:${m}:${s}`;
}
