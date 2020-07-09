import React from 'react';
import { Alert, View, Button } from 'react-native';

const getRandomBoolean = () => (Math.floor(100 * Math.random()) % 2 === 0);
const getRandomNumber = (min, max) => Math.floor((max - min) * Math.random()) + min;

const cardsOnTheTable = table => table.flat().filter(field => !!field[0]).length;

const getCardContainer = (row, column, player, scrennHeight, styles) => {
  let cardContainer = styles.container;

  if (row === 0) cardContainer = { ...cardContainer, ...styles.topRow };
  else if (row === 1) cardContainer = { ...cardContainer, ...styles.centerRow };
  else if (row === 2) cardContainer = { ...cardContainer, ...styles.bottomRow };
  else {
    const value = (scrennHeight * 0.15) + (row - 3) * scrennHeight * 0.1;
    cardContainer = player ? { ...cardContainer, top: value, right: '2.5%' }
      : { ...cardContainer, top: value, left: '2.5%' };
  }

  if (column === 0) cardContainer = { ...cardContainer, ...styles.leftColumn };
  else if (column === 1) cardContainer = { ...cardContainer, ...styles.centerColumn };
  else if (column === 2) cardContainer = { ...cardContainer, ...styles.rightColumn };

  return cardContainer;
};

const getRandomCards = () => {
  const cards = [];
  cards.push(getRandomNumber(1, 55));
  cards.push(getRandomNumber(1, 55));
  cards.push(getRandomNumber(56, 77));
  cards.push(getRandomNumber(78, 99));
  cards.push(getRandomNumber(100, 110));
  return cards;
};

const getCardsId = cards => {
  const newP1Cards = [];
  const newP2Cards = [];
  cards.forEach(card => newP1Cards.push(card.id));

  let value = 0;
  while (newP1Cards.length > 5) {
    value = getRandomNumber(0, newP1Cards.length);
    newP2Cards.push(newP1Cards[value]);
    newP1Cards.splice(value, 1);
  }

  return ({ newP1Cards, newP2Cards });
};

const resetGame = props => {
  const {
    resetCards, resetTable, createCard, navigation,
  } = props;

  Alert.alert('Wait!', 'If you leave this game will be canceled. Are you sure?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {
      text: 'Whatever',
      onPress: () => {
        navigation.pop();
        resetTable();
        resetCards();

        let newCards = getRandomCards();
        newCards.forEach((card, index) => {
          createCard({
            player: true, id: card, row: 3 + index, column: 3, dragable: true,
          });
        });

        newCards = getRandomCards();
        newCards.forEach((card, index) => {
          createCard({
            player: false, id: card, row: 3 + index, column: 3, dragable: true,
          });
        });
      },
    },
  ]);
};

const getDeckButtons = (navigation, style, screen) => (
  <View style={style}>
    <Button
      title="Deck 1"
      onPress={() => {
        navigation.pop();
        navigation.push(screen, { screen, params: { deck: 'deck1' } });
      }}
    />
    <Button
      title="Deck 2"
      onPress={() => {
        navigation.pop();
        navigation.push(screen, { screen, params: { deck: 'deck2' } });
      }}
    />
    <Button
      title="Deck 3"
      onPress={() => {
        navigation.pop();
        navigation.push(screen, { screen, params: { deck: 'deck3' } });
      }}
    />
    <Button
      title="Deck 4"
      onPress={() => {
        navigation.pop();
        navigation.push(screen, { screen, params: { deck: 'deck4' } });
      }}
    />
    <Button
      title="Deck 5"
      onPress={() => {
        navigation.pop();
        navigation.push(screen, { screen, params: { deck: 'deck5' } });
      }}
    />
  </View>
);

const deckName = name => {
  const newName = name.split('');
  newName[0] = newName[0].toUpperCase();
  newName.splice(newName.length - 1, 0, ' ');
  return newName.join('');
};

const getPcDeck = deck => {
  const pcDeck = [];
  deck.forEach(cardId => {
    const newCardLvl = Math.ceil(cardId / 11);
    let newCardId = getRandomNumber(((newCardLvl - 1) * 11) + 1, (newCardLvl * 11) + 1);

    if (newCardLvl > 7) {
      while (deck.includes(newCardId) || pcDeck.includes(newCardId)) {
        newCardId = getRandomNumber(((newCardLvl - 1) * 11) + 1, (newCardLvl * 11) + 1);
      }
    }

    pcDeck.push(newCardId);
  });
  return pcDeck;
};

const cloneTable = table => table.map(rows => rows.map(field => field.map(value => value)));

export {
  getRandomBoolean, cardsOnTheTable, getCardContainer, getRandomCards, getCardsId, resetGame,
  getDeckButtons, deckName, getPcDeck, getRandomNumber, cloneTable,
};
