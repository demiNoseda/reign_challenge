function timeDiffFromNow(date) {
  const milisec = new Date(date).getTime();
  const now = Date.now();
  const dif = now - milisec;
  let hours = Math.trunc(dif / (1000 * 3600));

  let text = "";
  let timeUnit = 0;
  if (hours < 1) {
    return "a few minutes ago";
  } else if (hours < 24) {
    timeUnit = hours;
    text = timeUnit === 1 ? "hour" : "hours";
  } else if (hours < 24 * 7) {
    timeUnit = Math.floor(hours / 24);
    text = timeUnit === 1 ? "day" : "days";
  } else if (hours < 24 * 7 * 4) {
    timeUnit = Math.floor(hours / (24 * 7));
    text = timeUnit === 1 ? "week" : "weeks";
  } else if (hours < 24 * 7 * 4 * 12) {
    timeUnit = Math.floor(hours / (24 * 7 * 4));
    text = timeUnit === 1 ? "month" : "months";
  } else {
    timeUnit = Math.floor(hours / (24 * 7 * 4 * 12));
    text = timeUnit === 1 ? "year" : "years";
  }
  return `${timeUnit} ${text} ago`;
}

export default timeDiffFromNow;
