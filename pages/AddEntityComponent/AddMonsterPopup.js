import React from 'react';
import {H3,Text, View, Item} from 'native-base';
import {Picker} from 'react-native';
import Popup from '../../components/Popup';
import produce from "immer";

class AddMonsterPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      monsters_number: 1
    };
  }

  submitFunction = () => {
    this.props.createMonster(this.state.monsters_number);
  }

  levelPicker = (max) => {
    var pickerItems = [];
    for (var i = 1; i <= max; i++)
      pickerItems.push(
        <Picker.Item key={i} label={i.toString()} value={i} />
      );
    return pickerItems;
  };

  render() {
    return(
      <Popup
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        submitText="Crea" backText="Annulla"
        height="40%" width="40%" flex={3}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <H3>Vuoi aggiungere il mostro?</H3>
          <Item key={"dungeon"} style={{ flex: 1 }} picker>
            <Text style={{ flex: 1, textAlign: "center" }}>Quanti? </Text>
            <Picker
              mode="dropdown"
              selectedValue={this.state.monsters_number}
              style={{ flex: 1, width: undefined }}
              onValueChange={itemValue =>
                this.setState(
                  produce(draft => {
                    draft.monsters_number = itemValue;
                  })
                )
              }
            >
              {this.levelPicker(6)}
            </Picker>
          </Item>
        </View>
      </Popup>
    );
  }
}


export default AddMonsterPopup;
