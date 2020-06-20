import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/App';

const InitialScreen = props => {
  const { navigation } = props;
  const play1Cards = [110, 107, 104, 103, 102];
  const play2Cards = [99, 96, 95, 91, 88];

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
