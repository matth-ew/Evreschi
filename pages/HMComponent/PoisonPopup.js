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
        height="20%" width="30%" flex={0}
        title="Subisci Veleno"/>
    );
  }
}

export default PoisonPopup;
