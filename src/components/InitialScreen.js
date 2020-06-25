/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/App';

const InitialScreen = props => {
  const { navigation, createCard } = props;

  useEffect(() => {
    let mounted = true;

    const cards = [
      { player: true, id: 110, row: 3, column: 3, dragable: true },
      { player: true, id: 107, row: 4, column: 3, dragable: true },
      { player: true, id: 104, row: 5, column: 3, dragable: true },
      { player: true, id: 103, row: 6, column: 3, dragable: true },
      { player: true, id: 102, row: 7, column: 3, dragable: true },
      { player: false, id: 99, row: 3, column: 3, dragable: true },
      { player: false, id: 96, row: 4, column: 3, dragable: true },
      { player: false, id: 95, row: 5, column: 3, dragable: true },
      { player: false, id: 91, row: 6, column: 3, dragable: true },
      { player: false, id: 88, row: 7, column: 3, dragable: true },
    ];

    if (mounted) {
      const addCardToRedux = card => createCard(card);
      cards.forEach(card => addCardToRedux(card));
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Play game"
        onPress={() => navigation.navigate('GamePlay')}
      />
    </View>
  );
};

InitialScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  createCard: PropTypes.func.isRequired,
};

export default InitialScreen;
