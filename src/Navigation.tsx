import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InitialScreen from './components/containers/InitialScreen';
import ExploreInitialScreen from './components/screens/ExploreInitialScreen';

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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
