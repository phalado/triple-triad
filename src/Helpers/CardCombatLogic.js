import Rules from '../constants/Rules';

const checkSamePlus = (props, row, column) => {
  const {
    card, table, element, player, handleAddCard, handleRemoveCard, handleChangeTable,
  } = props;

  if (Rules.same) {
    const sameCards = [];

    if (row > 0 && table[row - 1][column][0] !== null) {
      if (card.ranks[0] === table[row - 1][column][0].ranks[2]) sameCards.push([row - 1, column]);
    }

    if (row < 2 && table[row + 1][column][0] !== null) {
      if (card.ranks[2] === table[row + 1][column][0].ranks[0]) sameCards.push([row + 1, column]);
    }

    if (column > 0 && table[row][column - 1][0] !== null) {
      if (card.ranks[1] === table[row][column - 1][0].ranks[3]) sameCards.push([row, column - 1]);
    }

    if (column < 2 && table[row][column + 1][0] !== null) {
      if (card.ranks[3] === table[row][column + 1][0].ranks[1]) sameCards.push([row, column + 1]);
    }

    console.log(sameCards);
  }
};

const getRank = (rank, cardElement, element) => {
  if (Rules.elemental) {
    if (element !== null) {
      return element === cardElement ? rank + 1 : rank - 1;
    }
    return rank;
  }
  return rank;
};

const CardCombat = (props, newRow, newColumn, rank1, rank2) => {
  const {
    card, table, element, player, handleAddCard, handleRemoveCard, handleChangeTable,
  } = props;

  if (table[newRow][newColumn][1] === player) return;

  const otherCard = table[newRow][newColumn][0];
  const atk = getRank(card.ranks[rank1], card.element, element);
  const def = getRank(otherCard.ranks[rank2], otherCard.element, table[newRow][newColumn][2]);
  if (def >= atk) return;

  table[newRow][newColumn][1] = player;
  handleChangeTable(table);
  handleRemoveCard({
    player: !player, id: otherCard.id, row: newRow, column: newColumn,
  });
  handleAddCard({
    player, id: otherCard.id, row: newRow, column: newColumn, dragable: false,
  });
};

export { CardCombat, checkSamePlus };
