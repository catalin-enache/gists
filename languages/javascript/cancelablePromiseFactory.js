const cancelablePromiseFactory = (fnPromise) => {
  const map = new Map();
  return (...args) => {
    map.has(fnPromise) && (map.get(fnPromise).current = true);
    map.set(fnPromise, { current: false });
    let isCanceled = map.get(fnPromise); // if not auto-cancel needed but only manual cancel, this can be set to { current: true }
    let promise = new Promise((res, rej) => {
      const p = fnPromise(...args);
      p.then(result => {
        return !isCanceled.current && res(result);
      }).catch(err => {
        return !isCanceled.current && rej(err);
      })
    })

    return {
      then: promise.then.bind(promise),
      catch: promise.catch.bind(promise),
      cancel: () => {
        isCanceled.current = true;
      }
    };
  };
};

const myPromise = (a, b) => new Promise((res) => setTimeout(() => res(a + b), 1000));
const cPromise = cancelablePromiseFactory(myPromise);
const p = cPromise(2, 2);
p.then(console.log).finally(() => console.log('done!'));
const q = cPromise(3, 3); // is automatically cancelling p
q.then(console.log).finally(() => console.log('done!'));
setTimeout(q.cancel, 500); // manually cancelling prime
