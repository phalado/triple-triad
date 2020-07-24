import { StyleSheet, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const ExploreScenesStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  subContainerLeft: {
    width: ScreenWidth / 4,
    height: ScreenHeight,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '2.5%',
  },
  subContainerRight: {
    width: (3 * ScreenWidth) / 4,
    height: ScreenHeight * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2.5%',
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: ScreenWidth,
    height: ScreenHeight,
  },
  text: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tableContainer: {
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'stretch',
  },
  tableHead: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#c8e1ff',
    backgroundColor: '#rgba(241, 248, 255, 0.7)',
    alignSelf: 'stretch',
    alignContent: 'center',
    justifyContent: 'center',
  },
  tableText: {
    margin: 6,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tableText0: {
    margin: 6,
    textAlign: 'center',
    alignSelf: 'center',
    flex: 2,
  },
});

export default ExploreScenesStyles;
