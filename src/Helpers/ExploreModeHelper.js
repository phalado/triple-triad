import { Alert } from 'react-native';
import { getRandomBoolean, getRandomNumber } from './OtherHelpers';
import Cards from '../constants/Cards';

const getCardsFromPlayerDeck = playerCards => {
  const deck = [];
  Object.entries(playerCards).forEach(([key, value]) => {
    for (let i = 0; i < value; i += 1) {
      deck.push(Cards.find(card => card.id === parseInt(key, 10)));
    }
  });
  return deck;
};

const getNPCsCards = (cards, special) => {
  const deck = [];
  while (deck.length < 5) {
    if (special.length > 0) {
      special.forEach(cardID => {
        if (getRandomBoolean() && !deck.includes(cardID)) deck.push(cardID);
      });
    }

    const cardLevel = cards[getRandomNumber(0, cards.length)];
    const randomCard = getRandomNumber(1, 12);
    const card = randomCard + (11 * (cardLevel - 1));
    // console.log(cards, cardLevel, randomCard, card);
    if (card !== 48) deck.push(card);
  }

  return deck;
};

const getTableData = (npcs, place) => {
  const tableData = [];

  if (npcs.cardQueen.place === place) {
    tableData.push([
      npcs.cardQueen.name,
      npcs.cardQueen.win,
      npcs.cardQueen.loose,
      npcs.cardQueen.tie,
      { cards: npcs.cardQueen[place], special: [] },
      'Card Queen',
    ]);
  }

  if (place === 'balambGarden') {
    // eslint-disable-next-line no-unused-vars
    const victories = Object.entries(npcs[place]).filter(([key, value]) => value.win > 0).length;
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

  // eslint-disable-next-line no-unused-vars
  Object.entries(npcs[place]).forEach(([key, value]) => {
    const {
      name, win, loose, tie, cards, special,
    } = value;
    tableData.push([name, win, loose, tie, { cards, special }, key]);
  });

  tableData.sort((a, b) => a[0] > b[0]);

  return tableData;
};

const getNewLocation = location => {
  const value = getRandomNumber(1, 1000);
  switch (location) {
    case 'balambTown':
      if (value < 375) return 'dollet';
      return 'delingCity';
    case 'dollet':
      if (value < 375) return 'balambTown';
      return 'delingCity';
    case 'delingCity':
      if (value < 125) return 'balambTown';
      if (value < 250) return 'dollet';
      if (value < 375) return 'winhill';
      return 'fishermansHorizon';
    case 'fishermansHorizon':
      if (value < 125) return 'dollet';
      if (value < 375) return 'winhill';
      return 'esthar';
    case 'winhill':
      if (value < 375) return 'delingCity';
      if (value < 750) return 'dollet';
      return 'fishermansHorizon';
    case 'esthar':
      if (value < 125) return 'dollet';
      if (value < 500) return 'shumiVillage';
      return 'fishermansHorizon';
    case 'shumiVillage':
      if (value < 250) return 'balambTown';
      if (value < 500) return 'dollet';
      if (value < 750) return 'winhill';
      return 'esthar';
    default:
      return 'balambTown';
  }
};

const rareCardsQuest = (changeCardQueenLocation, addCardToNPC, location, npc, cardId) => {
  if (npc === 'caraway' && cardId === 85) {
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
  } else if (npc === 'cardQueen') {
    if (cardId === 81) addCardToNPC({ location: 'delingCity', npc: 'manInBlack', card: 101 });
    if (cardId === 87) addCardToNPC({ location: 'fishermansHorizon', npc: 'flo', card: 105 });
    if (cardId === 82) addCardToNPC({ location: 'balambGarden', npc: 'sittingStudent', card: 78 });
    if (cardId === 95) addCardToNPC({ location: 'timber', npc: 'barOwner', card: 98 });
    if (cardId === 98) addCardToNPC({ location: 'esthar', npc: 'presidentialAide', card: 96 });

    addCardToNPC({ location: 'dollet', npc: 'cardQueenSon', card: cardId });
    const newLocation = getNewLocation(location);
    Alert.alert(
      'Card Queen', `This place is boring me. I'm moving ro ${sd}`, [{
        text: 'Whatever',
        onPress: () => null,
        style: 'cancel',
      }],
    );
    changeCardQueenLocation(newLocation);
  } else addCardToNPC({ location, npc, card: cardId });
};

export {
  getTableData, getNPCsCards, getCardsFromPlayerDeck, rareCardsQuest,
};
