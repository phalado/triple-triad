const getRandomBoolean = () => (Math.floor(100 * Math.random()) % 2 === 0);

const fields = board => [].concat(...board);

const cardsOnTheTable = board => (
  fields(board).filter(field => field !== null).length
);

export { getRandomBoolean, cardsOnTheTable };
