import React from 'react';
import { View, Image } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import RankNumbers from './RankNumbers';
import Cards from '../constants/Cards';
import styles from '../styles/ModalScreen';

const CardModal = props => {
  const {
    visible, card, table, cardOwner,
  } = props;
  const thisCard = Cards.find(c => c.id === card);
  return (
    <Modal isVisible={visible} style={{ alignItems: 'center' }}>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={Images[cardOwner]} alt="Background" />
        <Image style={styles.cardImage} source={Images[thisCard.id]} alt="Card" />
        <RankNumbers
          ranks={thisCard.ranks}
          element={thisCard.element}
          table={table}
          playCard={{ row: 0, column: 0, dragable: false }}
        />
      </View>
    </Modal>
  );
};

CardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  card: PropTypes.number.isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  cardOwner: PropTypes.string.isRequired,
};

export default CardModal;
