import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import VirtualKeyboard from './VirtualKeyboard';
const { height, width } = Dimensions.get('window');

export default class DraggableKeyboard extends React.Component {
  
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0}
    this.animatedValue.addListener((value) => this._value = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        //return true if user is swiping, return false if it's a single click
                    return !(gestureState.dx === 0 && gestureState.dy === 0)                  
    },
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        })
        this.animatedValue.setValue({ x: 0, y: 0})
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.animatedValue.x, dy: this.animatedValue.y}
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.animatedValue.flattenOffset();

      },
    })
  }
  
  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    }
    return (
        <Animated.View style={[styles.box, animatedStyle]} {...this.panResponder.panHandlers}>
          <VirtualKeyboard color='white' pressMode='string' onPress={(val) => {console.log(val)}} />
        </Animated.View>
    );
  }
}
//<View style={styles.container}>
//</View>
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height,
    width,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: height*40/100,
    aspectRatio: 1/2, 
    zIndex: 1,
    backgroundColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#F1C232",
  },
  text: {
    color: "white",
    fontSize: 20,
  }
});