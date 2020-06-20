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
        <PlayingCards player />
        <PlayingCards />
        <Card
          card={Cards.find(card => card.id === 110)}
          row={2}
          column={2}
          player
        />
        <Card
          card={Cards.find(card => card.id === 109)}
          row={3}
          column={3}
          player
        />
        <Card
          card={Cards.find(card => card.id === 108)}
          row={4}
          column={4}
          player
        />
        <Card
          card={Cards.find(card => card.id === 107)}
          row={5}
          column={5}
          player
        />
        <Card
          card={Cards.find(card => card.id === 106)}
          row={6}
          column={6}
          player
        />
        <Card
          card={Cards.find(card => card.id === 8)}
          row={2}
          column={2}
        />
        <Card
          card={Cards.find(card => card.id === 15)}
          row={3}
          column={3}
        />
        <Card
          card={Cards.find(card => card.id === 6)}
          row={4}
          column={4}
        />
        <Card
          card={Cards.find(card => card.id === 17)}
          row={5}
          column={5}
        />
        <Card
          card={Cards.find(card => card.id === 18)}
          row={6}
          column={6}
        />
      </View>
    );
  }
}

export default App;
