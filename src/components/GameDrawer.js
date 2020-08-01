import React from 'react';
import {
  View, Text, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { resetGame } from '../Helpers/OtherHelpers';
import styles from '../styles/GameDrawer';

const GameDrawer = props => {
  const {
    rules, createCard, resetCards, resetTable, navigation, state,
  } = props;
  const { location } = state.routes[0].params;

  const giveUpButton = () => resetGame({
    resetCards, resetTable, createCard, navigation,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Hello Stranger!!!</Text>
      <View>
        <Text style={styles.title}>Rules enabled: </Text>
        {Object.entries(rules[location]).map(([key, value]) => {
          if (value) return <Text key={key}>{key}</Text>;
          return null;
        })}
      </View>
      <Button
        style={{ margin: 20 }}
        title="Give up"
        onPress={() => giveUpButton()}
      />
    </View>
  );
};

GameDrawer.propTypes = {
  rules: PropTypes.objectOf(PropTypes.any).isRequired,
  createCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GameDrawer;
