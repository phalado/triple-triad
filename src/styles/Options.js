import { StyleSheet, Dimensions } from 'react-native';

const OptionsStyles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'space-evenly',
    height: Dimensions.get('window').height * 0.8,
  },
  options: {
    marginHorizontal: '30%',
    width: '40%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OptionsStyles;
