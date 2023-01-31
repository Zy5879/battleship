const Ship = (names, shift, hits) => {
  hits = 0;
  // const isSunk = () => {
  //   // let sunk;
  //   if ((hits = 0)) {
  //     console.log(true);
  //     return true;
  //     // console.log(true);
  //     //   return true;
  //   } else {
  //     console.log(false);
  //     return false;
  //   }
  // };
  return {
    names,
    shift,
    hits,
  };
};
export default Ship;

let ship1 = Ship("Sub", 4);
console.log(ship1);
