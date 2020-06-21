const repositiongCard = props => {
  const {
    play1Cards, play2Cards, card, player, row, column, table,
  } = props;

  if (player) {
    const removableCard = play1Cards.find(c => c.id === card.id);
    return {
      card,
      table,
      row,
      column,
      player,
      play1Cards: [
        ...play1Cards.filter(c => c !== removableCard),
        {
          id: card.id,
          row,
          column,
        },
      ],
      play2Cards,
    };
  }

  const removableCard = play2Cards.find(c => c.id === card.id);
  return {
    card,
    table,
    row,
    column,
    player,
    play1Cards,
    play2Cards: [
      ...play2Cards.filter(c => c !== removableCard),
      {
        id: card.id,
        row,
        column,
      },
    ],
  };
};

const Combat = (props, newRow, newColumn, rank1, rank2) => {
  const {
    card, table, row, column, player, play1Cards, play2Cards,
  } = props;

  if (table[newRow][newColumn][1] === player) return props;

  const otherCard = table[newRow][newColumn][0];
  if (otherCard.ranks[rank2] >= card.ranks[rank1]) return props;

  table[newRow][newColumn][1] = player;

  if (player) {
    return {
      card,
      table,
      row,
      column,
      player,
      play1Cards: [
        ...play1Cards,
        {
          id: otherCard.id,
          row: newRow,
          column: newColumn,
        },
      ],
      play2Cards: play2Cards.filter(c => (c.row !== newRow || c.column !== newColumn)),
    };
  }
  return ({
    card,
    table,
    row,
    column,
    player,
    play1Cards: play1Cards.filter(c => (c.row !== newRow || c.column !== newColumn)),
    play2Cards: [
      ...play2Cards,
      {
        id: otherCard.id,
        row: newRow,
        column: newColumn,
      },
    ],
  });
};

const CardCombat = props => {
  const { table, row, column } = props;
  let newProps = props;

  newProps = repositiongCard(newProps);
  if (row > 0 && !!table[row - 1][column]) newProps = Combat(newProps, row - 1, column, 0, 2);
  if (row < 2 && !!table[row + 1][column]) newProps = Combat(newProps, row + 1, column, 2, 0);
  if (column > 0 && !!table[row][column - 1]) newProps = Combat(newProps, row, column - 1, 1, 3);
  if (column < 2 && !!table[row][column + 1]) newProps = Combat(newProps, row, column + 1, 3, 1);

  return {
    play1Cards: newProps.play1Cards,
    play2Cards: newProps.play2Cards,
    table: newProps.table,
  };
};

export default CardCombat;
