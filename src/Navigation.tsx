import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';

class Navigation extends Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <View><Text>Hello World</Text></View>
    );
  }
}

// const Navigation = () => (
//   <View><Text>Hello World</Text></View>
// )

export default Navigation;