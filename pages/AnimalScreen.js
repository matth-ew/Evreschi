import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Thumbnail,Button, Text, View} from 'native-base'
import LeftRightBar from '../components/LeftRightBar'
import {connect} from "react-redux";
import animalsList from '../components/animals-list'
import Health from './HMComponent/Health'
import Defence from './HMComponent/Defence'
import Fury from './HMComponent/Fury'
import DamagePopup from './HMComponent/DamagePopup'
import HealPopup from './HMComponent/HealPopup'
import BonusMalusPopup from './HMComponent/BonusMalusPopup'
import DeletePopup from './HMComponent/DeletePopup'
import {changeAnimal,deleteAnimal,animalDamage,animalHeal,animalFury,animalDefence} from '../redux/actions/act-animals'

const mapStateToProps = state => {
  return {
    animals: state.Animals,
    settings: state.Settings,
   };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAnimal: animal => dispatch(changeAnimal(animal)),
    deleteAnimal: id => dispatch(deleteAnimal(id)),
    animalDamage: (id,damage) => dispatch(animalDamage(id,damage)),
    animalHeal: (animal_heal) => dispatch(animalHeal(animal_heal)),
    animalFury: (id,value) => dispatch(animalFury(id,value)),
    animalDefence: (id,value) => dispatch(animalDefence(id,value)),
  };
};

class AnimalScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isDamageVisible: false,
      isHealVisible: false,
      isBonusMalusVisible: false,
      isDeleteAnimalVisible: false,
    }
  }

  toggleDamageModal = (visibility) => {
    this.setState({isDamageVisible: visibility})
  }
  toggleFuryModal = (visibility) => {
    this.setState({isFuryVisible: visibility})
  }
  toggleHealModal = (visibility) => {
    this.setState({isHealVisible: visibility})
  }
  toggleBonusMalusModal = (visibility) => {
    this.setState({isBonusMalusVisible: visibility})
  }

  toggleDeleteAnimal = () => {
    this.setState(prevState => ({
        isDeleteAnimalVisible: !prevState.isDeleteAnimalVisible
      })
    )
  }

  submitDamage = (dice,multiplier,critical,poison,burn) => {
    const animalId = this.props.navigation.getParam('animalId', 'NO-ID');
    const animal = this.props.animals.find(animal => animal.id == animalId)

    let damage = 0;
    if(dice){
      //DANNO DA ATTACCO SUBITO
      damage = (dice-animal.curr_def)*multiplier
      if(critical) damage *= 2
      //INCREMENTO DI 1 LE FURIE SE NON HO SANGUINAMENTO
      if(!animal.bleeding) this.props.animalFury(animalId,1)
    }

    if(damage > 0){
      this.props.animalDamage(animalId,damage)
    }
  }

  deleteAnimal = () => {
    const {navigate} = this.props.navigation;
    const animalId = this.props.navigation.getParam('animalId', 'NO-ID');
    navigate('Main');
    this.props.deleteAnimal(animalId);
  }

  submitHeal = (total_heal,hp_heal,mp_heal) => {
    const animalId = this.props.navigation.getParam('animalId', 'NO-ID');
    this.props.animalHeal({id:animalId,total_heal,hp_heal,mp_heal})
  }

  submitFury = () => {
    const animalId = this.props.navigation.getParam('animalId', 'NO-ID');
    this.props.animalFury(animalId,-5)
  }

  submitBonusMalus = (bonus,malus,remove) => {
    const animalId = this.props.navigation.getParam('animalId', 'NO-ID');
    let value = 0
    if(bonus) value = bonus
    else if(malus) value -= malus
    else value = 0
    this.props.animalDefence(animalId,value)
  }

  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    const animalId = navigation.getParam('animalId', 'NO-ID');
    const animal = this.props.animals.find(animal => animal.id == animalId)
    const animal_image = animalsList.animals[animalId].image
    return (
      <LeftRightBar navigation={this.props.navigation} deleteFunction={this.toggleDeleteAnimal}>
        <View style={{
          flex: 1,
          alignItems: 'center',
        }}>

          <View style={{
            flex: 4,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "row"
          }}>
            <View style={{
              width: '30%',
              height: '80%',
              justifyContent: 'space-between',
              alignItems: 'center',

            }}>
            {/*HP*/}
              <Health curr_hp={animal.curr_hp} hp={animal.hp}/>
            </View>


            {/*Parte Centrale Superiore*/}
            <View style={{
              width: '20%',
              height: '90%',
              alignItems: 'center',
            }}>
              {/*Parte Centrale Superiore -- Immagine Eroe*/}
              <View style={{
                width: '100%',
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Thumbnail  source={animal_image} style={{height:'90%',aspectRatio: 1, borderRadius: 999}}/>
              </View>
              {/*Parte Centrale Superiore -- Punti Furia*/}
              <Fury fp={animal.fp} submitFury={this.submitFury} />
            </View>

            {/*Difesa e malus sulla difesa*/}
            <Defence curr_def={animal.curr_def} def={animal.def}/>
          </View>

{/*
          //Parte Status Alterati
          <View style={{
            flex: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "rgba(155,155,155,0.5)"
          }}>
            <View style={{
              flex: 1,
              width: 100,
              height: 100,
              flexGrow: 0,
            }} />
          </View>
*/}

          {/*Parte dei quattro bottoni*/}
          <View style={{
            flex: 4,
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: "row"
          }}>
            <View style={{
              width: '30%',
              height: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
              <View style={{
                width: '100%',
                height: '30%',
              }}>
                <Button block light style = {{ elevation: 0 }}
                  onPress={() => this.toggleDamageModal(!this.state.isDamageVisible)}>
                  <Text>Danno</Text>
                </Button>
                { this.state.isDamageVisible && (
                  <DamagePopup submitDamage={this.submitDamage}
                    toggleFunction={this.toggleDamageModal}
                    isVisible={this.state.isDamageVisible}
                    monster_multiplier={this.props.settings.monster_multiplier}
                  />
                )}
              </View>
              <View style={{
                width: '100%',
                height: '30%',
              }}>
                <Button block light style = {{ elevation: 0 }}
                  onPress={() => this.toggleHealModal(!this.state.isHealVisible)}>
                  <Text>Cura</Text>
                </Button>
                <HealPopup
                  submitHeal={this.submitHeal}
                  toggleFunction={this.toggleHealModal}
                  isVisible={this.state.isHealVisible}
                />
              </View>
            </View>
            <View style={{
              width: '30%',
              height: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
              <View style={{
                width: '100%',
                height: '30%',
              }}>
                <Button block light style = {{ elevation: 0 }}
                  onPress={() => this.toggleBonusMalusModal(!this.state.isBonusMalusVisible)}>
                  <Text>Bonus/Malus</Text>
                </Button>
                <BonusMalusPopup
                  submitBonusMalus={this.submitBonusMalus}
                  toggleFunction={this.toggleBonusMalusModal}
                  isVisible={this.state.isBonusMalusVisible}
                />
              </View>
            </View>
          </View>
        </View>
        { this.state.isDeleteAnimalVisible &&(
          <DeletePopup
            submitFunction={this.deleteAnimal}
            toggleFunction={this.toggleDeleteAnimal}
            isVisible={this.state.isDeleteAnimalVisible}
          />
        )}
      </LeftRightBar>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AnimalScreen);
