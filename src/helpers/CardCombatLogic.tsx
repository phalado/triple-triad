import CardObjectInterface from "../interfaces/CardObjectInterface";
import PreLoadedSoundsInterface from "../interfaces/PreLoadedSounds";
import { LocalRulesInterface } from "../interfaces/RulesInterface";
import TableInterface from "../interfaces/TableInterface";

interface NewPropsInterface {
  card: CardObjectInterface
  table: TableInterface
  element: string | null
  player: boolean
  rules: LocalRulesInterface
  placeCard: (
    player: boolean,
    card: CardObjectInterface,
    oldRow: number,
    oldColumn: number,
    row: number,
    column: number,
    turn?: boolean
  ) => void
  preLoadedSounds: PreLoadedSoundsInterface
  existCard: (row: number, column: number) => boolean
  cardsOnTheTable: () => number
}

const getRank = (rank: number, cardElement: string, rules: LocalRulesInterface, element: string | null) => {
  if (!rules.elemental || element === null || element === 'neutral') return rank

  return element === cardElement ? rank + 1 : rank - 1;
};

const cardCombat = (
  props: NewPropsInterface,
  newRow: number,
  newColumn: number,
  rank1: number,
  rank2: number,
  showModalWindow: ((value?: string) => void) | null = null
) => {
  const {
    card,
    table,
    element,
    player,
    rules,
    placeCard,
    preLoadedSounds,
    cardsOnTheTable
  } = props;
  const { cardSound, specialSound } = preLoadedSounds

  if (table[newRow][newColumn].player === player) return;

  const otherCard = table[newRow][newColumn].card;
  const at = getRank(card.ranks[rank1], card.element, rules, element);
  const df = getRank(
    otherCard.ranks[rank2],
    otherCard.element,
    rules,
    table[newRow][newColumn].element as string
  );

  if (df >= at) return;

  cardSound.playAsync();
  placeCard(player, otherCard, newRow, newColumn, newRow, newColumn, true)

  if (showModalWindow) {
    showModalWindow('combo');
    specialSound.playAsync();
    if (cardsOnTheTable() === 9) setTimeout(() => showModalWindow(), 1100);
  }
};

const checkCombo = (
  props: NewPropsInterface, crd: number[], showModalWindow: ((value?: string) => void) | null
) => {
  const { table, existCard } = props;
  const row = crd[0];
  const column = crd[1];
  const card = table[row][column].card

  if (existCard(row - 1, column)) {
    cardCombat({ ...props, card }, row - 1, column, 0, 3, showModalWindow);
  }
  if (existCard(row + 1, column)) {
    cardCombat({ ...props, card }, row + 1, column, 3, 0, showModalWindow);
  }
  if (existCard(row, column - 1)) {
    cardCombat({ ...props, card }, row, column - 1, 1, 2, showModalWindow);
  }
  if (existCard(row, column + 1)) {
    cardCombat({ ...props, card }, row, column + 1, 2, 1, showModalWindow);
  }
};

const checkSame = (
  props: NewPropsInterface, row: number, column: number, showModalWindow: (value?: string) => void
) => {
  const {
    card,
    table,
    player,
    rules,
    placeCard,
    preLoadedSounds,
    existCard
  } = props;
  const { specialSound } = preLoadedSounds

  const sameCards = [];

  if (existCard(row - 1, column)) {
    if (card.ranks[0] === table[row - 1][column].card.ranks[3]) sameCards.push([row - 1, column]);
  }

  if (existCard(row + 1, column)) {
    if (card.ranks[3] === table[row + 1][column].card.ranks[0]) sameCards.push([row + 1, column]);
  }

  if (existCard(row, column - 1)) {
    if (card.ranks[1] === table[row][column - 1].card.ranks[2]) sameCards.push([row, column - 1]);
  }

  if (existCard(row, column + 1)) {
    if (card.ranks[2] === table[row][column + 1].card.ranks[1]) sameCards.push([row, column + 1]);
  }

  if (sameCards.every(card => table[card[0]][card[1]].player === player)) return;
  if (sameCards.length < 2) {
    if (!rules.sameWall) return;
    if ((row !== 0 || card.ranks[0] !== 10) && (row !== 2 || card.ranks[3] !== 10)
      && (column !== 0 || card.ranks[1] !== 10) && (column !== 0 || card.ranks[2] !== 10)) return;
  }

  const crds = sameCards.filter(card => table[card[0]][card[1]].player !== player);

  crds.forEach(crd => {
    placeCard(player, table[crd[0]][crd[1]].card, crd[0], crd[1], crd[0], crd[1], true)
    showModalWindow('same');
    specialSound.playAsync();
    setTimeout(() => checkCombo(props, crd, showModalWindow), 1500);
  });
};

const checkPlus = (
  props: NewPropsInterface, row: number, column: number, showModalWindow: (value?: string) => void
) => {
  const {
    card,
    table,
    player,
    placeCard,
    preLoadedSounds,
    existCard
  } = props;
  const { specialSound } = preLoadedSounds

  const plusCards: { [index: number]: number[][] } = [];

  if (existCard(row - 1, column)) {
    const sum = card.ranks[0] + table[row - 1][column].card.ranks[3];
    plusCards[sum] ? plusCards[sum].push([row - 1, column])
      : plusCards[sum] = [[row - 1, column]];
  }

  if (existCard(row + 1, column)) {
    const sum = card.ranks[3] + table[row + 1][column].card.ranks[0];
    plusCards[sum] ? plusCards[sum].push([row + 1, column])
      : plusCards[sum] = [[row + 1, column]];
  }

  if (existCard(row, column - 1)) {
    const sum = card.ranks[1] + table[row][column - 1].card.ranks[2];
    plusCards[sum] ? plusCards[sum].push([row, column - 1])
      : plusCards[sum] = [[row, column - 1]];
  }

  if (existCard(row, column + 1)) {
    const sum = card.ranks[2] + table[row][column + 1].card.ranks[1];
    plusCards[sum] ? plusCards[sum].push([row, column + 1])
      : plusCards[sum] = [[row, column + 1]];
  }

  Object.values(plusCards).forEach(value => {
    if (value.length > 1 && value.some(v => table[v[0]][v[1]].player !== player)) {
      value.forEach(crd => {
        if (table[crd[0]][crd[1]].player !== player) {
          placeCard(player, table[crd[0]][crd[1]].card, crd[0], crd[1], crd[0], crd[1], true)
          showModalWindow('plusSp');
          specialSound.playAsync();
          setTimeout(() => checkCombo(props, crd, showModalWindow), 1500);
        }
      });
    }
  });
};

export { cardCombat, checkSame, checkPlus, getRank };
