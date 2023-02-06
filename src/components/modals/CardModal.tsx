import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Modal from 'react-native-modal';
import Cards from '../../constants/Cards';
import Images from '../../constants/Images';
import styles from '../../styles/ModalScreen';
import RankNumbers from '../RankNumbers';

const CardModal = (
  props:
  { visible: boolean, cardId: number, table: any, cardOwner: string }
) => {
  const { visible, cardId, table, cardOwner } = props;
  const card = Cards.find(card => card.id === cardId)

  return (
    <Modal isVisible={visible} style={{ alignItems: 'center' }}>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={Images[cardOwner]} />
        <Image style={styles.cardImage} source={Images[cardId]}  />
        <RankNumbers
          ranks={(card as any).ranks}
          element={(card as any).element}
          table={table}
          playCard={{ row: 0, column: 0, dragable: false }}
          player0={false}
        />
      </View>
    </Modal>
  )
}

export default CardModal;
