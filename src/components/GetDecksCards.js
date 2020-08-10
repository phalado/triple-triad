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
    if (handleRemoveCard) {
      return (
        <View style={styles.playerCardContainer} key={[cardId, index]}>
          <Text style={styles.title2}>{card.name}</Text>
          <View style={styles.cardContainer}>
            <Image style={styles.image} source={Images.player0} alt="Background" />
            <Image style={styles.image} source={Images[card.id]} alt="Card" />
            <RankNumbers ranks={card.ranks} element={card.element} table={table} />
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
        <Text style={styles.title2}>{card.name}</Text>
        <View style={styles.cardContainer}>
          <Image style={styles.image} source={Images.player0} alt="Background" />
          <Image style={styles.image} source={Images[card.id]} alt="Card" />
          <RankNumbers ranks={card.ranks} element={card.element} table={table} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.playerCardContainer} key={[cardId, index]}>
      <Text style={styles.title}>Empty spot</Text>
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={Images.player0} alt="Background" />
      </View>
    </View>
  );
};

GetDecksCards.propTypes = {
  cardId: PropTypes.number,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  index: PropTypes.number.isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  deck: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

GetDecksCards.defaultProps = {
  cardId: null,
};

export default GetDecksCards;
