import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GamePlay from './components/GamePlay';
import styles from './styles/App';
import InitialScreen from './components/InitialScreen';

const Stack = createStackNavigator();

class App extends Component {
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
          <Stack.Screen name="Initial Screen" component={InitialScreen} />
          <Stack.Screen name="GamePlay" component={GamePlay} options={{ headerShown: false }} />
          {/* <Button
            title="Play game"
            onPress={() => navigation.navigate('GamePlay')}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
