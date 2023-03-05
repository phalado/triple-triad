import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InitialScreen from './components/containers/InitialScreen';
import ExploreInitialScreen from './components/screens/ExploreInitialScreen';
import ExploreScenes from './components/containers/ExploreScenes';
import ChooseCardsScreen from './components/containers/ChooseCardsScreen';
import GameDrawer from './components/containers/GameDrawer';
import GamePlay from './components/containers/GamePlay';
import GameOverScreen from './components/containers/GameOverScreen';
import CatalogScreen from './components/containers/CatalogScreen';
import OptionsScreen from './components/containers/OptionsScreen';

class Navigation extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();
    const options = { headerShown: false }

    const GameDrawerContainer = (props: any) => {
      const { params } = props.route.params

      return (
        <Drawer.Navigator drawerContent={() => <GameDrawer {...params} />}>
          <Drawer.Screen name="GamePlay" component={GamePlay} options={options} {...params} />
        </Drawer.Navigator>
      )
    };

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Initial Screen">
          <Stack.Screen name="Initial Screen" component={InitialScreen} options={options} />
          <Stack.Screen name="Explore" component={ExploreInitialScreen} options={options} />
          <Stack.Screen name="Explore Scenes" component={ExploreScenes} options={options} />
          <Stack.Screen name="Choose Cards" component={ChooseCardsScreen} options={options} />
          <Stack.Screen name="GamePlay" component={GameDrawerContainer} options={options} />
          <Stack.Screen name="Game over" component={GameOverScreen} options={options} />
          <Stack.Screen name="Catalog" component={CatalogScreen} options={options} />
          <Stack.Screen name="Options" component={OptionsScreen} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
