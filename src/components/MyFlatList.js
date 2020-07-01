/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import cards from '../constants/Cards';
import Images from '../constants/Images';

const cardWidth = Dimensions.get('window').width * 0.17;
const cardHeight = Dimensions.get('window').height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#c9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    resizeMode: 'stretch',
  },
});

const Item = props => {
  const { card } = props;
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{card.name}</Text>
      <Image
        style={styles.image}
        source={Images[card.id]}
        alt="Table"
      />
    </View>
  );
};

const MyFlatList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        renderItem={({ item }) => <Item card={item} />}
        keyExtractor={card => card.name}
      />
    </SafeAreaView>
  );
};

export default MyFlatList;
