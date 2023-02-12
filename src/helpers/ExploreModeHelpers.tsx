import { getRandomBoolean, getRandomNumber } from "./OtherHelpers";
import { NpcsInterface } from "../interfaces/NpcsInterface";
import Cards from "../constants/Cards";
import CardObjectInterface from "../interfaces/CardObjectInterface";

// MELHORAR
const getCardsFromPlayerDeck = (playerCards: { [card: string]: number }) => {
  const deck: CardObjectInterface[] = [];
  Object.entries(playerCards).forEach(([key, value]) => {
    for (let i = 0; i < value; i += 1) {
      deck.push(Cards.find(card => card.id === parseInt(key, 10)) as CardObjectInterface);
    }
  });
  return deck;
};

// MELHORAR
const getNPCsCards = (cards: number[], special: number[]) => {
  const deck: number[] = [];
  while (deck.length < 5) {
    if (special.length > 0) {
      special.forEach(cardID => {
        if (getRandomBoolean() && !deck.includes(cardID)) deck.push(cardID);
      });
    }

    const cardLevel = cards[getRandomNumber(0, cards.length)];
    const randomCard = getRandomNumber(1, 12);
    const card = randomCard + (11 * (cardLevel - 1));
    if (card !== 48) deck.push(card);
  }

  return deck;
};

// MELHORAR
const getTableData = (npcs: NpcsInterface, place: string) => {
  const tableData = [];

  // if (npcs.cardQueen.place === place) {
  //   tableData.push([
  //     npcs.cardQueen.name,
  //     npcs.cardQueen.win,
  //     npcs.cardQueen.loose,
  //     npcs.cardQueen.tie,
  //     { cards: npcs.cardQueen[place], special: [] },
  //     'Card Queen',
  //   ]);
  // }

  if (place === 'balambGarden') {
    const victories = Object.values(npcs[place]).filter(value => value.win > 0).length;
    if (victories >= 9) {
      tableData.push([
        npcs.cardClub.jack.name,
        npcs.cardClub.jack.win,
        npcs.cardClub.jack.loose,
        npcs.cardClub.jack.tie,
        { cards: npcs.cardClub.jack.cards, special: npcs.cardClub.jack.special },
        'jack',
      ]);

      if (npcs.cardClub.jack.win > 0) {
        tableData.push([
          npcs.cardClub.joker.name,
          npcs.cardClub.joker.win,
          npcs.cardClub.joker.loose,
          npcs.cardClub.joker.tie,
          { cards: npcs.cardClub.joker.cards, special: npcs.cardClub.joker.special },
          'joker',
        ]);

        if (npcs.cardClub.joker.win > 0) {
          tableData.push([
            npcs.cardClub.club.name,
            npcs.cardClub.club.win,
            npcs.cardClub.club.loose,
            npcs.cardClub.club.tie,
            { cards: npcs.cardClub.club.cards, special: npcs.cardClub.club.special },
            'club',
          ]);

          if (npcs.cardClub.club.win > 0) {
            tableData.push([
              npcs.cardClub.diamond.name,
              npcs.cardClub.diamond.win,
              npcs.cardClub.diamond.loose,
              npcs.cardClub.diamond.tie,
              { cards: npcs.cardClub.diamond.cards, special: npcs.cardClub.diamond.special },
              'diamond',
            ]);

            if (npcs.cardClub.diamond.win > 0) {
              tableData.push([
                npcs.cardClub.spade.name,
                npcs.cardClub.spade.win,
                npcs.cardClub.spade.loose,
                npcs.cardClub.spade.tie,
                { cards: npcs.cardClub.spade.cards, special: npcs.cardClub.spade.special },
                'spade',
              ]);

              if (npcs.cardClub.spade.win > 0) {
                tableData.push([
                  npcs.cardClub.heart.name,
                  npcs.cardClub.heart.win,
                  npcs.cardClub.heart.loose,
                  npcs.cardClub.heart.tie,
                  { cards: npcs.cardClub.heart.cards, special: npcs.cardClub.heart.special },
                  'heart',
                ]);

                if (npcs.cardClub.heart.win > 0 && npcs.balambGarden.kadowaki.win > 0) {
                  tableData.push([
                    npcs.cardClub.king.name,
                    npcs.cardClub.king.win,
                    npcs.cardClub.king.loose,
                    npcs.cardClub.king.tie,
                    { cards: npcs.cardClub.king.cards, special: npcs.cardClub.king.special },
                    'king',
                  ]);
                }
              }
            }
          }
        }
      }
    }
  }

  Object.entries(npcs[place]).forEach(([key, value]) => {
    const {
      name, win, loose, tie, cards, special,
    } = value;
    tableData.push([name, win, loose, tie, { cards, special }, key]);
  });

  tableData.sort((a: any, b: any) => a[0] - b[0]);

  return tableData;
};

// MELHORAR
const getRandonPlayerCards = (playerCards: { [card: string]: number }) => {
  const cards: number[] = [];
  Object.keys(playerCards).forEach(key => {
    if (playerCards[key] > 0) {
      for (let i = 0; i < playerCards[key]; i += 1) cards.push(parseInt(key, 10));
    }
  });

  const playerDeck = [];
  for (let i = 0; i < 5; i += 1) {
    const randonNumber = getRandomNumber(0, cards.length + 1);
    playerDeck.push(cards[randonNumber]);
    cards.splice(randonNumber, 1);
  }
  return playerDeck;
};

export {
  getCardsFromPlayerDeck,
  getTableData,
  getRandonPlayerCards,
  getNPCsCards
}
