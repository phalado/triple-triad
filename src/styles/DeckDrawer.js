import { StyleSheet, Dimensions } from 'react-native';

const DeckDrawerStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    flexGrow: 1,
  },
  subContainer: {
    flexGrow: 3,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DeckDrawerStyle;
