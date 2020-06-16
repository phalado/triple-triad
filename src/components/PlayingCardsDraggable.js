import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions
} from "react-native";

const cardWidth = Dimensions.get('window').width * 0.17;
const cardHeight = Dimensions.get('window').height * 0.28;

let styles = StyleSheet.create({
  box: {
    height: cardHeight,
    width: cardWidth,
    backgroundColor: "skyblue",
    borderRadius: 5,
    position: 'relative',
  },
});

export default class PlayingCardsDraggable extends Component {

  showDraggable= true;
  dropAreaValues = null;
  pan = new Animated.ValueXY();
  opacity = new Animated.Value(1);

  panResponder = PanResponder.create({

    onMoveShouldSetPanResponder: (e, gesture) => true,
    
    onPanResponderGrant: (e, gesture) => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value
      });
    },

    // Initialize PanResponder with move handling
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y }
    ], { useNativeDriver: false }),

    onPanResponderRelease: (e, gesture) => {
      if (this.isDropArea(e,gesture)) {
        Animated.timing(this.opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
        }).start(() =>
        this.setState({
           showDraggable: false
          })
        );
      }
      else{
        Animated.spring(this.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false
        }).start();
      }
    }

  });

  isDropArea(e,gesture) {
    return gesture.moveY < 200;
  }  

  render() {
    return (
        <Animated.View
          style={[{
            transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
          },{opacity: this.opacity}]}
          {...this.panResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
    );
  }

};