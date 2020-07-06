import React from 'react';
import {
  View, Text, Button, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import GetDecksCards from './GetDecksCards';
import { getDeckButtons, deckName, getPcDeck } from '../Helpers/OtherHelpers';
import Images from '../constants/Images';
import styles from '../styles/ChooseDecksScreen';

const ChooseDecksScreen = props => {
  const {
    decks, table, createCard, resetCards, navigation, route,
  } = props;
  const { deck } = route.params.params || route.params;

  const addCardsToStore = () => {
    resetCards();
    decks.custom[deck].forEach((card, index) => {
      createCard({
        player: true, id: card, row: 3 + index, column: 3, dragable: true,
      });
    });

    getPcDeck(decks.custom[deck]).forEach((card, index) => {
      createCard({
        player: false, id: card, row: 3 + index, column: 3, dragable: true,
      });
    });
  };

  return (
    <View>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Choose a deck to play</Text>
        {getDeckButtons(navigation, styles.buttons, 'Choose Deck')}
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{deckName(deck)}</Text>
        <View style={styles.cardsContainer}>
          {decks.custom[deck].map((cardId, index) => GetDecksCards({
            cardId, table, index, handleRemoveCard: null, deck,
          }))}
        </View>
        <Button
          title="Choose this deck"
          onPress={() => {
            addCardsToStore();
            navigation.pop();
            navigation.push('GamePlay', { screen: 'GamePlay' });
          }}
        />
      </View>
      <Image style={styles.backImage} source={Images.board} alt="Table" />
    </View>
  );
};

ChooseDecksScreen.propTypes = {
  decks: PropTypes.objectOf(PropTypes.object).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  createCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChooseDecksScreen;
