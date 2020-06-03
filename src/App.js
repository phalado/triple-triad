import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/App';
import Table from './components/Table';
import Card from './components/Card';

const App = () => (
  <View style={styles.container}>
    <Table />
    <Card />
  </View>
);

export default App;
