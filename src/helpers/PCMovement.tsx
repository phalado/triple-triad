/* eslint-disable no-unused-expressions */
import { getRandomNumber } from './OtherHelpers';
import { getRank } from './CardCombatLogic';
import Cards from '../constants/Cards';
import CardInterface from '../interfaces/CardInterface';
import TableInterface from '../interfaces/TableInterface';
import RulesInterface, { LocalRulesInterface } from '../interfaces/RulesInterface';
import PlayersCardsInterface from '../interfaces/PlayersCardsInterface';
import CardObjectInterface from '../interfaces/CardObjectInterface';

const testPosition = (
  row: number,
  column: number,
  card: CardObjectInterface,
  table: TableInterface,
  cards: PlayersCardsInterface,
  rules: LocalRulesInterface
) => (
  cards.player1Cards.every((p1Card: CardInterface) => {
    const thisCard = Cards.find(c => c.id === p1Card.id) || Cards[0];

    if (row > 0) {
      const at = getRank(thisCard.ranks[3], thisCard.element, rules, table[row - 1][column].element);
      const df = getRank(card.ranks[0], card.element, rules, table[row][column].element);
      if (at > df) return false;
    }

    if (row < 2) {
      const at = getRank(thisCard.ranks[0], thisCard.element, rules, table[row + 1][column].element);
      const df = getRank(card.ranks[3], card.element, rules, table[row][column].element);
      if (at > df) return false;
    }

    if (column > 0) {
      const at = getRank(thisCard.ranks[2], thisCard.element, rules, table[row][column - 1].element);
      const df = getRank(card.ranks[1], card.element, rules, table[row][column].element);
      if (at > df) return false;
    }

    if (column < 2) {
      const at = getRank(thisCard.ranks[1], thisCard.element, rules, table[row][column + 1].element);
      const df = getRank(card.ranks[2], card.element, rules, table[row][column].element);
      if (at > df) return false;
    }

    return true;
  })
);

const safeMovement = (
  props:
  { table: TableInterface, cards: PlayersCardsInterface, rules: LocalRulesInterface },
  card: CardInterface
) => {
  const { table, cards, rules } = props;
  const thisCard = Cards.find(c => c.id === card.id) as CardObjectInterface;

  const emptySpots = [];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (!table[i][j].card) emptySpots.push([i, j]);
    }
  }

  emptySpots.forEach(spot => {
    if (testPosition(spot[0], spot[1], thisCard, table, cards, rules)) {
      return {
        card: thisCard, oldRow: card.row, oldColumn: card.column, row: spot[0], column: spot[1],
      };
    }

    return null;
  });
};

const randomMove = (cards: PlayersCardsInterface, table: TableInterface) => {
  const dragableCards: number[][] = [];

  cards.player2Cards.forEach(card => {
    if (card.dragable) dragableCards.push([card.id as number, card.row, card.column]);
  });

  const emptySpots: number[][] = [];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (!table[i][j].card) emptySpots.push([i, j]);
    }
  }

  const spot = getRandomNumber(0, emptySpots.length);
  const index = getRandomNumber(0, dragableCards.length);
  const card = cards.player2Cards.find(c => c.id === dragableCards[index][0]) as CardInterface;

  return ({
    card: Cards.find(c => c.id === dragableCards[index][0]),
    oldRow: card.row,
    oldColumn: card.column,
    row: emptySpots[spot][0],
    column: emptySpots[spot][1],
  });
};

const fakeRemoveCard = (cards: PlayersCardsInterface, row: number, column: number) => {
  const newCards = { ...cards };
  const removable = newCards.player1Cards.find(c => c.row === row && c.column === column);
  newCards.player1Cards = newCards.player1Cards.filter(c => c !== removable);
  return newCards;
};

const fakeAddCard = (cards: PlayersCardsInterface, id: number, row: number, column: number) => {
  const newCards = { ...cards };
  newCards.player2Cards = [
    ...newCards.player2Cards, 
    {
      id, row, column, dragable: false,
    },
  ];

  return newCards;
};

const nCardsTurned = (
  props: {
    cards: PlayersCardsInterface,
    table: TableInterface,
    rules: LocalRulesInterface,
    cloneTable: (table: TableInterface) => TableInterface
  },
  card: CardObjectInterface,
  oldRow: number,
  oldColumn: number,
  row: number,
  column: number
) => {
  let { cards } = props;
  const { table, rules, cloneTable } = props;
  const newTable = cloneTable(table);
  const element = newTable[row][column].element;

  const fakeCardCombat = (newRow: number, newColumn: number, rnk1: number, rnk2: number) => {
    if (newTable[newRow][newColumn].player === false) return;

    const othCard = newTable[newRow][newColumn].card;
    const at = getRank(card.ranks[rnk1], card.element, rules, element);
    const df = getRank(
      othCard.ranks[rnk2], othCard.element, rules, newTable[newRow][newColumn].element
    );
    if (df >= at) return;

    newTable[newRow][newColumn].player = false;
    cards = fakeRemoveCard(cards, newRow, newColumn);
    cards = fakeAddCard(cards, card.id, row, column);
  };

  if (row > 0 && !!newTable[row - 1][column].card) fakeCardCombat(row - 1, column, 0, 3);
  if (row < 2 && !!newTable[row + 1][column].card) fakeCardCombat(row + 1, column, 3, 0);
  if (column > 0 && !!newTable[row][column - 1].card) fakeCardCombat(row, column - 1, 1, 2);
  if (column < 2 && !!newTable[row][column + 1].card) fakeCardCombat(row, column + 1, 2, 1);

  return ([
    cards.player2Cards.length - cards.player1Cards.length,
    card, oldRow, oldColumn, row, column,
  ]);
};

const fakeCheckSame = (
  props: {
    cards: PlayersCardsInterface,
    table: TableInterface,
    rules: LocalRulesInterface,
    cloneTable: (table: TableInterface) => TableInterface
  },
  card: CardObjectInterface,
  oldRow: number,
  oldColumn: number,
  row: number,
  column: number
) => {
  let { cards } = props;
  const { table, rules, cloneTable } = props;
  const newTable = cloneTable(table);
  const element = newTable[row][column].element;
  const sameCards = [];

  const sameCheckings = (sameCards: number[][]) => {
    if (sameCards.every(card => newTable[card[0]][card[1]].player === false)) return false;
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

  const fakeCardCombat = (newRow: number, newColumn: number, rnk1: number, rnk2: number) => {
    if (newTable[newRow][newColumn].player === false) return;

    const othCard = newTable[newRow][newColumn].card;
    const at = getRank(card.ranks[rnk1], card.element, rules, element);
    const df = getRank(
      othCard.ranks[rnk2], othCard.element, rules, newTable[newRow][newColumn].element
    );
    if (df >= at) return;

    newTable[newRow][newColumn].player = false;
    cards = fakeRemoveCard(cards, newRow, newColumn);
    cards = fakeAddCard(cards, card.id, row, column);
  };

  const fakeCheckCombo = (crd: number[]) => {
    const row = crd[0];
    const column = crd[1];

    if (row > 0 && !!newTable[row - 1][column].card) fakeCardCombat(row - 1, column, 0, 3);
    if (row < 2 && !!newTable[row + 1][column].card) fakeCardCombat(row + 1, column, 3, 0);
    if (column > 0 && !!newTable[row][column - 1].card) fakeCardCombat(row, column - 1, 1, 2);
    if (column < 2 && !!newTable[row][column + 1].card) fakeCardCombat(row, column + 1, 2, 1);

    return cards;
  };

  if (row > 0 && newTable[row - 1][column].card !== null) {
    if (card.ranks[0] === newTable[row - 1][column].card.ranks[3]) sameCards.push([row - 1, column]);
  }

  if (row < 2 && newTable[row + 1][column].card !== null) {
    if (card.ranks[3] === newTable[row + 1][column].card.ranks[0]) sameCards.push([row + 1, column]);
  }

  if (column > 0 && newTable[row][column - 1].card !== null) {
    if (card.ranks[1] === newTable[row][column - 1].card.ranks[2]) sameCards.push([row, column - 1]);
  }

  if (column < 2 && newTable[row][column + 1].card !== null) {
    if (card.ranks[2] === newTable[row][column + 1].card.ranks[1]) sameCards.push([row, column + 1]);
  }

  if (sameCheckings(sameCards)) {
    const crds = sameCards.filter(card => newTable[card[0]][card[1]].player !== false);

    crds.forEach(crd => {
      newTable[crd[0]][crd[1]].player = false;
      cards = fakeRemoveCard(cards, crd[0], crd[1]);
      cards = fakeAddCard(cards, card.id, row, column);
      cards = fakeCheckCombo(crd);
    });
  }

  if (row > 0 && !!newTable[row - 1][column].card) fakeCardCombat(row - 1, column, 0, 3);
  if (row < 2 && !!newTable[row + 1][column].card) fakeCardCombat(row + 1, column, 3, 0);
  if (column > 0 && !!newTable[row][column - 1].card) fakeCardCombat(row, column - 1, 1, 2);
  if (column < 2 && !!newTable[row][column + 1].card) fakeCardCombat(row, column + 1, 2, 1);

  return ([
    cards.player2Cards.length - cards.player1Cards.length,
    card, oldRow, oldColumn, row, column,
  ]);
};

const fakeCheckPlus = (
  props: {
    cards: PlayersCardsInterface,
    table: TableInterface,
    rules: LocalRulesInterface,
    cloneTable: (table: TableInterface) => TableInterface
  },
  card: CardObjectInterface,
  oldRow: number,
  oldColumn: number,
  row: number,
  column: number
) => {
  let { cards } = props;
  const { table, rules, cloneTable } = props;
  const newTable = cloneTable(table);
  const element = newTable[row][column].element;
  const plusCards: { [index: number]: number[][] } = {};

  const fakeCardCombat = (newRow: number, newColumn: number, rnk1: number, rnk2: number) => {
    if (newTable[newRow][newColumn].player === false) return;

    const othCard = newTable[newRow][newColumn].card;
    const at = getRank(card.ranks[rnk1], card.element, rules, element);
    const df = getRank(
      othCard.ranks[rnk2], othCard.element, rules, newTable[newRow][newColumn].element
    );
    if (df >= at) return;

    newTable[newRow][newColumn].player = false;
    cards = fakeRemoveCard(cards, newRow, newColumn);
    cards = fakeAddCard(cards, card.id, row, column);
  };

  const fakeCheckCombo = (crd: number[]) => {
    const row = crd[0];
    const column = crd[1];

    if (row > 0 && !!newTable[row - 1][column].card) fakeCardCombat(row - 1, column, 0, 3);
    if (row < 2 && !!newTable[row + 1][column].card) fakeCardCombat(row + 1, column, 3, 0);
    if (column > 0 && !!newTable[row][column - 1].card) fakeCardCombat(row, column - 1, 1, 2);
    if (column < 2 && !!newTable[row][column + 1].card) fakeCardCombat(row, column + 1, 2, 1);

    return cards;
  };

  if (row > 0 && newTable[row - 1][column].card !== null) {
    const sum = card.ranks[0] + newTable[row - 1][column].card.ranks[3];
    plusCards[sum] ? plusCards[sum].push([row - 1, column])
      : plusCards[sum] = [[row - 1, column]];
  }

  if (row < 2 && newTable[row + 1][column].card !== null) {
    const sum = card.ranks[3] + newTable[row + 1][column].card.ranks[0];
    plusCards[sum] ? plusCards[sum].push([row + 1, column])
      : plusCards[sum] = [[row + 1, column]];
  }

  if (column > 0 && newTable[row][column - 1].card !== null) {
    const sum = card.ranks[1] + newTable[row][column - 1].card.ranks[2];
    plusCards[sum] ? plusCards[sum].push([row, column - 1])
      : plusCards[sum] = [[row, column - 1]];
  }

  if (column < 2 && newTable[row][column + 1].card !== null) {
    const sum = card.ranks[2] + newTable[row][column + 1].card.ranks[1];
    plusCards[sum] ? plusCards[sum].push([row, column + 1])
      : plusCards[sum] = [[row, column + 1]];
  }

  // eslint-disable-next-line no-unused-vars
  Object.entries(plusCards).forEach(([_, value]) => {
    if (value.length > 1 && value.some((v: number[]) => newTable[v[0]][v[1]].player !== false)) {
      value.forEach((crd: number[]) => {
        if (newTable[crd[0]][crd[1]].player !== false) {
          newTable[crd[0]][crd[1]].player = false;
          cards = fakeRemoveCard(cards, crd[0], crd[1]);
          cards = fakeAddCard(cards, card.id, row, column);
          cards = fakeCheckCombo(crd);
        }
      });
    }
  });

  if (row > 0 && !!newTable[row - 1][column].card) fakeCardCombat(row - 1, column, 0, 3);
  if (row < 2 && !!newTable[row + 1][column].card) fakeCardCombat(row + 1, column, 3, 0);
  if (column > 0 && !!newTable[row][column - 1].card) fakeCardCombat(row, column - 1, 1, 2);
  if (column < 2 && !!newTable[row][column + 1].card) fakeCardCombat(row, column + 1, 2, 1);

  return ([
    cards.player2Cards.length - cards.player1Cards.length,
    card, oldRow, oldColumn, row, column,
  ]);
};

const checkTurningCard = (
  props: {
    cards: PlayersCardsInterface,
    table: TableInterface,
    rules: LocalRulesInterface,
    cloneTable: (table: TableInterface) => TableInterface
  },
  card: CardInterface,
  type: string
) => {
  const { table, cards } = props;
  const thisCard = Cards.find(c => c.id === card.id) as CardObjectInterface;
  const diference = cards.player2Cards.length - cards.player1Cards.length;
  const result = [];

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (!table[i][j].card) {
        let move: (number | CardObjectInterface)[] = [];
        if (type === 'turn') move = nCardsTurned(props, thisCard, card.row, card.column, i, j);
        if (type === 'same') move = fakeCheckSame(props, thisCard, card.row, card.column, i, j);
        if (type === 'plus') move = fakeCheckPlus(props, thisCard, card.row, card.column, i, j);
        if (move[0] > diference) result.push(move);
      }
    }
  }
  return result;
};

const PCMovement = (props: {
  cards: PlayersCardsInterface,
  rules: LocalRulesInterface,
  table: TableInterface,
  cloneTable: (table: TableInterface) => TableInterface,
  cardsOnTheTable: () => number
}) => {
  const { cards, rules, table, cloneTable, cardsOnTheTable } = props;
  const newProps = { cards, table, rules, cloneTable }

  const result: any = [];

  if (cardsOnTheTable() === 0) {
    if (rules.open) {
      cards.player2Cards.forEach(card => {
        const move: any = safeMovement(newProps, card);
        if (move) result.push(move);
      });
    }

    if (result.length === 0) return randomMove(cards, table);
    return result[0];
  }

  cards.player2Cards.forEach(card => {
    if (card.dragable) {
      if (rules.same) {
        const move: any = checkTurningCard(newProps, card, 'same');
        if (move) result.push(...move);
      }

      if (rules.plus) {
        const move: any = checkTurningCard(newProps, card, 'plus');
        if (move) result.push(...move);
      }

      if (!rules.same && !rules.plus) {
        const move: any = checkTurningCard(newProps, card, 'turn');
        if (move) result.push(...move);
      }
    }
  });

  if (result.length === 0) {
    if (rules.open) {
      cards.player2Cards.forEach(card => {
        if (card.dragable) {
          const move: any = safeMovement(newProps, card);
          if (move) result.push(move);
        }
      });
    }
    if (result.length === 0) return randomMove(cards, table);
    return result[0];
  }

  if (result.length === 1) {
    return {
      card: result[0][1],
      oldRow: result[0][2],
      oldColumn: result[0][3],
      row: result[0][4],
      column: result[0][5],
    };
  }

  const filterResult = result.sort((a: any[], b: any[]) => a[0] - b[0])
    .filter((move: any) => move[0] === result[0][0]);
  const finalResult = filterResult[getRandomNumber(0, filterResult.length)];

  return ({
    card: finalResult[1],
    oldRow: finalResult[2],
    oldColumn: finalResult[3],
    row: finalResult[4],
    column: finalResult[5],
  });
};

export default PCMovement;
