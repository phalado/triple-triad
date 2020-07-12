/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getRandomCards } from '../Helpers/OtherHelpers';
import Images from '../constants/Images';
import styles from '../styles/App';

const InitialScreen = props => {
  const { navigation, createCard, resetTable, resetPlayerDeckExplore } = props;

  useEffect(() => {
    resetTable();
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
  }, []);

  const handleResetDeck = () => {
    resetPlayerDeckExplore();
  };

  return (
    <View style={styles.container}>
      <View style={styles.halfSections}>
        <TouchableOpacity onPress={() => navigation.navigate('Explore', { handleResetDeck })} style={styles.exploreButton}>
          <Image
            style={styles.backgroundImages}
            source={Images.explore}
            alt="World Map"
          />
          <Text style={styles.buttonText}>Explore Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('GamePlay')} style={styles.exploreButton}>
          <Image
            style={styles.backgroundImages}
            source={Images.randomGame}
            alt="Random Game"
          />
          <Text style={styles.buttonText}>Random Game</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Choose Deck', { deck: 'deck1' })} style={styles.exploreButton}>
          <Image
            style={styles.backgroundImages}
            source={Images.quickGame}
            alt="Quick Game"
          />
          <Text style={styles.buttonText}>Quick Game</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.halfSections}>
        <TouchableOpacity onPress={() => navigation.navigate('Choose Rules')} style={styles.exploreButton2}>
          <Image
            style={styles.backgroundImages}
            source={Images.changeRules}
            alt="Choose Rules"
          />
          <Text style={styles.buttonText}>Choose Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Game Deck', { screen: 'Game Deck', params: { deck: 'none' } })}
          style={styles.exploreButton2}
        >
          <Image
            style={styles.backgroundImages}
            source={Images.deckScreen}
            alt="Edit your decks"
          />
          <Text style={styles.buttonText}>Edit your decks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

InitialScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  createCard: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
  resetPlayerDeckExplore: PropTypes.func.isRequired,
};

export default InitialScreen;
