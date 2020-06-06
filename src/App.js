import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles/App';
import Table from './components/Table';
import Card from './components/Card';
import cards from './constants/Cards';

class App extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <View style={styles.container}>
        <Table />
        <Card card={cards.find(card => card.id === 1)} row={-1} column={-1} player="player0" />
        <Card card={cards.find(card => card.id === 6)} row={-1} column={0} player="player2" />
        <Card card={cards.find(card => card.id === 2)} row={-1} column={1} player="player2" />
        <Card card={cards.find(card => card.id === 6)} row={0} column={-1} player="player1" />
        <Card card={cards.find(card => card.id === 110)} row={0} column={0} player="player1" />
        <Card card={cards.find(card => card.id === 6)} row={0} column={1} player="player2" />
        <Card card={cards.find(card => card.id === 1)} row={1} column={-1} player="player2" />
        <Card card={cards.find(card => card.id === 6)} row={1} column={0} player="player1" />
        <Card card={cards.find(card => card.id === 2)} row={1} column={1} player="player0" />
      </View>
    );
  }
}

export default App;
