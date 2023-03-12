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
  changeRandomRules: (rules: LocalRulesInterface) => void,
  texts: { [key: string]: string | string[] }
}) => {
  const {
    startRandomGame, visible, setVisible, randomRules, changeRandomRules, texts
  } = props;
  const [myRules, setMyRules] = useState({ ...randomRules })

  const switches = ['open', 'elemental', 'same', 'plus', 'sameWall', 'suddenDeath']

  useEffect(() => { changeRandomRules(myRules) }, [myRules])

  const toggleSwitch = (key: string, value: boolean) => {
    setMyRules({ ...myRules, [key]: value });
  };

  const addSwitch = (
    key: 'open' | 'elemental' | 'same' | 'plus' | 'sameWall' | 'random' | 'suddenDeath'
  ) => (
    <View style={styles.options} key={key}>
      <Text>{texts[key]}</Text>
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
        {switches.map((value) => addSwitch(
          (value as 'open' | 'elemental' | 'same' | 'plus' | 'sameWall' | 'random' | 'suddenDeath')
        ))}
        <View style={styles.rulesButtonsContainer}>
          <Button title={texts.startGame as string} onPress={() => startRandomGame()} />
          <Button title={texts.goBack as string} onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

export default RandomRulesModal
