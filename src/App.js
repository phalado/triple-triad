import React, { Component } from 'react';
import { View, StatusBar, PanResponder, Animated } from 'react-native';
import styles from './styles/App';
import Table from './components/Table';
import Card from './components/Card';
import cards from './constants/Cards';
import PlayingCards from './components/PlayingCards';
import PlayingCardsDraggable from './components/PlayingCardsDraggable';

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
        <PlayingCards playCards={[1, 2, 3, 4, 6]} />
        <PlayingCardsDraggable />
        <PlayingCardsDraggable />
        <PlayingCardsDraggable />
      </View>
    );
  }
  
}

export default App;
