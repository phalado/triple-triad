import { cardsOnTheTable, getRandomNumber, cloneTable } from './OtherHelpers';
import { getRank } from './CardCombatLogic';
import Cards from '../constants/Cards';

const testPosition = (row, column, card, table, cards, rules) => (cards.play1Cards.every(p1Card => {
  const thisCard = Cards.find(c => c.id === p1Card.id);
  if (row > 0) {
    const at = getRank(thisCard.ranks[3], thisCard.element, rules, table[row - 1][column][2]);
    const df = getRank(card.ranks[0], card.element, rules, table[row][column][2]);
    if (at > df) return false;
  }

  if (row < 2) {
    const at = getRank(thisCard.ranks[0], thisCard.element, rules, table[row + 1][column][2]);
    const df = getRank(card.ranks[3], card.element, rules, table[row][column][2]);
    if (at > df) return false;
  }

  if (column > 0) {
    const at = getRank(thisCard.ranks[2], thisCard.element, rules, table[row][column - 1][2]);
    const df = getRank(card.ranks[1], card.element, rules, table[row][column][2]);
    if (at > df) return false;
  }

  if (column < 2) {
    const at = getRank(thisCard.ranks[1], thisCard.element, rules, table[row][column + 1][2]);
    const df = getRank(card.ranks[2], card.element, rules, table[row][column][2]);
    if (at > df) return false;
  }

  return true;
}));

const safeMovement = (props, card) => {
  const { table, cards, rules } = props;
  const thisCard = Cards.find(c => c.id === card.id);

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (testPosition(i, j, thisCard, table, cards, rules)) {
        return { card: thisCard, row: i, column: j };
      }
    }
  }

  return null;
};

const randomMove = (cards, table) => {
  const index = getRandomNumber(0, 4);
  const row = getRandomNumber(0, 2);
  const column = getRandomNumber(0, 2);
  const card = Cards.find(c => c.id === cards.play2Cards[index].id);
  if (cards.play2Cards[index].dragable && !table[row][column][0]) return ({ card, row, column });
  return randomMove(cards, table);
};

const fakeRemoveCard = (cards, row, column) => {
  const newCards = { ...cards };
  const removable = newCards.play1Cards.find(c => c.row === row && c.column === column);
  newCards.play1Cards = newCards.play1Cards.filter(c => c !== removable);
  return newCards;
};

const fakeAddCard = (cards, id, row, column) => {
  const newCards = { ...cards };
  newCards.play2Cards = [
    ...newCards.play2Cards,
    {
      id, row, column, dragable: false,
    },
  ];
  return newCards;
};

const nCardsTurned = (props, card, row, column) => {
  const { table, rules } = props;
  const newTable = cloneTable(table);
  let { cards } = props;
  const element = newTable[row][column][2];

  const fakeCardCombat = (newRow, newColumn, rnk1, rnk2) => {
    if (newTable[newRow][newColumn][1] === false) return;

    const othCard = newTable[newRow][newColumn][0];
    const at = getRank(card.ranks[rnk1], card.element, rules, element);
    const df = getRank(othCard.ranks[rnk2], othCard.element, rules, newTable[newRow][newColumn][2]);
    if (df >= at) return;

    newTable[newRow][newColumn][1] = false;
    cards = fakeRemoveCard(cards, newRow, newColumn);
    cards = fakeAddCard(cards, card.id, row, column);
  };

  if (row > 0 && !!newTable[row - 1][column][0]) fakeCardCombat(row - 1, column, 0, 3);
  if (row < 2 && !!newTable[row + 1][column][0]) fakeCardCombat(row + 1, column, 3, 0);
  if (column > 0 && !!newTable[row][column - 1][0]) fakeCardCombat(row, column - 1, 1, 2);
  if (column < 2 && !!newTable[row][column + 1][0]) fakeCardCombat(row, column + 1, 2, 1);

  return ([cards.play2Cards.length - cards.play1Cards.length, card, row, column]);
};

const checkTurningCard = (props, card) => {
  const { table, cards } = props;
  const thisCard = Cards.find(c => c.id === card.id);
  const diference = cards.play2Cards.length - cards.play1Cards.length;
  const result = [];

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (!table[i][j][0]) {
        const move = nCardsTurned(props, thisCard, i, j);
        if (move[0] > diference) result.push(move);
      }
    }
  }
  return result;
};

const PCMovement = props => {
  const { table, cards } = props;
  const result = [];

  if (cardsOnTheTable(table) === 0) {
    cards.play2Cards.forEach(card => {
      const move = safeMovement(props, card);
      if (move) result.push(move);
    });

    if (result.length === 0) return randomMove(cards, table);
    return result[0];
  }

  cards.play2Cards.forEach(card => {
    if (card.dragable) {
      const move = checkTurningCard(props, card);
      if (move) result.push(...move);
    }
  });

  if (result.length === 0) {
    cards.play2Cards.forEach(card => {
      if (card.dragable) {
        const move = safeMovement(props, card);
        if (move) result.push(move);
      }
    });
    if (result.length === 0) return randomMove(cards, table);
    return result[0];
  }

  if (result.length === 1) return { card: result[1], row: result[2], column: result[3] };

  const filterResult = result.sort((a, b) => a[0] < b[0]).filter(move => move[0] === result[0][0]);
  const finalResult = filterResult[getRandomNumber(0, filterResult.length)];

  return ({ card: finalResult[1], row: finalResult[2], column: finalResult[3] });
};

export default PCMovement;
