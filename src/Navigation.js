import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InitialScreen from './container/InitialScreen';
import GamePlay from './container/GamePlay';
import ChooseRules from './container/ChooseRules';
import GameDrawer from './container/GameDrawer';
import GameDeck from './container/GameDeck';
import DeckDrawer from './container/DeckDrawer';
import ChooseDecksScreen from './container/ChooseDecksScreen';
import ExploreScenes from './container/ExploreScenes';
import ExploreInitialScreen from './components/ExploreInitialScreen';
import ChooseCardsScreen from './container/ChooseCardsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const GameDrawerContainer = () => (
  <Drawer.Navigator drawerContent={props => <GameDrawer {...props} />}>
    <Drawer.Screen name="GamePlay" component={GamePlay} />
  </Drawer.Navigator>
);

const DecksDrawerContainer = () => (
  <Drawer.Navigator drawerContent={props => <DeckDrawer {...props} />}>
    <Drawer.Screen name="Game Deck" component={GameDeck} />
  </Drawer.Navigator>
);

class Navigation extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Initial Screen" component={InitialScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GamePlay" component={GameDrawerContainer} options={{ headerShown: false }} />
          <Stack.Screen name="Choose Rules" component={ChooseRules} />
          <Stack.Screen name="Game Deck" component={DecksDrawerContainer} options={{ headerShown: false }} />
          <Stack.Screen name="Choose Deck" component={ChooseDecksScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Explore" component={ExploreInitialScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Explore Scenes" component={ExploreScenes} options={{ headerShown: false }} />
          <Stack.Screen name="Choose Cards" component={ChooseCardsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
