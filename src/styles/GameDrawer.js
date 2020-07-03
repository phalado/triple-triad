import { StyleSheet, Dimensions } from 'react-native';

const GameDrawerStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: Dimensions.get('window').height,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default GameDrawerStyle;
