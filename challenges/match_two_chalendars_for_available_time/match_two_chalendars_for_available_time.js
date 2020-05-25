
// https://www.youtube.com/watch?v=3Q_oYDQ2whs

function match2(first, firstLimit, second, secondLimit) {
  first.unshift(['00:00', firstLimit[0]]);
  second.unshift(['00:00', secondLimit[0]]);
  first.push([firstLimit[1], '24:00']);
  second.push([secondLimit[1], '24:00']);

  const merged = [];
  const getCurrentStream = () => first[0][0] < second[0][0] ? first : second;
  const getOtherStream = (currentStream) => currentStream === first ? second : first;
  const inBetween = (interval, otherInterval) => {
    return (interval[0] <= otherInterval[0]) && (otherInterval[0] <= interval[1]);
  };
  const mergeInto = (interval, otherInterval) => {
    const max = interval[1] > otherInterval[1] ? interval[1] : otherInterval[1];
    interval[1] = max;
  };

  while(first.length !== 0 && second.length !== 0) {
    const currentStream = getCurrentStream();
    const otherStream = getOtherStream(currentStream);
    const currentInterval = currentStream.shift();
    const lastMergedInterval = merged[merged.length - 1];

    if (lastMergedInterval && inBetween(lastMergedInterval, currentInterval)) {
      mergeInto(lastMergedInterval, currentInterval);
      continue;
    }

    merged.push(currentInterval);

    if (inBetween(currentInterval, otherStream[0])) {
      const otherInterval = otherStream.shift();
      mergeInto(currentInterval, otherInterval);
    }
  }

  const res = merged.reduce((acc, current, idx, src) => {
    const next = src[idx + 1];
    if (next && current[1] < next[0]) {
      acc.push([current[1], next[0]])
    }
    return acc;
  }, []);

  return res;
}

const first = [['09:00', '10:30'], ['12:00', '13:00'], ['16:00', '18:00']];
const firstLimit = ['09:00', '20:00'];
const second = [['10:00', '11:30'], ['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']];
const secondLimit = ['10:00', '18:30'];

const res = match2(first, firstLimit, second, secondLimit);
console.log(res);
// output [['11:30', '12:30'], ['15:00', '16:00'], ['18:00', '18:30']]

