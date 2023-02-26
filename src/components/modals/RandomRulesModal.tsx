import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { LocalRulesInterface } from '../../interfaces/RulesInterface';
import styles from '../../styles/ModalScreen';

const RandomRulesModal = (props: {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  startRandomGame: () => void,
  randomRules: LocalRulesInterface,
  changeRandomRules: (rules: LocalRulesInterface) => void
}) => {
  const { startRandomGame, visible, setVisible, randomRules, changeRandomRules } = props;
  const [myRules, setMyRules] = useState({ ...randomRules })

  useEffect(() => { changeRandomRules(myRules) }, [myRules])

  const toggleSwitch = (key: string, value: boolean) => {
    setMyRules({ ...myRules, [key]: value });
  };

  const addSwitch = (
    name: string,
    key: 'open' | 'elemental' | 'same' | 'plus' | 'sameWall' | 'random' | 'sudenDeath'
  ) => (
    <View style={styles.options}>
      <Text>{name}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={myRules[key] ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={() => toggleSwitch(key, !myRules[key])}
        value={myRules[key]}
      />
    </View>
  );

  return (
    <Modal isVisible={visible}>
      <View style={styles.optionsContainer}>
        {addSwitch('Open', 'open')}
        {addSwitch('Elemental', 'elemental')}
        {addSwitch('Same', 'same')}
        {addSwitch('Plus', 'plus')}
        {addSwitch('Same Wall', 'sameWall')}
        {addSwitch('Random', 'random')}
        {addSwitch('Suden Death', 'sudenDeath')}
        <View style={styles.rulesButtonsContainer}>
          <Button title={'Start Game'} onPress={() => startRandomGame()} />
          <Button title={'Cancel'} onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

export default RandomRulesModal
