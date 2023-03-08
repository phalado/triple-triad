import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenWidth, ScreenHeight, TableWidth, cardWidth, cardHeight } = CSSSizes

const AchievemnetsScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '90%',
    marginTop: '2%',
    marginLeft: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    justifyContent: 'space-evenly'
  },
  title: {
    width: '100%',
    fontSize: ScreenWidth / 28,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '20%',
    height: ScreenHeight / 5,
    margin: 10,
    borderRadius: 12,
  },
  cardFront: {
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1
  },
  cardBack: {
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1
  },
  lockedCardFront: {
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1
  },
  texts: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default AchievemnetsScreenStyles;
