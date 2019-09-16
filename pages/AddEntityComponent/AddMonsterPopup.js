import React from 'react';
import {Icon,Input,Item,Form,H3,View} from 'native-base'
import Popup from '../../components/Popup'

class AddMonsterPopup extends React.PureComponent {

  submitFunction = () => {
    this.props.createMonster();
  }


  render() {
    return(
      <Popup
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        submitText="Crea" backText="Annulla"
        height="30%" width="40%">
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <H3>Vuoi aggiungere il mostro?</H3>
        </View>
      </Popup>
    );
  }
}


export default AddMonsterPopup;
