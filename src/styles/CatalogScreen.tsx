import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenWidth, ScreenHeight } = CSSSizes

const CatalogScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#51361f',
    height: '100%',
    flexDirection: 'row',
  },
  leftContainer: {
    width: '70%',
    height: '95%',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    margin: 10,
    color: 'white'
  },
  levelContainer: {
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  levelIconContainer: {
  },
  levelIcon: {
    height: 30,
    width: 40
  },
  levelTitle: {
    fontSize: 25,
    marginBottom: 10,
    color: 'white',
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
  rightContainer: {
    width: '30%',
    height: '95%',
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    height: '60%',
    margin: 10
  },
  card: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardBackground: {
    position: 'absolute',
    width: '96%',
    height: '96%',
    margin: '2%'
  },
  aboutCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 10,
    padding: 10,
    height: '30%',
    width: '90%',
  },
  aboutText: {
    color: 'white'
  }
})

export default CatalogScreenStyles;
