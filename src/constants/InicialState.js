export default {
  cards: {
    play1Cards: [],
    play2Cards: [],
  },
  table: [
    [[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]],
  ],
  rules: {
    open: true,
    plus: false,
    same: false,
    elemental: false,
    sameWall: false,
    sudenDeath: false,
    random: false,
  },
  decks: {
    player: {
      deck1: Array(5).fill(6),
      deck2: Array(5).fill(7),
      deck3: Array(5).fill(8),
      deck4: Array(5).fill(9),
      deck5: Array(5).fill(10),
    },
    custom: {
      deck1: Array(5).fill(1),
      deck2: Array(5).fill(2),
      deck3: Array(5).fill(3),
      deck4: Array(5).fill(4),
      deck5: Array(5).fill(5),
    },
  },
  playerCards: {},
  streak: {
    wins: 0,
    looses: 0,
    ties: 0,
    abandoned: 0,
  },
  npcs: {},
};
