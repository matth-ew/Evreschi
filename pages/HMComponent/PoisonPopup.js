import React from 'react';
import {TextInput} from 'react-native'
import {View,Text, H3, Icon, Item} from 'native-base';
import Popup from '../../components/Popup'

class PoisonPopup extends React.PureComponent {

  submitFunction = () => {
    this.props.submitPoison?.();
  }

  render() {
    return (
      <Popup
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        height="30%" width="40%" flex={2}>
        <View style={{flex:1, flexDirection: "column", alignItems: 'center', justifyContent: "center"}}>
          <H3>Subisci veleno</H3>
        </View>
      </Popup>
    );
  }
}

export default PoisonPopup;
