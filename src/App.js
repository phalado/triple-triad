import React from 'react';
import { View } from 'react-native';
import styles from './styles/App';
import Table from './components/Table';
import Card from './components/Card';
import cards from './constants/Cards';

const App = () => (
  <View style={styles.container}>
    <Table />
    <Card card={cards[110]} row={0} column={0} />
    <Card card={cards[110]} row={-1} column={-1} />
    <Card card={cards[110]} row={1} column={-1} />
    <Card card={cards[110]} row={1} column={1} />
    <Card card={cards[110]} row={-1} column={1} />
  </View>
);

export default App;
