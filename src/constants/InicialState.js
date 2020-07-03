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
      deck4: [1, 2, 3, 5, 6],
      deck5: Array(5).fill(null),
    },
  },
};