import { getRandomBoolean, getRandomNumber } from "./OtherHelpers";
import { NpcsInterface } from "../interfaces/NpcsInterface";
import Cards from "../constants/Cards";
import CardObjectInterface from "../interfaces/CardObjectInterface";
import { Alert } from "react-native";
import CardQueenInterface from "../interfaces/CardQueenInterface";

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
const getTableData = (npcs: NpcsInterface, place: string, cardQueen: CardQueenInterface) => {
  const tableData = [];

  if (cardQueen.place === place) {
    tableData.push([
      cardQueen.name,
      cardQueen.win,
      cardQueen.loose,
      cardQueen.tie,
      { cards: cardQueen[place], special: [] },
      'Card Queen',
    ]);
  }

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
    const { name, win, loose, tie, cards, special } = value;
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

const cardClubEvents = (
  events: { [event: string]: boolean },
  changeEvent: (event: string) => void,
  npc: string,
  npcs: NpcsInterface,
  addCardToNPC: (data: { npc: string, card: number, location: string }) => void,
  texts: { [key: string]: string | string[] }
) => {
  const vics = Object.values(npcs.balambGarden).filter(value => value.win > 0).length;
  if (vics >= 9 && events.jack) {
    Alert.alert(
      texts.ccJack as string, texts.ccJackOpen as string, [{
        text: texts.whatever as string,
        onPress: () => null,
        style: 'cancel',
      }],
    );
    changeEvent('jack');
  }

  if (npc === 'jack' && events.joker) {
    Alert.alert(
      texts.ccJack as string, texts.ccJackClose as string, [{
        text: texts.whatever as string,
        onPress: () => {
          Alert.alert(
            texts.ccJoker as string, texts.ccJokerOpen as string, [{
              text: texts.whatever as string,
              onPress: () => null,
              style: 'cancel',
            }],
          );
          changeEvent('joker');
        },
        style: 'cancel',
      }],
    );
  }

  if (npc === 'joker' && events.club) {
    Alert.alert(
      texts.ccJoker as string, texts.ccJokerClose as string, [{
        text: texts.whatever as string,
        onPress: () => {
          Alert.alert(
            texts.ccClub as string, texts.ccClubOpen as string, [{
              text: texts.whatever as string,
              onPress: () => null,
              style: 'cancel',
            }],
          );
          changeEvent('club');
        },
        style: 'cancel',
      }],
    );
  }

  if (npc === 'club' && events.diamond) {
    Alert.alert(
      texts.ccClub as string, texts.ccClubClose as string, [{
        text: texts.whatever as string,
        onPress: () => {
          Alert.alert(
            texts.ccDiamond as string, texts.ccDiamondOpen as string, [{
              text: texts.whatever as string,
              onPress: () => null,
              style: 'cancel',
            }],
          );
          changeEvent('diamond');
        },
        style: 'cancel',
      }],
    );
  }

  if (npc === 'diamond' && events.spade) {
    Alert.alert(
      texts.ccDiamond as string, texts.ccDiamondClose as string, [{
        text: texts.whatever as string,
        onPress: () => {
          Alert.alert(
            texts.ccSpade as string, texts.ccSpadeOpen as string, [{
              text: texts.whatever as string,
              onPress: () => null,
              style: 'cancel',
            }],
          );
          changeEvent('spade');
        },
        style: 'cancel',
      }],
    );
  }

  if (npc === 'spade' && events.heart) {
    Alert.alert(
      texts.ccSpade as string, texts.ccSpadeClose as string, [{
        text: texts.whatever as string,
        onPress: () => {
          Alert.alert(
            texts.ccHeart as string, texts.ccHeartOpen as string, [{
              text: texts.whatever as string,
              onPress: () => null,
              style: 'cancel',
            }],
          );
          changeEvent('heart');
        },
        style: 'cancel',
      }],
    );
  }

  if (npc === 'heart' && events.kadowaki) {
    Alert.alert(
      texts.ccHeart as string, texts.ccHeartClose as string, [{
        text: texts.whatever as string,
        onPress: () => {
          Alert.alert(
            'Dr Kadowaki', texts.ccKadowakiOpen as string, [{
              text: texts.whatever as string,
              onPress: () => null,
              style: 'cancel',
            }],
          );
          addCardToNPC({ location: 'balambGarden', npc: 'kadowaki', card: 97 });
          changeEvent('kadowaki');
        },
        style: 'cancel',
      }],
    );
  }

  if (npc === 'kadowaki' && events.king && !events.kadowaki) {
    Alert.alert(
      'Dr Kadowaki', texts.ccKadowakiClose as string, [{
        text: texts.whatever as string,
        onPress: () => {
          Alert.alert(
            texts.ccKing as string, texts.ccKingOpen as string, [{
              text: texts.talkToAWall as string,
              onPress: () => null,
              style: 'cancel',
            }],
          );
          changeEvent('king');
        },
        style: 'cancel',
      }],
    );
  }

  if (npc === 'king' && events.ccEnd) {
    Alert.alert(
      texts.ccKing as string, texts.ccKingClose as string, [{
        text: texts.talkToAWall as string,
        onPress: () => null,
        style: 'cancel',
      }],
    );
    changeEvent('ccEnd');
  }
};

const getNewLocation = (location: string) => {
  const value = getRandomNumber(1, 1000);
  switch (location) {
    case 'balambTown':
      if (value < 375) return { location: 'dollet', name: 'Dollet' };
      return { location: 'delingCity', name: 'Deling City' };
    case 'dollet':
      if (value < 375) return { location: 'balambTown', name: 'Balamb Town' };
      return { location: 'delingCity', name: 'Deling City' };
    case 'delingCity':
      if (value < 125) return { location: 'balambTown', name: 'Balamb Town' };
      if (value < 250) return { location: 'dollet', name: 'Dollet' };
      if (value < 375) return { location: 'winhill', name: 'Winhill' };
      return { location: 'fishermansHorizon', name: 'Fisherman\'s Horizon' };
    case 'fishermansHorizon':
      if (value < 125) return { location: 'dollet', name: 'Dollet' };
      if (value < 375) return { location: 'winhill', name: 'Winhill' };
      return { location: 'esthar', name: 'Esthar' };
    case 'winhill':
      if (value < 375) return { location: 'delingCity', name: 'Deling City' };
      if (value < 750) return { location: 'dollet', name: 'Dollet' };
      return { location: 'fishermansHorizon', name: 'Fisherman\'s Horizon' };
    case 'esthar':
      if (value < 125) return { location: 'dollet', name: 'Dollet' };
      if (value < 500) return { location: 'shumiVillage', name: 'Shumi Village' };
      return { location: 'fishermansHorizon', name: 'Fisherman\'s Horizon' };
    case 'shumiVillage':
      if (value < 250) return { location: 'balambTown', name: 'Balamb Town' };
      if (value < 500) return { location: 'dollet', name: 'Dollet' };
      if (value < 750) return { location: 'winhill', name: 'Winhill' };
      return { location: 'esthar', name: 'Esthar' };
    default:
      return { location: 'balambTown', name: 'Balamb Town' };
  }
};

const rareCardsQuest = (
  npc: string,
  cardId: number,
  location: string,
  events: { [event: string]: boolean },
  changeEvent: (event: string) => void,
  addCardToNPC: (data: { npc: string, card: number, location: string }) => void,
  changeCardQueenPlace: (place: string) => void,
  texts: { [key: string]: string | string[] }
) => {
  if (npc === 'caraway' && cardId === 85 && events.caraway) {
    addCardToNPC({ location, npc, card: 107 });
    addCardToNPC({ location: 'fishermansHorizon', npc: 'martine', card: 85 });
    Alert.alert('Caraway', texts.carawayOpen as string, [{
      text: texts.whatever as string,
      onPress: () => Alert.alert(
        'Caraway', texts.carawayClose as string, [{
          text: texts.whatever as string,
          onPress: () => null,
          style: 'cancel',
        }],
      ),
      style: 'cancel',
    }]);
    changeEvent('caraway');
  } else if (npc === 'Card Queen') {
    if (cardId === 81 && events.minimog) {
      addCardToNPC({ location: 'delingCity', npc: 'manInBlack', card: 101 });
      changeEvent('minimog');
    }

    if (cardId === 87 && events.sacred) {
      addCardToNPC({ location: 'fishermansHorizon', npc: 'flo', card: 105 });
      changeEvent('sacred');
    }

    if (cardId === 82 && events.chicobo) {
      addCardToNPC({ location: 'balambGarden', npc: 'sittingStudent', card: 78 });
      changeEvent('chicobo');
    }

    if (cardId === 95 && events.alexander) {
      addCardToNPC({ location: 'timber', npc: 'barOwner', card: 98 });
      changeEvent('alexander');
    }

    if (cardId === 98 && events.doomtrain) {
      addCardToNPC({ location: 'esthar', npc: 'presidentialAide', card: 96 });
      changeEvent('doomtrain');
    }

    addCardToNPC({ location: 'dollet', npc: 'cardQueenSon', card: cardId });
    const newLocation = getNewLocation(location);
    Alert.alert(
      'Card Queen', (texts.cardQueenLeaving as string) + newLocation.name, [{
        text: texts.whatever as string,
        onPress: () => null,
        style: 'cancel',
      }],
    );
    changeCardQueenPlace(newLocation.location);
  } else addCardToNPC({ location, npc, card: cardId });
};

export {
  getCardsFromPlayerDeck,
  getTableData,
  getRandonPlayerCards,
  getNPCsCards,
  cardClubEvents,
  rareCardsQuest
}
