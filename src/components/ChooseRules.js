import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Switch } from 'react-native-gesture-handler';
import styles from '../styles/Options';

const ChooseRules = props => {
  const { rules, changeRules } = props;
  const [myState, setMyState] = useState(rules);

  const toggleSwitch = key => {
    setMyState({
      ...myState,
      [key]: !myState[key],
    });
    changeRules(myState);
  };

  const addSwitch = (name, key) => (
    <View style={styles.options}>
      <Text>{name}</Text>
      <Switch
        // style={{ width: '50%' }}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={myState[key] ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={() => toggleSwitch(key)}
        value={myState[key]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {addSwitch('Open', 'open')}
      {addSwitch('Elemental', 'elemental')}
      {addSwitch('Same', 'same')}
      {addSwitch('Plus', 'plus')}
      {addSwitch('Same Wall', 'sameWall')}
      {addSwitch('Random', 'random')}
      {addSwitch('Suden Death', 'sudenDeath')}
    </View>
  );
};

ChooseRules.propTypes = {
  rules: PropTypes.objectOf(PropTypes.bool).isRequired,
  changeRules: PropTypes.func.isRequired,
};

export default ChooseRules;
