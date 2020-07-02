import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import RankNumbers from './RankNumbers';
import Cards from '../constants/Cards';
import Images from '../constants/Images';
import styles from '../styles/GameDeck';

const GetDecksCards = props => {
  const {
    cardId, table, index, handleRemoveCard, deck,
  } = props;

  if (cardId) {
    const card = Cards.find(crd => crd.id === cardId);
    return (
      <View style={styles.playerCardContainer} key={[cardId, index]}>
        <Text style={styles.title}>{card.name}</Text>
        <View style={styles.cardContainer}>
          <Image
            style={styles.image}
            source={Images.player0}
            alt="Background"
          />
          <Image
            style={styles.image}
            source={Images[card.id]}
            alt="Card"
          />
          <RankNumbers
            ranks={card.ranks}
            element={card.element}
            table={table}
            playCard={{ row: 0, column: 0, dragable: false }}
          />
          <Text
            style={styles.removeClickable}
            title="Remove Card"
            onPress={() => handleRemoveCard(cardId, deck)}
          >
            {'  '}
            x
            {'  '}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.playerCardContainer} key={[cardId, index]}>
      <Text style={styles.title}>Empty spot</Text>
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={Images.player0}
          alt="Background"
        />
      </View>
    </View>
  );
};

GetDecksCards.propTypes = {
  cardId: PropTypes.number.isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  index: PropTypes.number.isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  deck: PropTypes.string.isRequired,
};

export default GetDecksCards;
