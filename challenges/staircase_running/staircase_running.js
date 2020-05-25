
function staircaseRunningRec(n, map={}) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  } else if (n === 3) {
    return 4;
  } else {
    if (map[n]) return map[n];
    map[n] = staircaseRunningRec(n - 1, map) + staircaseRunningRec(n - 2, map) + staircaseRunningRec(n - 3, map);
    return map[n];
  }
}

console.log(staircaseRunningRec(5));

/*
3:

1 1 1
1 2
2 1
3


4:

1 1 1 1
2 2
1 3
3 1
2 1 1
1 2 1
1 1 2

5:

1 1 1 1 1
1 2 2
2 1 2
2 2 1
2 1 1 1
1 2 1 1
1 1 2 1
1 1 1 2
3 2
2 3
3 1 1
1 3 1
1 1 3
*/