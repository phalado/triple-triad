import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Table from './components/Table';
import PlayingCards from './components/PlayingCards';
import Cards from './constants/Cards';
import Card from './components/Card';
import styles from './styles/App';


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
        <Card
          card={Cards.find(card => card.id === 110)}
          row={2}
          column={2}
          player="player1"
        />
        <Card
          card={Cards.find(card => card.id === 109)}
          row={3}
          column={3}
          player="player1"
        />
        <Card
          card={Cards.find(card => card.id === 108)}
          row={4}
          column={4}
          player="player1"
        />
        <Card
          card={Cards.find(card => card.id === 107)}
          row={5}
          column={5}
          player="player1"
        />
        <Card
          card={Cards.find(card => card.id === 106)}
          row={6}
          column={6}
          player="player1"
        />
        {/* <PlayingCards player playCards={[110, 109, 108, 107, 106]} /> */}
        <PlayingCards playCards={[1, 2, 3, 4, 6]} />
      </View>
    );
  }
}

export default App;
