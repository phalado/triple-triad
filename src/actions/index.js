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

const resetCards = () => ({
  type: 'RESET_CARDS',
});

const modifyTable = table => ({
  type: 'MODIFY_TABLE',
  table,
});

const resetTable = () => ({
  type: 'RESET_TABLE',
});

const changeRules = rules => ({
  type: 'CHANGE_RULES',
  rules,
});

const changeDeck = data => ({
  type: 'CHANGE_DECK',
  data,
});

export {
  createCard, removeCard, modifyTable, resetCards, resetTable, changeRules, changeDeck,
};
