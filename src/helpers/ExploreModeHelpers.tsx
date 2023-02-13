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

const cardClubEvents = (
  events: { [event: string]: boolean },
  changeEvent: (event: string) => void,
  npc: string,
  npcs: NpcsInterface,
  addCardToNPC: (data: { npc: string, card: number, location: string }) => void
) => {
  const vics = Object.values(npcs.balambGarden).filter(value => value.win > 0).length;
  if (vics >= 9 && events.jack) {
    Alert.alert(
      'Card Club Jack', 'Yo! Looks like you\'re doing pretty hood qith the card games. It\'s almost time... Oh, all right. I challenge you! I\'m CC Group\'s Jack. You appear to be a worthy opponent.', [{
        text: 'Whatever',
        onPress: () => null,
        style: 'cancel',
      }],
    );
    changeEvent('jack');
  }

  if (npc === 'jack' && events.joker) {
    Alert.alert(
      'Card Club Jack', 'I lost. You are really good. But don\'t think you\'ve defeated the CC Group just yet. There are 6 members in the CC Group I haven\'t defeated. The first is the Card Master and the CC Group\'s leader, King. And the others are called the 4 suits. Then there\'s Card Magician Joker, whose ability is still a mystery even to me. Now that you defeated me, I\'m sure they\'ll show up soon. Good luck to you.', [{
        text: 'Whatever',
        onPress: () => {
          Alert.alert(
            'Card Club Joker', 'Hey, heard you\'ve been playing some good games. Sure, you wanna play? What? The CC Group? Yeah, I\'m a member. I\'m Card Magician Joker. As my name says, I\'m the black sheep of the group.', [{
              text: 'Whatever',
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
      'Card Club Joker', 'You\'re really good.', [{
        text: 'Whatever',
        onPress: () => {
          Alert.alert(
            'Card Club Club', '... It\'s been a while since someone beat Jack. I\'m Club, one of the 4 CC Knights. Do you dare to chalenge me?', [{
              text: 'Whatever',
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
      'Card Club Club', 'Not bad. But beware, there are many players far better than me in the CC Group.', [{
        text: 'Whatever',
        onPress: () => {
          Alert.alert(
            'Card Club Diamond', 'Amazing! But Club, too! Are you surprised? That\'s right, we are Card Princess Diamond. We\'re the Diamond duo. We respect your card playing habilities. We challenge you.', [{
              text: 'Whatever',
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
      'Card Club Diamond', 'He\'s good. He\'s very good. I can\'t remember the last time we\'ve been defeated. Ever since Headmaster Cid? But there are still 2 of us left.', [{
        text: 'Whatever',
        onPress: () => {
          Alert.alert(
            'Card Club Spade', 'Wow. Amazing! I can\'t believe you defeated Diamond. Yes, I am one of the 4-Suits of CC group, Card Knight Spade. It\'s been a while since someone made it this far... Shall we start?', [{
              text: 'Whatever',
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
      'Card Club Spade', 'Wow, you are good... I accpet defeat. I can tell you\'ve collected and played cards all over the world. And you remind me of her... Her talent, especially. Oh, now I\'ve said too much. Well, there is one more suit for you to defeat. But Heart is no ordinary player. She became the top player of CC group in only 3 months. She is a true genious. You two seems to have a similar learning hability. Well, now that I have bored you with too much detail I shall leave. So long.', [{
        text: 'Whatever',
        onPress: () => {
          Alert.alert(
            'Card Club Heart - Xu', 'Oh, I\'m a bit surprised. I didn\'t think Spade would loose... But this is good. I haven\'t been able to find a worth oponent lately. That\'s right! Allow me to introduce myself. I am Xu. Otherwise known as... the CC Group Card Queen Heart. Whenever you\'re ready, let\'s go.', [{
              text: 'Whatever',
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
      'Card Club Heart - Xu', '...... Defeat...... I knew this day would come, but... Oh well... You\'re only the second person to defeat me. The other is the CC group leader King, the Card Master. Now that you\'ve defeated all the 4-Suits, you\'ll eventually play the King.', [{
        text: 'Whatever',
        onPress: () => {
          Alert.alert(
            'Dr Kadowaki', 'Congratulations! I heard you defeated all 4 suits of the CC group. Oh, me...? I have nothing to do with the group. ...Well, I guess it\' ok to tell you. I was theCC group King for a long time, but I passed the position over to another girl 4 years ago. Oh, you want to know who she is? Sorry, I can\'t tell you. Well, she may revel herself if you defeat me.', [{
              text: 'Whatever',
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

  if (npc === 'kadowaki' && events.king) {
    Alert.alert(
      'Dr Kadowaki', 'You\'ll probably find the King soon, now that you\'ve defeated the 4-Suits.', [{
        text: 'Whatever',
        onPress: () => {
          Alert.alert(
            'Card Club King - Quistis', 'You defeated the 4-Suits. You\'ve proven worthy. The CC group leader, the card master King... Is I, Quistis Trepe. All decked in my uniform! You really are something. I can\'t believe how much your game has improved. I knew we were destined to play. Let\'s begin!', [{
              text: 'Go talk to a wall.',
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
      'Card Club King - Quistis', 'I can\'t believe I lost. Don\'t get too cocky just yet. We can challenge each other as equals from now on.', [{
        text: 'Go talk to a wall.',
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
  changeCardQueenPlace: (place: string) => void
) => {
  if (npc === 'caraway' && cardId === 85 && events.caraway) {
    addCardToNPC({ location, npc, card: 107 });
    addCardToNPC({ location: 'fishermansHorizon', npc: 'martine', card: 85 });
    Alert.alert('Caraway', 'Thank you for your Ifrit card. Now I might use my daughter\'s to play.', [{
      text: 'Whatever',
      onPress: () => Alert.alert(
        'Caraway', 'Are you asking me about the Ifrit card you lost other day (today)? Well, I lost it to my friend Martine.', [{
          text: 'Whatever',
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
      'Card Queen', `This place is boring me. I'm moving ro ${newLocation.name}`, [{
        text: 'Whatever',
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
