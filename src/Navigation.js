import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GamePlay from './container/GamePlay';
import styles from './styles/App';
import InitialScreen from './components/InitialScreen';

const Stack = createStackNavigator();

class Navigation extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Initial Screen" component={InitialScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GamePlay" component={GamePlay} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
