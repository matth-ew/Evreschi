import React from 'react';
import {View,TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {Icon,Input,Item,Form,Picker,Text,Thumbnail} from 'native-base'
import Popup from '../../components/Popup'
import produce from 'immer';
import animalsList from '../../components/animals-list'
import {addAnimal} from '../../redux/actions/act-animals'

const mapStateToProps = state => {
  return {
    animals: state.Animals,
   };
};

const mapDispatchToProps = dispatch => {
  return {
    addAnimal: animal => dispatch(addAnimal(animal)),
  };
};


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
    const {pv,def} = animalsList.levels[animalLevel].animals[animalId]
    this.props.addAnimal({animalId: animalId, animalHp: pv, animalDef:def});
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

  levelPicker = (animalId) => {
    var pickerItems=[];
    if(animalId){
      animalsList.levelsIds.forEach( levelId => {
        const level = animalsList.levels[levelId]
        if(level.animals[animalId]) {
          //console.log("<Picker.Item key = {"+level.id+"} label={"+level.label+"} value={"+level.id+"} />")
          pickerItems.push(<Picker.Item key = {level.id} label={level.label} value={level.id} />)
        }
      })
    }
    return pickerItems;
  }

  renderAnimals = () => {
    const {animals,animalsIds} = animalsList
    return animalsIds.map( (animalId) => {
      const animal = animals[animalId]
      let isDisabled = false;
      if(this.props.animals.find(elem => elem.id == animalId)) isDisabled = true;
      return (
        <TouchableOpacity key={animalId} disabled={isDisabled} activeOpacity={0.7} style={{alignItems:'center',width: '33%', marginVertical:10}} onPress={() => {this.setAnimal(animalId)}}>
          <Thumbnail square large source={animal.image} style={isDisabled?{opacity: 0.3}:{}}  />
          <Text style={{color:'white'}}>{animal.label}</Text>
        </TouchableOpacity>)
    })
  }


  render() {
    const {animalId,animalLevel} = this.state
    const isDisabled = ((animalId != null && animalLevel != null) ? false : true)
    return(
      <Popup
        isDisabled={isDisabled}
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        cancelFunction={this.cancelFunction}
        toggleFunction={this.props.toggleFunction}
        height="80%" width="70%"
        flex={5}>
        <Form style={{flex:1}}>
          <View style={{flex: 1, flexDirection:'row',flexWrap: 'wrap', marginHorizontal: '20%'}}>
            {this.renderAnimals()}
          </View>
            <Item itemDivider/>
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
                {this.levelPicker(animalId)}
              </Picker>
            </Item>
          </Form>
      </Popup>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddAnimalPopup);
