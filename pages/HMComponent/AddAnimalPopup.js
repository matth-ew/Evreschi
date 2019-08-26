import React from 'react';
import {View} from 'react-native';
import {Icon,Input,Item,Form,Picker,Text} from 'native-base'
import Popup from '../../components/Popup'

class AddAnimalPopup extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      animalId: null,
      animalLevel: null,
    }
  }

  submitFunction = () => {
    const {animalId,animalLevel} = this.state
    this.props.submitAnimal(animalId,animalLevel);
    this.resetStats();
  }

  cancelFunction = () => {
    this.resetStats();
  }

  resetStats = () => {
    this.setState({
      animalId: null,
      animalLevel: null,
    })
  }

  setAnimal = (animalId) => {
    this.setState({animalId})
  }

  levelPicker = (id,min,max) => {
    var pickerItems=[];
    for(var i = min; i <= max; i++)
      pickerItems.push(<Picker.Item key = {id||i} label={i.toString()} value={i} />)
    return pickerItems;
  }

  render() {
    const isDisabled = false
    return(
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}>
        <Form>
          <Item key={"animal"} picker>
            <Text style={{flex:1}}>Livello Animale</Text>
            <Picker key={"animal"}
              selectedValue={animalLevel}
              style={{ flex:1,width: undefined }}
              onValueChange={ itemValue =>
                this.setState(produce(draft => {
                  draft.animalLevel = itemValue
                }))}>
              <Picker.Item label="Seleziona il livello" value={null}/>
              {this.levelPicker("animal",0,12)}
            </Picker>
          </Item>
        </Form>
      </Popup>
    );
  }
}


export default AddAnimalPopup;
