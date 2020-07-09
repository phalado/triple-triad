/* eslint-disable no-unused-expressions */
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

  const emptySpots = [];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (!table[i][j][0]) emptySpots.push([i, j]);
    }
  }

  emptySpots.forEach(spot => {
    if (testPosition(spot[0], spot[1], thisCard, table, cards, rules)) {
      return { card: thisCard, row: spot[0], column: spot[1] };
    }
    return null;
  });
};

const randomMove = (cards, table) => {
  const dragableCards = [];
  cards.play2Cards.forEach(card => {
    if (card.dragable) dragableCards.push(card.id);
  });
  const emptySpots = [];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (!table[i][j][0]) emptySpots.push([i, j]);
    }
  }
  const spot = getRandomNumber(0, emptySpots.length);
  const index = getRandomNumber(0, dragableCards.length);
  const card = Cards.find(c => c.id === dragableCards[index]);
  // console.log('Random', emptySpots[spot], card);
  return ({ card, row: emptySpots[spot][0], column: emptySpots[spot][1] });
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
  let { cards } = props;
  const { table, rules } = props;
  const newTable = cloneTable(table);
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

const fakeCheckSame = (props, card, row, column) => {
  let { cards } = props;
  const { table, rules } = props;
  const newTable = cloneTable(table);
  const element = newTable[row][column][2];
  const sameCards = [];

  const sameCheckings = sameCards => {
    if (sameCards.every(card => newTable[card[0]][card[1]][1] === false)) return false;
    if (sameCards.length < 2) {
      if (!rules.sameWall) return false;
      if ((row !== 0 || card.ranks[0] !== 10)
        && (row !== 2 || card.ranks[3] !== 10)
        && (column !== 0 || card.ranks[1] !== 10)
        && (column !== 0 || card.ranks[2] !== 10)
      ) return false;
    }
    return true;
  };

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

  const fakeCheckCombo = crd => {
    const row = crd[0];
    const column = crd[1];

    if (row > 0 && !!newTable[row - 1][column][0]) fakeCardCombat(row - 1, column, 0, 3);
    if (row < 2 && !!newTable[row + 1][column][0]) fakeCardCombat(row + 1, column, 3, 0);
    if (column > 0 && !!newTable[row][column - 1][0]) fakeCardCombat(row, column - 1, 1, 2);
    if (column < 2 && !!newTable[row][column + 1][0]) fakeCardCombat(row, column + 1, 2, 1);

    // console.log('Combo', cards);
    return cards;
  };

  if (row > 0 && newTable[row - 1][column][0] !== null) {
    if (card.ranks[0] === newTable[row - 1][column][0].ranks[3]) sameCards.push([row - 1, column]);
  }

  if (row < 2 && newTable[row + 1][column][0] !== null) {
    if (card.ranks[3] === newTable[row + 1][column][0].ranks[0]) sameCards.push([row + 1, column]);
  }

  if (column > 0 && newTable[row][column - 1][0] !== null) {
    if (card.ranks[1] === newTable[row][column - 1][0].ranks[2]) sameCards.push([row, column - 1]);
  }

  if (column < 2 && newTable[row][column + 1][0] !== null) {
    if (card.ranks[2] === newTable[row][column + 1][0].ranks[1]) sameCards.push([row, column + 1]);
  }

  if (sameCheckings(sameCards)) {
    const crds = sameCards.filter(card => newTable[card[0]][card[1]][1] !== false);

    crds.forEach(crd => {
      newTable[crd[0]][crd[1]][1] = false;
      cards = fakeRemoveCard(cards, crd[0], crd[1]);
      cards = fakeAddCard(cards, card.id, row, column);
      cards = fakeCheckCombo(crd);
    });
  }

  if (row > 0 && !!newTable[row - 1][column][0]) fakeCardCombat(row - 1, column, 0, 3);
  if (row < 2 && !!newTable[row + 1][column][0]) fakeCardCombat(row + 1, column, 3, 0);
  if (column > 0 && !!newTable[row][column - 1][0]) fakeCardCombat(row, column - 1, 1, 2);
  if (column < 2 && !!newTable[row][column + 1][0]) fakeCardCombat(row, column + 1, 2, 1);

  return ([cards.play2Cards.length - cards.play1Cards.length, card, row, column]);
};

const fakeCheckPlus = (props, card, row, column) => {
  let { cards } = props;
  const { table, rules } = props;
  const newTable = cloneTable(table);
  const element = newTable[row][column][2];
  const plusCards = {};

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

  const fakeCheckCombo = crd => {
    const row = crd[0];
    const column = crd[1];

    if (row > 0 && !!newTable[row - 1][column][0]) fakeCardCombat(row - 1, column, 0, 3);
    if (row < 2 && !!newTable[row + 1][column][0]) fakeCardCombat(row + 1, column, 3, 0);
    if (column > 0 && !!newTable[row][column - 1][0]) fakeCardCombat(row, column - 1, 1, 2);
    if (column < 2 && !!newTable[row][column + 1][0]) fakeCardCombat(row, column + 1, 2, 1);

    // console.log('Combo', cards);
    return cards;
  };

  if (row > 0 && newTable[row - 1][column][0] !== null) {
    const sum = card.ranks[0] + newTable[row - 1][column][0].ranks[3];
    plusCards[sum] ? plusCards[sum].push([row - 1, column])
      : plusCards[sum] = [[row - 1, column]];
  }

  if (row < 2 && newTable[row + 1][column][0] !== null) {
    const sum = card.ranks[3] + newTable[row + 1][column][0].ranks[0];
    plusCards[sum] ? plusCards[sum].push([row + 1, column])
      : plusCards[sum] = [[row + 1, column]];
  }

  if (column > 0 && newTable[row][column - 1][0] !== null) {
    const sum = card.ranks[1] + newTable[row][column - 1][0].ranks[2];
    plusCards[sum] ? plusCards[sum].push([row, column - 1])
      : plusCards[sum] = [[row, column - 1]];
  }

  if (column < 2 && newTable[row][column + 1][0] !== null) {
    const sum = card.ranks[2] + newTable[row][column + 1][0].ranks[1];
    plusCards[sum] ? plusCards[sum].push([row, column + 1])
      : plusCards[sum] = [[row, column + 1]];
  }

  // eslint-disable-next-line no-unused-vars
  Object.entries(plusCards).forEach(([key, value]) => {
    if (value.length > 1 && value.some(v => newTable[v[0]][v[1]][1] !== false)) {
      value.forEach(crd => {
        if (newTable[crd[0]][crd[1]][1] !== false) {
          newTable[crd[0]][crd[1]][1] = false;
          cards = fakeRemoveCard(cards, crd[0], crd[1]);
          cards = fakeAddCard(cards, card.id, row, column);
          cards = fakeCheckCombo(crd);
        }
      });
    }
  });

  if (row > 0 && !!newTable[row - 1][column][0]) fakeCardCombat(row - 1, column, 0, 3);
  if (row < 2 && !!newTable[row + 1][column][0]) fakeCardCombat(row + 1, column, 3, 0);
  if (column > 0 && !!newTable[row][column - 1][0]) fakeCardCombat(row, column - 1, 1, 2);
  if (column < 2 && !!newTable[row][column + 1][0]) fakeCardCombat(row, column + 1, 2, 1);

  return ([cards.play2Cards.length - cards.play1Cards.length, card, row, column]);
};

const checkTurningCard = (props, card, type) => {
  const { table, cards } = props;
  const thisCard = Cards.find(c => c.id === card.id);
  const diference = cards.play2Cards.length - cards.play1Cards.length;
  const result = [];

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (!table[i][j][0]) {
        let move = [];
        if (type === 'turn') move = nCardsTurned(props, thisCard, i, j);
        if (type === 'same') move = fakeCheckSame(props, thisCard, i, j);
        if (type === 'plus') move = fakeCheckPlus(props, thisCard, i, j);
        if (move[0] > diference) result.push(move);
      }
    }
  }
  return result;
};

const PCMovement = props => {
  const { table, cards, rules } = props;
  const result = [];

  if (cardsOnTheTable(table) === 0) {
    if (rules.open) {
      cards.play2Cards.forEach(card => {
        const move = safeMovement(props, card);
        if (move) result.push(move);
      });
    }

    if (result.length === 0) return randomMove(cards, table);
    // console.log('Safe', result);
    return result[0];
  }

  cards.play2Cards.forEach(card => {
    if (card.dragable) {
      if (rules.same) {
        const move = checkTurningCard(props, card, 'same');
        if (move) result.push(...move);
      }

      if (rules.plus) {
        const move = checkTurningCard(props, card, 'plus');
        if (move) result.push(...move);
      }

      if (!rules.same && !rules.plus) {
        const move = checkTurningCard(props, card, 'turn');
        if (move) result.push(...move);
      }
    }
  });

  if (result.length === 0) {
    if (rules.open) {
      cards.play2Cards.forEach(card => {
        if (card.dragable) {
          const move = safeMovement(props, card);
          if (move) result.push(move);
        }
      });
    }
    if (result.length === 0) return randomMove(cards, table);
    // console.log('Safe 2', result);
    return result[0];
  }

  // console.log('PC move', result);
  if (result.length === 1) return { card: result[0][1], row: result[0][2], column: result[0][3] };

  const filterResult = result.sort((a, b) => a[0] < b[0]).filter(move => move[0] === result[0][0]);
  const finalResult = filterResult[getRandomNumber(0, filterResult.length)];

  return ({ card: finalResult[1], row: finalResult[2], column: finalResult[3] });
};

export default PCMovement;
