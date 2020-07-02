import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';
import styles from '../styles/GameDeck';

const DeckAnimatedCard = props => {
  const { card, table } = props;

  return (
    <View style={styles.item}>
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
      </View>
    </View>
  );
};

DeckAnimatedCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default DeckAnimatedCard;
