const getRandomBoolean = () => (Math.floor(100 * Math.random()) % 2 === 0);
const getRandomNumber = (min, max) => Math.floor((max - min) * Math.random()) + min;

const fields = board => [].concat(...board);

const cardsOnTheTable = board => {
  if (board[0][0]) return fields(board).filter(field => !!field[0]).length;
  return fields(board).filter(field => !!field).length;
};

const getCardContainer = (row, column, player, scrennHeight, styles) => {
  let cardContainer = styles.container;

  if (row === 0) {
    cardContainer = { ...cardContainer, ...styles.topRow };
  } else if (row === 1) {
    cardContainer = { ...cardContainer, ...styles.centerRow };
  } else if (row === 2) {
    cardContainer = { ...cardContainer, ...styles.bottomRow };
  } else {
    const value = (scrennHeight * 0.15) + (row - 3) * scrennHeight * 0.1;
    cardContainer = player ? { ...cardContainer, top: value, right: '2.5%' }
      : { ...cardContainer, top: value, left: '2.5%' };
  }

  if (column === 0) {
    cardContainer = { ...cardContainer, ...styles.leftColumn };
  } else if (column === 1) {
    cardContainer = { ...cardContainer, ...styles.centerColumn };
  } else if (column === 2) {
    cardContainer = { ...cardContainer, ...styles.rightColumn };
  }

  return cardContainer;
};

const getRandomCards = () => {
  const cards = [];
  cards.push(getRandomNumber(1, 55));
  cards.push(getRandomNumber(1, 55));
  cards.push(getRandomNumber(56, 77));
  cards.push(getRandomNumber(78, 99));
  cards.push(getRandomNumber(100, 110));
  return cards;
};

const getCardsId = cards => {
  const newP1Cards = [];
  const newP2Cards = [];
  cards.forEach(card => newP1Cards.push(card.id));

  let value = 0;
  while (newP1Cards.length > 5) {
    value = getRandomNumber(0, newP1Cards.length);
    newP2Cards.push(newP1Cards[value]);
    newP1Cards.splice(value, 1);
  }

  return ({ newP1Cards, newP2Cards });
};

// const handleEndOfTurn = (turn, gameOver, score, table) => {
//   if (gameOver) return;

//   const myTurn = cardsOnTheTable(table) % 2 === 1 ? !turn : turn;
//   if (myTurn) ToastAndroid.show('Player 1 turn', ToastAndroid.LONG);
//   else ToastAndroid.show('Player 2 turn', ToastAndroid.LONG);

//   return;
// };

export {
  getRandomBoolean, cardsOnTheTable, getCardContainer, getRandomCards, getCardsId,
};
