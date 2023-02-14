export const Ship = (names, length = 0, hits = 0) => {
  function attack() {
    this.hits++;
  }

  function isSunk() {
    if (this.hits >= length) {
      return true;
    } else {
      return false;
    }
  }

  return {
    names,
    length,
    hits,
    isSunk,
    attack,
  };
};
