const Ship = (length) => {
  let currentlength = Array(length);
  new Array(currentlength);
  let hitcounter = 1;
  const hit = () => {
    console.log(hitcounter++);
    return currentlength.length--;
  };
  const isSunk = () => {
    // let sunk;
    if (currentlength == 0) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  };
  return {
    length,
    currentlength,
    hit,
    isSunk,
  };
};

export default Ship;

let ship1 = Ship(5);
ship1.hit();
console.log(ship1);

// let ship1 = Ship(2);
// console.log(ship1.length);
// let ship2 = Ship(3);
// ship1.isSunk();
// console.log(ship1);
// console.log(ship2);
// let ship2 = Ship(4);
// console.log(ship1);
// console.log(ship2);
