/* eslint-disable no-unused-expressions */
import { cardsOnTheTable } from './OtherHelpers';
import { turnCardPlay, specialSoundPlay } from '../constants/Sounds';

const turnCard = props => {
  const {
    table, player, id, row, column, handleAddCard, handleRemoveCard, handleChangeTable,
  } = props;
  handleChangeTable(table);
  handleRemoveCard({
    player: !player, id, row, column,
  });
  handleAddCard({
    player, id, row, column, dragable: false,
  });
};

const getRank = (rank, cardElement, rules, element) => {
  if (rules.elemental) {
    if (element !== null) return element === cardElement ? rank + 1 : rank - 1;
    return rank;
  }
  return rank;
};

const cardCombat = (props, newRow, newColumn, rank1, rank2, showModalWindow = null) => {
  const {
    card, table, element, player, rules, handleAddCard, handleRemoveCard, handleChangeTable,
  } = props;

  if (table[newRow][newColumn][1] === player) return;

  const otherCard = table[newRow][newColumn][0];
  const at = getRank(card.ranks[rank1], card.element, rules, element);
  const df = getRank(otherCard.ranks[rank2], otherCard.element, rules, table[newRow][newColumn][2]);
  if (df >= at) return;

  table[newRow][newColumn][1] = player;
  turnCard({
    table,
    player,
    id: otherCard.id,
    row: newRow,
    column: newColumn,
    handleAddCard,
    handleRemoveCard,
    handleChangeTable,
  });
  turnCardPlay();
  if (showModalWindow) {
    showModalWindow('combo');
    specialSoundPlay();
    if (cardsOnTheTable(table) === 9) setTimeout(() => showModalWindow(), 1100);
  }
};

const checkCombo = (props, crd, showModalWindow) => {
  const { table } = props;
  const row = crd[0];
  const column = crd[1];

  if (row > 0 && !!table[row - 1][column][0]) {
    cardCombat({ ...props, card: table[row][column][0] }, row - 1, column, 0, 3, showModalWindow);
  }
  if (row < 2 && !!table[row + 1][column][0]) {
    cardCombat({ ...props, card: table[row][column][0] }, row + 1, column, 3, 0, showModalWindow);
  }
  if (column > 0 && !!table[row][column - 1][0]) {
    cardCombat({ ...props, card: table[row][column][0] }, row, column - 1, 1, 2, showModalWindow);
  }
  if (column < 2 && !!table[row][column + 1][0]) {
    cardCombat({ ...props, card: table[row][column][0] }, row, column + 1, 2, 1, showModalWindow);
  }
};

const checkSame = (props, row, column, showModalWindow) => {
  const {
    card, table, player, rules, handleAddCard, handleRemoveCard, handleChangeTable,
  } = props;

  if (rules.same) {
    const sameCards = [];

    if (row > 0 && table[row - 1][column][0] !== null) {
      if (card.ranks[0] === table[row - 1][column][0].ranks[3]) sameCards.push([row - 1, column]);
    }

    if (row < 2 && table[row + 1][column][0] !== null) {
      if (card.ranks[3] === table[row + 1][column][0].ranks[0]) sameCards.push([row + 1, column]);
    }

    if (column > 0 && table[row][column - 1][0] !== null) {
      if (card.ranks[1] === table[row][column - 1][0].ranks[2]) sameCards.push([row, column - 1]);
    }

    if (column < 2 && table[row][column + 1][0] !== null) {
      if (card.ranks[2] === table[row][column + 1][0].ranks[1]) sameCards.push([row, column + 1]);
    }

    if (sameCards.every(card => table[card[0]][card[1]][1] === player)) return;
    if (sameCards.length < 2) {
      if (!rules.sameWall) return;
      if ((row !== 0 || card.ranks[0] !== 10) && (row !== 2 || card.ranks[3] !== 10)
        && (column !== 0 || card.ranks[1] !== 10) && (column !== 0 || card.ranks[2] !== 10)) return;
    }

    const crds = sameCards.filter(card => table[card[0]][card[1]][1] !== player);

    crds.forEach(crd => {
      table[crd[0]][crd[1]][1] = player;
      turnCard({
        table,
        player,
        id: table[crd[0]][crd[1]][0].id,
        row: crd[0],
        column: crd[1],
        handleAddCard,
        handleRemoveCard,
        handleChangeTable,
      });
      showModalWindow('same');
      specialSoundPlay();
      setTimeout(() => checkCombo(props, crd, showModalWindow), 1500);
    });
  }
};

const checkPlus = (props, row, column, showModalWindow) => {
  const {
    card, table, player, rules, handleAddCard, handleRemoveCard, handleChangeTable,
  } = props;

  if (rules.plus) {
    const plusCards = {};

    if (row > 0 && table[row - 1][column][0] !== null) {
      const sum = card.ranks[0] + table[row - 1][column][0].ranks[3];
      plusCards[sum] ? plusCards[sum].push([row - 1, column])
        : plusCards[sum] = [[row - 1, column]];
    }

    if (row < 2 && table[row + 1][column][0] !== null) {
      const sum = card.ranks[3] + table[row + 1][column][0].ranks[0];
      plusCards[sum] ? plusCards[sum].push([row + 1, column])
        : plusCards[sum] = [[row + 1, column]];
    }

    if (column > 0 && table[row][column - 1][0] !== null) {
      const sum = card.ranks[1] + table[row][column - 1][0].ranks[2];
      plusCards[sum] ? plusCards[sum].push([row, column - 1])
        : plusCards[sum] = [[row, column - 1]];
    }

    if (column < 2 && table[row][column + 1][0] !== null) {
      const sum = card.ranks[2] + table[row][column + 1][0].ranks[1];
      plusCards[sum] ? plusCards[sum].push([row, column + 1])
        : plusCards[sum] = [[row, column + 1]];
    }

    Object.values(plusCards).forEach(value => {
      if (value.length > 1 && value.some(v => table[v[0]][v[1]][1] !== player)) {
        value.forEach(crd => {
          if (table[crd[0]][crd[1]][1] !== player) {
            table[crd[0]][crd[1]][1] = player;
            turnCard({
              table,
              player,
              id: table[crd[0]][crd[1]][0].id,
              row: crd[0],
              column: crd[1],
              handleAddCard,
              handleRemoveCard,
              handleChangeTable,
            });
            showModalWindow('plusSp');
            specialSoundPlay();
            setTimeout(() => {
              checkCombo(props, crd, showModalWindow);
            }, 1500);
          }
        });
      }
    });
  }
};

export {
  cardCombat, checkSame, checkPlus, getRank,
};
