const Ship = (name, length) => {
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
      //   console.log(true);
      return true;
    } else {
      //   console.log(false);
      return false;
    }
  };
  return {
    name,
    length,
    currentlength,
    hit,
    isSunk,
  };
};

export default Ship;
