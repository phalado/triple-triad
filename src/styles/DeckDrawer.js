import { StyleSheet, Dimensions } from 'react-native';

const DeckDrawerStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.8,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flexGrow: 1,
    padding: 20,
  },
  subContainer: {
    flexGrow: 2,
    marginBottom: 20,
  },
  buttonsContainer: {
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DeckDrawerStyle;
