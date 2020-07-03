import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Switch } from 'react-native-gesture-handler';
import styles from '../styles/Options';

const ChooseRules = props => {
  const { rules, changeRules } = props;
  const [myState, setMyState] = useState(rules);

  useFocusEffect(() => { changeRules(myState); }, []);

  const toggleSwitch = (key, value) => {
    setMyState({ ...myState, [key]: value });
    changeRules(myState);
  };

  const addSwitch = (name, key) => (
    <View style={styles.options}>
      <Text>{name}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={myState[key] ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={() => toggleSwitch(key, !myState[key])}
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
