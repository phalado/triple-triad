import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles/App';
import Table from './components/Table';
import Card from './components/Card';
import cards from './constants/Cards';
import PlayingCards from './components/PlayingCards';

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
        <PlayingCards player playCards={[110, 109, 108, 107, 106]} />
        <PlayingCards playCards={[1, 2, 3, 4, 5]} />
      </View>
    );
  }
}

export default App;
