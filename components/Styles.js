import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  overlayBackground: {
    position: "absolute",
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  overlay: {
    position: "absolute",
    top: '25%',
    right: '25%',
    bottom: '25%',
    left: '25%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 2
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionPopupText: {
    //fontSize: 0.05*width,
    fontSize: 20,
    textAlign: "justify",
    color: "white"
  },
  descriptionPopupTitleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
});
