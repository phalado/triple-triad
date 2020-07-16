import { getRandomBoolean, getRandomNumber } from './OtherHelpers';
import Cards from '../constants/Cards';

const getCardsFromPlayerDeck = playerCards => {
  const deck = [];
  Object.entries(playerCards).forEach(([key, value]) => {
    for (let i = 0; i < value; i += 1) {
      deck.push(Cards.find(card => card.id === parseInt(key, 10)));
    }
  });
  return deck;
};

const getNPCsCards = (cards, special) => {
  const deck = [];
  while (deck.length < 5) {
    if (special.length > 0) {
      special.forEach(cardID => {
        if (getRandomBoolean() && !deck.includes(cardID)) deck.push(cardID);
      });
    }

    const cardLevel = cards[getRandomNumber(0, cards.length)];
    const randomCard = getRandomNumber(1, 11);
    const card = randomCard + (11 * cardLevel);
    if (card !== 48) deck.push(card);
  }

  return deck;
};

const getTableData = (npcs, place) => {
  const tableData = [];

  // eslint-disable-next-line no-unused-vars
  Object.entries(npcs[place]).forEach(([key, value]) => {
    const {
      name, win, loose, tie, cards, special,
    } = value;
    tableData.push([name, win, loose, tie, { cards, special }, key]);
  });

  tableData.sort((a, b) => a[0] > b[0]);

  return tableData;
};

export { getTableData, getNPCsCards, getCardsFromPlayerDeck };
