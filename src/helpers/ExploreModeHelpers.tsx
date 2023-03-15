import { getRandomBoolean, getRandomNumber } from "./OtherHelpers";
import { NpcInterface, NpcsInterface } from "../interfaces/NpcsInterface";
import Cards from "../constants/Cards";
import CardObjectInterface from "../interfaces/CardObjectInterface";
import CardQueenInterface from "../interfaces/CardQueenInterface";
import Npcs from "../constants/Npcs";
import AchievementsInterface from "../interfaces/AchievementsInterface";

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

  Object.entries(npcs[place]).forEach(([key, value]) => {
    const { name, win, loose, tie, cards, special } = value;
    tableData.push([name, win, loose, tie, { cards, special }, key]);
  });

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
  texts: { [key: string]: string },
  addNpcToLocation: (data: { npc: NpcInterface, location: string }) => void,
  changeAchievement: (achievement: string) => void,
  setInfoBoxData: (props: {
    title: string,
    text: string,
    onOk: () => void,
    onCancel: null | (() => void)
  }) => void,
  setInfoBoxVisible: (visible: boolean) => void
) => {
  const vics = Object.values(npcs.balambGarden).filter(value => value.win > 0).length;

  const changeEventAndAddNpc = (
    event: 'jack' | 'joker' | 'club' | 'diamond' | 'spade' | 'heart' | 'kadowaki' | 'king'
  ) => {
    const achievementName = {
      jack: 'cardClubBegin',
      joker: 'beatJack',
      club: 'beatJoker',
      diamond: 'beatClub',
      spade: 'beatDiamond',
      heart: 'beatSpade',
      king: 'beatKadowaki',
    }

    changeEvent(event)
    if (event !== 'kadowaki') changeAchievement(achievementName[event])
    addNpcToLocation({ npc: { [event]: { ...Npcs.cardClub[event] } }, location: 'balambGarden' })
  }

  if (vics >= 1 && events.jack) {
    setInfoBoxData({
      title: texts.ccJack,
      text: texts.ccJackOpen,
      onOk: () => {
        changeEventAndAddNpc('jack')
        setInfoBoxVisible(false)
      },
      onCancel: null
    })
  }

  if (npc === 'jack' && events.joker) {
    setInfoBoxData({
      title: texts.ccJack,
      text: texts.ccJackClose,
      onOk: () => {
        setInfoBoxData({
          title: texts.ccJoker,
          text: texts.ccJokerOpen,
          onOk: () => {
            changeEventAndAddNpc('joker')
            setInfoBoxVisible(false)
          },
          onCancel: null
        })
      },
      onCancel: null
    })
  }

  if (npc === 'joker' && events.club) {
    setInfoBoxData({
      title: texts.ccJoker,
      text: texts.ccJokerClose,
      onOk: () => {
        setInfoBoxData({
          title: texts.ccClub,
          text: texts.ccClubOpen,
          onOk: () => {
            changeEventAndAddNpc('club')
            setInfoBoxVisible(false)
          },
          onCancel: null
        })
      },
      onCancel: null
    })
  }

  if (npc === 'club' && events.diamond) {
    setInfoBoxData({
      title: texts.ccClub,
      text: texts.ccClubClose,
      onOk: () => {
        setInfoBoxData({
          title: texts.ccDiamond,
          text: texts.ccDiamondOpen,
          onOk: () => {
            changeEventAndAddNpc('diamond')
            setInfoBoxVisible(false)
          },
          onCancel: null
        })
      },
      onCancel: null
    })
  }

  if (npc === 'diamond' && events.spade) {
    setInfoBoxData({
      title: texts.ccDiamond,
      text: texts.ccDiamondClose,
      onOk: () => {
        setInfoBoxData({
          title: texts.ccSpade,
          text: texts.ccSpadeOpen,
          onOk: () => {
            changeEventAndAddNpc('spade')
            setInfoBoxVisible(false)
          },
          onCancel: null
        })
      },
      onCancel: null
    })
  }

  if (npc === 'spade' && events.heart) {
    setInfoBoxData({
      title: texts.ccSpade,
      text: texts.ccSpadeClose,
      onOk: () => {
        setInfoBoxData({
          title: texts.ccHeart,
          text: texts.ccHeartOpen,
          onOk: () => {
            changeEventAndAddNpc('heart')
            setInfoBoxVisible(false)
          },
          onCancel: null
        })
      },
      onCancel: null
    })
  }

  if (npc === 'heart' && events.kadowaki) {
    setInfoBoxData({
      title: texts.ccHeart,
      text: texts.ccHeartClose,
      onOk: () => {
        setInfoBoxData({
          title: 'Dr Kadowaki',
          text: texts.ccKadowakiOpen,
          onOk: () => {
            changeAchievement('beatHeart')
            changeEvent('kadowaki');
            setInfoBoxVisible(false)
          },
          onCancel: null
        })
      },
      onCancel: null
    })
  }

  if (npc === 'kadowaki' && events.king && !events.kadowaki) {
    setInfoBoxData({
      title: 'Dr Kadowaki',
      text: texts.ccKadowakiClose,
      onOk: () => {
        setInfoBoxData({
          title: texts.ccKing,
          text: texts.ccKingOpen,
          onOk: () => {
            changeEventAndAddNpc('king')
            setInfoBoxVisible(false)
          },
          onCancel: null
        })
      },
      onCancel: null
    })
  }

  if (npc === 'king' && events.ccEnd) {
    setInfoBoxData({
      title: texts.ccKing,
      text: texts.ccKingClose,
      onOk: () => {
        changeAchievement('beatTheCC')
        changeEvent('ccEnd')
        setInfoBoxVisible(false)
      },
      onCancel: null
    })
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
  texts: { [key: string]: string },
  achievements: AchievementsInterface,
  changeAchievement: (achievement: string) => void,
  setInfoBoxData: (props: {
    title: string,
    text: string,
    onOk: () => void,
    onCancel: null | (() => void)
  }) => void,
  setInfoBoxVisible: (visible: boolean) => void
  ) => {
  if (npc === 'caraway' && cardId === 85 && events.caraway) {
    addCardToNPC({ location, npc, card: 107 });
    addCardToNPC({ location: 'fishermansHorizon', npc: 'martine', card: 85 });

    setInfoBoxData({
      title: 'Caraway',
      text: texts.carawayOpen,
      onOk: () => {
        setInfoBoxData({
          title: 'Caraway',
          text: texts.carawayClose,
          onOk: () => {
            changeEvent('caraway')
            changeAchievement('caraway')
            setInfoBoxVisible(false)
          },
          onCancel: null
        })
      },
      onCancel: null
    })

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
    setInfoBoxData({
      title: 'Card Queen',
      text: texts.cardQueenLeaving + newLocation.name,
      onOk: () => setInfoBoxVisible(false),
      onCancel: null
    })
    changeCardQueenPlace(newLocation.location);
  } else addCardToNPC({ location, npc, card: cardId });

  const queenOfCardsEvents = ['minimog', 'sacred', 'chicobo', 'alexander', 'doomtrain']

  if (
    !achievements.completeQueenOfCards.status &&
      queenOfCardsEvents.every((event: string) => events[event] === false)
    ) changeAchievement('completeQueenOfCards')
};

export {
  getCardsFromPlayerDeck,
  getTableData,
  getRandonPlayerCards,
  getNPCsCards,
  cardClubEvents,
  rareCardsQuest
}
