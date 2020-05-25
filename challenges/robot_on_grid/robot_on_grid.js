
// https://github.com/Argons/Cracking-the-Coding-Interview/blob/master/Recursion-2.cpp

function steps(x, y, path = [[x, y]]) {
  if (x === 1 && y === 1) {
    path.push([0, 0]);
    console.log(path);
    return 1;
  }
  if (x === 1) {
    return steps(x, y - 1, [...path, [x, y - 1]]);
  }
  if (y === 1) {
    return steps(x - 1, y, [...path, [x - 1, y]]);
  }
  return steps(x - 1, y, [...path, [x - 1, y]]) + steps(x, y - 1, [...path, [x, y - 1]]);
}

function pathsIter(x, y) {
  if (x === 0 && y === 0) return 0;
  let paths = Array.from({ length: y }).map(() => Array.from({ length: x }));

  for (let _y = 0; _y < y; _y++) {
      paths[_y][0] = 1;
  }

  for (let _x = 0; _x < x; _x++) {
      paths[0][_x] = 1;
  }


  for (let i = 1; i < y; i++) {
      for (let j = 1; j < x; j++) {
          paths[i][j] = paths[i-1][j] + paths[i][j-1];
      }
  }

  console.log(paths);
  return paths[y-1][x-1];
}


console.log(steps(3, 3));
console.log(pathsIter(3, 3));