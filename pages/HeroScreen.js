import React from 'react';
import {} from 'react-native';
import {Thumbnail,Button, Text, View} from 'native-base'
import LeftRightBar from '../components/LeftRightBar'
import {connect} from "react-redux";
import heroesList from '../pages/AddEntityComponent/heroes-list'
//import {addHero} from '../../redux/actions/act-heroes'

const mapStateToProps = state => {
  return {
    heroes: state.Heroes,
   };
};

const mapDispatchToProps = dispatch => {
  return {
    //addHero: hero => dispatch(addHero(hero)),
  };
};

class HeroScreen extends React.Component {

  editFunction = () => {
    //APRE IL MODAL PER MODIFICARE L'EROE!
    console.log("EDIT")
  }
  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    const heroId = navigation.getParam('heroId', 'NO-ID');
    const hero = this.props.heroes.find(hero => hero.id == heroId)
    const hero_image = heroesList.heroes[heroId].image
    return (
      <LeftRightBar navigation={this.props.navigation} editFunction={this.editFunction}>
        <View style={{
          flex: 1,
          alignItems: 'center',
        }}>

          <View style={{
            flex: 4,
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: "rgba(0,0,0,0.5)",
            flexDirection: "row"
          }}>
            <View style={{
              width: '30%',
              height: '80%',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: "rgba(255,0,0,0.5)"
            }}>
              <View style={{
                width: '100%',
                height: '30%',
                backgroundColor: "rgba(0,255,0,0.5)"
              }} />
              <View style={{
                width: '100%',
                height: '30%',
                backgroundColor: "rgba(0,255,0,0.5)"
              }} />
            </View>
            <View style={{
              width: '30%',
              height: '90%',
              alignItems: 'center',
              backgroundColor: "rgba(255,0,0,0.5)"
            }}>
              {/*Parte Centrale Superiore -- Immagine Eroe*/}
              <View style={{
                width: '100%',
                height: '70%',
                backgroundColor: "rgba(0,255,0,0.5)",
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Thumbnail  source={hero_image} style={{height:'100%',aspectRatio: 1, borderRadius: 999}}  large/>
              </View>
              <View style={{
                width: '100%',
                height: '30%',
                backgroundColor: "rgba(0,0,255,0.5)",
              }} />
            </View>
            <View style={{
              width: '30%',
              height: '80%',
              justifyContent: 'flex-start',
              backgroundColor: "rgba(255,0,0,0.5)"
            }}>
              <View style={{
                width: '100%',
                height: '30%',
                backgroundColor: "rgba(0,255,0,0.5)"
              }} />
            </View>
          </View>


          {/*Parte Status Alterati*/}
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
                <Button block light
                  onPress={() => console.log("DANNO")}>
                  <Text>Danno</Text>
                </Button>
              </View>
              <View style={{
                width: '100%',
                height: '30%',
              }}>
                <Button block light
                  onPress={() => console.log("CURA")}>
                  <Text>Cura</Text>
                </Button>
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
                <Button block light
                  onPress={() => console.log("STATUS")}>
                  <Text>Status Alterati</Text>
                </Button>
              </View>
              <View style={{
                width: '100%',
                height: '30%',
              }}>
                <Button block light
                  onPress={() => console.log("BONUS/MALUS")}>
                  <Text>Bonus/Malus</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </LeftRightBar>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeroScreen);
