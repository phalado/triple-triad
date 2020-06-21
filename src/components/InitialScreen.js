import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/App';

const InitialScreen = props => {
  const { navigation } = props;
  const play1Cards = [
    { id: 110, row: 3, column: 3 },
    { id: 107, row: 4, column: 3 },
    { id: 104, row: 5, column: 3 },
    { id: 103, row: 6, column: 3 },
    { id: 102, row: 7, column: 3 },
  ];
  const play2Cards = [
    { id: 99, row: 3, column: 3 },
    { id: 96, row: 4, column: 3 },
    { id: 95, row: 5, column: 3 },
    { id: 91, row: 6, column: 3 },
    { id: 88, row: 7, column: 3 },
  ];

  return (
    <View style={styles.container}>
      <Button
        title="Play game"
        onPress={() => navigation.navigate('GamePlay', { play1Cards, play2Cards })}
      />
    </View>
  );
};

InitialScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InitialScreen;
