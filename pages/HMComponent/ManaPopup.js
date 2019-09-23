import React from 'react';
import {TextInput} from 'react-native'
import {View,Text, H3, Icon, Item} from 'native-base';
import Popup from '../../components/Popup'

class ManaPopup extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      mp_using: null,
    }
  }


  submitFunction = () => {
    this.props.submitMana(this.state.mp_using);
    this.resetStats();
  }

  cancelFunction = () => {
    this.resetStats();
  }

  mpHandler = (val) => {
    const newVal =val.replace(/[^0-9]/g, "");
    this.setState({mp_using:newVal})
  }

  resetStats = () => {
    this.setState({
      mp_using: null,
    })
  }

  render() {
    const {mp_using} = this.state
    const isDisabled = (mp_using ? false : true)
    return (
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        height="30%" width="40%">
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <H3 style={{flex:1}}>Quanti punti mana usi?</H3>
          <Item style={{flex:1}}>
            <Icon active name="beaker" style={{color:"#faad14"}} />
            <TextInput disableFullscreenUI={true} allowFontScaling={true} numberOfLines={1} placeholder="Punti Mana" keyboardType={'numeric'} value={mp_using} onChangeText={this.mpHandler}/>
          </Item>
        </View>
      </Popup>
    );
  }
}

export default ManaPopup;
