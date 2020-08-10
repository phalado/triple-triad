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

const changeRules = data => ({
  type: 'CHANGE_RULES',
  data,
});

const restartRules = () => ({
  type: 'RESTART_RULES',
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

const addCardToNPC = data => {
  const cc = ['jack', 'joker', 'club', 'diamond', 'spade', 'heart', 'king'];
  if (cc.includes(data.npc)) {
    return ({
      type: 'ADD_CARD_NPC',
      data: { ...data, location: 'cardClub' },
    });
  }
  return ({
    type: 'ADD_CARD_NPC',
    data,
  });
};

const removeCardFromNPC = data => {
  const cc = ['jack', 'joker', 'club', 'diamond', 'spade', 'heart', 'king'];
  if (cc.includes(data.npc)) {
    return ({
      type: 'REMOVE_CARD_NPC',
      data: { ...data, location: 'cardClub' },
    });
  }
  return ({
    type: 'REMOVE_CARD_NPC',
    data,
  });
};

const changeNPCStreak = data => {
  const cc = ['jack', 'joker', 'club', 'diamond', 'spade', 'heart', 'king'];
  if (cc.includes(data.npc)) {
    return ({
      type: 'CHANGE_NPC_STREAK',
      data: { ...data, location: 'cardClub' },
    });
  }
  return ({
    type: 'CHANGE_NPC_STREAK',
    data,
  });
};

const createNPCList = () => ({
  type: 'CREATE_NPC_LIST',
});

const changeCardQueenLocation = location => ({
  type: 'CHANGE_CARD_QUEEN_LOCATION',
  location,
});

const changeEvent = event => ({
  type: 'CHANGE_EVENT',
  event,
});

const restartEvents = () => ({
  type: 'RESTART_EVENTS',
});

export {
  createCard, removeCard, modifyTable, resetCards, resetTable, changeRules, restartRules,
  changeDeck, startDeck, addCardToExploreDeck, removeCardFromExploreDeck, changeStreak,
  addCardToNPC, removeCardFromNPC, changeNPCStreak, resetPlayerDeckExplore, createNPCList,
  changeCardQueenLocation, changeEvent, restartEvents,
};
