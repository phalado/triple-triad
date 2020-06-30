import { StyleSheet, Dimensions } from 'react-native';

const AppStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: Dimensions.get('window').height,
  },
});

export default AppStyles;
