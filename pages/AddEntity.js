import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button,Text} from 'native-base'
import LeftRightBar from '../components/LeftRightBar'

class AddEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LeftRightBar navigation={this.props.navigation}>
        <View style={styles.overlayBackground}>
          <View style={styles.overlay}>
            <Text h3>Cosa vuoi aggiungere?</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%'
            }}>
              <Button primary onPress={() => {this.setState({ isVisible: false }); navigate('AddHero')}}>
                <Text>Eroe</Text>
              </Button>
              <Button danger onPress={() => {this.setState({ isVisible: false }); navigate('AddMonster')}}>
                <Text>Mostro</Text>
              </Button>
            </View>
          </View>
        </View>
      </LeftRightBar>
    );
  }
}

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
  }
});

export default AddEntity;
