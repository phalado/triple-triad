import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InitialScreen from './components/containers/InitialScreen';
import ExploreInitialScreen from './components/screens/ExploreInitialScreen';
import ExploreScenes from './components/containers/ExploreScenes';
import ChooseCardsScreen from './components/containers/ChooseCardsScreen';

class Navigation extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();
    const options = { headerShown: false }

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Initial Screen" component={InitialScreen} options={options} />
          <Stack.Screen name="Explore" component={ExploreInitialScreen} options={options} />
          <Stack.Screen name="Explore Scenes" component={ExploreScenes} options={options} />
          <Stack.Screen name="Choose Cards" component={ChooseCardsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
