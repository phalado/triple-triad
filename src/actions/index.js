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
  row: card.row,
  column: card.column,
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
  type: 'CHANGE_DECKS',
  data,
});

const startDeck = () => ({
  type: 'START_DECKS',
});

const addCardToExploreDeck = card => ({
  type: 'ADD_CARD_EXPLORE',
  card,
});

const removeCardFromExploreDeck = card => ({
  type: 'REMOVE_CARD_EXPLORE',
  card,
});

const resetPlayerDeckExplore = () => ({
  type: 'RESET_CARD_EXPLORE',
});

const changeStreak = streak => ({
  type: 'CHANGE_STREAK',
  streak,
});

const addCardToNPC = data => ({
  type: 'ADD_CARD_NPC',
  data,
});

const removeCardFromNPC = data => ({
  type: 'REMOVE_CARD_NPC',
  data,
});

const changeNPCStreak = data => ({
  type: 'CHANGE_NPC_STREAK',
  data,
});

const createNPCList = () => ({
  type: 'CREATE_NPC_LIST',
});

const changeCardQueenLocation = location => ({
  type: 'CHANGE_CARD_QUEEN_LOCATION',
  location,
});

export {
  createCard, removeCard, modifyTable, resetCards, resetTable, changeRules, changeDeck, startDeck,
  addCardToExploreDeck, removeCardFromExploreDeck, changeStreak, addCardToNPC, removeCardFromNPC,
  changeNPCStreak, resetPlayerDeckExplore, createNPCList, changeCardQueenLocation,
};
