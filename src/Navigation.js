import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InitialScreen from './container/InitialScreen';
import GamePlay from './container/GamePlay';
import ChooseRules from './container/ChooseRules';
import GameDrawer from './container/GameDrawer';
import FlatList from './container/MyFlatList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerContainer = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Drawer.Navigator drawerContent={props => <GameDrawer {...props} />}>
    <Drawer.Screen name="GamePlay" component={GamePlay} />
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
          <Stack.Screen name="GamePlay" component={DrawerContainer} options={{ headerShown: false }} />
          <Stack.Screen name="Choose Rules" component={ChooseRules} />
          <Stack.Screen name="Flat List" component={FlatList} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
