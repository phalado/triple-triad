import React from 'react';
import { Image, View } from 'react-native';
import Modal from 'react-native-modal';
import RankNumbers from '../RankNumbers';
import Cards from '../../constants/Cards';
import Images from '../../constants/Images';
import styles from '../../styles/ModalScreen';

const CardModal = (props: { visible: boolean, cardId: number, cardOwner: string }) => {
  const { visible, cardId, cardOwner } = props;
  const card = Cards.find(card => card.id === cardId)

  return (
    <Modal isVisible={visible} style={{ alignItems: 'center' }}>
      <View style={styles.cardContainer}>
        <Image style={styles.cardBackgroundImage} source={Images[cardOwner]} />
        <Image style={styles.cardImage} source={Images[cardId]}  />
        <RankNumbers
          ranks={(card as any).ranks}
          element={(card as any).element}
          playCard={{ row: 0, column: 0, dragable: false }}
          player0={false}
        />
      </View>
    </Modal>
  )
}

export default CardModal;
