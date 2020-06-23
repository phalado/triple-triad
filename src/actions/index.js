const changeTurn = value => ({
  type: 'CHANGE_TURN',
  turn: value,
});

const createTurn = value => ({
  type: 'CREATE_TURN',
  turn: value,
});

const createCard = card => ({
  type: 'CREATE_CARD',
  player: card.player,
  id: card.id,
  row: card.row,
  column: card.column,
  dragable: card.dragable,
});

const removeCard = card => ({
  type: 'REMOVE_CARD',
  player: card.player,
  id: card.id,
});

const modifyTable = table => ({
  type: 'MODIFY_TABLE',
  table,
});

export {
  changeTurn, createTurn, createCard, removeCard, modifyTable,
};
