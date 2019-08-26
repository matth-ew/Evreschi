import React from 'react';
import {View,H3} from 'native-base';
import Popup from '../../components/Popup'

class FuryPopup extends React.PureComponent {

  submitFunction = () => {
    this.props.submitFury();
  }


  render() {
    return (
      <Popup
        isDisabled={this.props.isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        height="30%" width="40%">
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <H3>Vuoi usare i tuoi punti furia?</H3>
        </View>
      </Popup>
    );
  }
}

export default FuryPopup;
