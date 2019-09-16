import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Thumbnail,Button, Text, View} from 'native-base'
import LeftRightBar from '../components/LeftRightBar'
import {connect} from "react-redux";
import heroesList from '../components/heroes-list'
import Health from './HMComponent/Health'
import Defence from './HMComponent/Defence'
import Mana from './HMComponent/Mana'
import Fury from './HMComponent/Fury'
import DamagePopup from './HMComponent/DamagePopup'
import HealPopup from './HMComponent/HealPopup'
import AlteredStatusPopup from './HMComponent/AlteredStatusPopup'
import BonusMalusPopup from './HMComponent/BonusMalusPopup'
import EditHeroPopup from './HMComponent/EditHeroPopup'
import AddAnimalPopup from './HMComponent/AddAnimalPopup'
import DeletePopup from './HMComponent/DeletePopup'
import {changeHero,deleteHero,heroDamage,heroMana,heroHeal,heroFury,heroDefence,heroAltered} from '../redux/actions/act-heroes'

const mapStateToProps = state => {
  return {
    heroes: state.Heroes,
    settings: state.Settings,
   };
};

const mapDispatchToProps = dispatch => {
  return {
    changeHero: hero => dispatch(changeHero(hero)),
    deleteHero: id => dispatch(deleteHero(id)),
    heroDamage: (id,damage) => dispatch(heroDamage(id,damage)),
    heroMana: (id,value) => dispatch(heroMana(id,value)),
    heroHeal: (hero_heal) => dispatch(heroHeal(hero_heal)),
    heroAltered: (hero_altered) => dispatch(heroAltered(hero_altered)),
    heroFury: (id,value) => dispatch(heroFury(id,value)),
    heroDefence: (id,value) => dispatch(heroDefence(id,value)),
  };
};

class HeroScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isDamageVisible: false,
      isHealVisible: false,
      isAlteredStatusVisible: false,
      isBonusMalusVisible: false,
      isEditHeroVisible: false,
      isAnimalVisible: false,
      isDeleteHeroVisible: false,
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
  toggleAlteredStatusModal = (visibility) => {
    this.setState({isAlteredStatusVisible: visibility})
  }
  toggleBonusMalusModal = (visibility) => {
    this.setState({isBonusMalusVisible: visibility})
  }
  toggleEditHero = () => {
    this.setState(prevState => ({
        isEditHeroVisible: !prevState.isEditHeroVisible
      })
    )
  }

  toggleDeleteHero = () => {
    this.setState(prevState => ({
        isDeleteHeroVisible: !prevState.isDeleteHeroVisible
      })
    )
  }

  toggleAnimal = () => {
    this.setState(prevState => ({
        isAnimalVisible: !prevState.isAnimalVisible
      })
    )
  }

  submitEditHero = (heroHp,heroMp,heroDef) => {
    const heroId = this.props.navigation.getParam('heroId', 'NO-ID');
    this.props.changeHero({id:heroId,heroHp,heroMp,heroDef})
  }

  submitDamage = (dice,multiplier,critical,poison,burn) => {
    const heroId = this.props.navigation.getParam('heroId', 'NO-ID');
    const hero = this.props.heroes.find(hero => hero.id == heroId)

    let damage = 0;
    if(dice){
      //DANNO DA ATTACCO SUBITO
      damage = (dice-hero.curr_def)*multiplier
      if(critical) damage *= 2
      //INCREMENTO DI 1 LE FURIE SE NON HO SANGUINAMENTO
      if(!hero.bleeding) this.props.heroFury(heroId,1)
    }
    else{
      //DANNO DA VELENO E/O BRUCIATURA
      if(burn)
        damage = Math.ceil((hero.hp*10)/100)
      if(poison)
        damage += Math.ceil((hero.hp*15)/100)
    }

    if(damage > 0){
      this.props.heroDamage(heroId,damage)
    }
  }

  deleteHero = () => {
    const {navigate} = this.props.navigation;
    const heroId = this.props.navigation.getParam('heroId', 'NO-ID');
    navigate('Main');
    this.props.deleteHero(heroId);
  }

  submitMana = (mp_using) => {
    const heroId = this.props.navigation.getParam('heroId', 'NO-ID');
    this.props.heroMana(heroId,mp_using)
  }

  submitHeal = (total_heal,hp_heal,mp_heal) => {
    const heroId = this.props.navigation.getParam('heroId', 'NO-ID');
    this.props.heroHeal({id:heroId,total_heal,hp_heal,mp_heal})
  }

  submitAltered = (poisoning,burning,bleeding) => {
    const heroId = this.props.navigation.getParam('heroId', 'NO-ID');
    this.props.heroAltered({id:heroId,poisoning,burning,bleeding})
  }

  submitFury = () => {
    const heroId = this.props.navigation.getParam('heroId', 'NO-ID');
    this.props.heroFury(heroId,-5)
  }

  submitBonusMalus = (bonus,malus,remove) => {
    const heroId = this.props.navigation.getParam('heroId', 'NO-ID');
    let value = 0
    if(bonus) value = bonus
    else if(malus) value -= malus
    else value = 0
    this.props.heroDefence(heroId,value)


  }

  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    const heroId = navigation.getParam('heroId', 'NO-ID');
    const hero = this.props.heroes.find(hero => hero.id == heroId)
    const hero_image = heroesList.heroes[heroId].image
    return (
      <LeftRightBar navigation={this.props.navigation} editFunction={this.toggleEditHero} deleteFunction={this.toggleDeleteHero} animalFunction={(heroId == 'hero-3') ? this.toggleAnimal : undefined}>
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
            {/*HP, veleno e bruciatura*/}
              <Health curr_hp={hero.curr_hp} hp={hero.hp} poisoning={hero.poisoning} burning={hero.burning}/>
            {/*MP*/}
              <Mana curr_mp={hero.curr_mp} mp={hero.mp} submitMana={this.submitMana}/>
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
                <Thumbnail  source={hero_image} style={{height:'90%',aspectRatio: 1, borderRadius: 999}}/>
              </View>
              {/*Parte Centrale Superiore -- Punti Furia e Sanguinamento*/}
              <Fury fp={hero.fp} submitFury={this.submitFury} bleeding={hero.bleeding}/>
            </View>

            {/*Difesa e malus sulla difesa*/}
            <Defence curr_def={hero.curr_def} def={hero.def}/>
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
                  poison_burning
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
                  mana
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
                  onPress={() => this.toggleAlteredStatusModal(!this.state.isAlteredStatusVisible)}>
                  <Text>Status Alterati</Text>
                </Button>
                {this.state.isAlteredStatusVisible&& (
                  <AlteredStatusPopup
                    bleeding={hero.bleeding} poisoning={hero.poisoning} burning={hero.burning}
                    submitAltered={this.submitAltered}
                    toggleFunction={this.toggleAlteredStatusModal}
                    isVisible={this.state.isAlteredStatusVisible}/>
                )}
              </View>
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
        { this.state.isEditHeroVisible &&(
          <EditHeroPopup
            heroHp={hero.hp.toString()} heroMp={hero.mp.toString()} heroDef={hero.def.toString()}
            submitEditHero={this.submitEditHero}
            toggleFunction={this.toggleEditHero}
            isVisible={this.state.isEditHeroVisible}
          />
        )}
        { this.state.isDeleteHeroVisible &&(
          <DeletePopup
            submitFunction={this.deleteHero}
            toggleFunction={this.toggleDeleteHero}
            isVisible={this.state.isDeleteHeroVisible}
          />
        )}
        <AddAnimalPopup
          toggleFunction={this.toggleAnimal}
          isVisible={this.state.isAnimalVisible}
        />

      </LeftRightBar>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeroScreen);
