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
        height="20%" width="30%" flex={0}
        title="Usa Colpo Furia"/>
    );
  }
}

export default FuryPopup;
