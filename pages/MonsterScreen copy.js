import React from "react";
import { TouchableOpacity } from "react-native";
import { Thumbnail, Button, Text, View } from "native-base";
import LeftRightBar from "../components/LeftRightBar";
import { connect } from "react-redux";
import monstersList from "../components/monsters-list";
import Health from "./HMComponent/Health";
import Defence from "./HMComponent/Defence";
import DamagePopup from "./HMComponent/DamagePopup";
import DeletePopup from "./HMComponent/DeleteMonsterPopup";
import HealPopup from "./HMComponent/HealPopup";
import AlteredStatusPopup from "./HMComponent/AlteredStatusPopup";
import BonusMalusPopup from "./HMComponent/BonusMalusPopup";
import {
  deleteMonster,
  monsterDamage,
  monsterHeal,
  monsterDefence,
  monsterAltered
} from "../redux/actions/act-monsters";

const mapStateToProps = state => {
  return {
    monsters: state.Monsters,
    settings: state.Settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMonster: (key,deleteAllDead) => dispatch(deleteMonster(key,deleteAllDead)),
    monsterDamage: (id, damage) => dispatch(monsterDamage(id, damage)),
    monsterHeal: monster_heal => dispatch(monsterHeal(monster_heal)),
    monsterAltered: monster_altered =>
      dispatch(monsterAltered(monster_altered)),
    monsterDefence: (id, value) => dispatch(monsterDefence(id, value))
  };
};

class MonsterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDamageVisible: false,
      isHealVisible: false,
      isAlteredStatusVisible: false,
      isBonusMalusVisible: false,
      isDeleteMonsterVisible: false
    };
  }

  toggleDamageModal = visibility => {
    this.setState({ isDamageVisible: visibility });
  };
  toggleHealModal = visibility => {
    this.setState({ isHealVisible: visibility });
  };
  toggleAlteredStatusModal = visibility => {
    this.setState({ isAlteredStatusVisible: visibility });
  };
  toggleBonusMalusModal = visibility => {
    this.setState({ isBonusMalusVisible: visibility });
  };

  toggleDeleteMonster = () => {
    this.setState(prevState => ({
      isDeleteMonsterVisible: !prevState.isDeleteMonsterVisible
    }));
  };

  submitDamage = (
    dice,
    multiplier,
    critical,
    withoutDefence,
    poison,
    burn,
  ) => {
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    const monster = this.props.monsters[monsterKey];

    let damage = 0;
    if (dice) {
      //DANNO DA ATTACCO SUBITO
      if (!withoutDefence) damage = dice - monster.curr_def;
      else damage = dice;

      if (critical) damage *= 2;

      if (damage > 0) {
        if (poison) {
          this.props.monsterAltered({ key: monsterKey, poisoning: poison, burning: null });
        }
        if (burn) {
          this.props.monsterAltered({ key: monsterKey, poisoning: null, burning: burn }); 
        }

        this.props.monsterDamage(monsterKey, damage);
      }
    }
  };

  submitPoison = () => {
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    const monster = this.props.monsters[monsterKey];
    const damage = Math.ceil((monster.hp * 10) / 100);
    if (damage > 0) {
      this.props.monsterDamage(monsterKey, damage);
    }
  };

  submitBurning = () => {
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    const monster = this.props.monsters[monsterKey];
    const damage = Math.ceil((monster.hp * 15) / 100);
    if (damage > 0) {
      this.props.monsterDamage(monsterKey, damage);
    }
  };

  deleteMonster = (deleteAllDead) => {
    const { navigate } = this.props.navigation;
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    navigate("Main");
    this.props.deleteMonster(monsterKey,deleteAllDead);
  };

  submitHeal = (total_heal, half_heal, hp_heal, mp_heal) => {
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    this.props.monsterHeal({ key: monsterKey, total_heal, hp_heal, mp_heal });
  };

  submitAltered = (poisoning, burning, bleeding) => {
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    this.props.monsterAltered({ key: monsterKey, poisoning, burning });
  };

  submitBonusMalus = (bonus, malus, remove) => {
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    let value = 0;
    if (bonus) value = bonus;
    else if (malus) value -= malus;
    else value = 0;
    this.props.monsterDefence(monsterKey, value);
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const monsterId = navigation.getParam("monsterId", "NO-ID");
    const monsterKey = navigation.getParam("monsterKey", "NO-ID");
    const monster = this.props.monsters[monsterKey];
    const monster_image = monstersList.monsters[monsterId].image;
    return (
      <LeftRightBar
        navigation={this.props.navigation}
        deleteFunction={this.toggleDeleteMonster}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 4,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                width: "30%",
                height: "80%",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {/*HP, veleno e bruciatura*/}
              <Health
                curr_hp={monster.curr_hp}
                hp={monster.hp}
                poisoning={monster.poisoning}
                burning={monster.burning}
              />
            </View>

            {/*Parte Centrale Superiore*/}
            <View
              style={{
                width: "20%",
                height: "90%",
                alignItems: "center"
              }}
            >
              {/*Parte Centrale Superiore -- Immagine Eroe*/}
              <View
                style={{
                  width: "100%",
                  height: "70%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Thumbnail
                  source={monster_image}
                  style={{ height: "90%", aspectRatio: 1, borderRadius: 999 }}
                />
              </View>
              {/*Parte Centrale Superiore -- Punti Furia e Sanguinamento*/}
            </View>

            {/*Difesa e malus sulla difesa*/}
            <Defence curr_def={monster.curr_def} def={monster.def} />
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
          <View
            style={{
              flex: 4,
              width: "100%",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                width: "30%",
                height: "100%",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "30%"
                }}
              >
                <Button
                  block
                  light
                  style={{ elevation: 0 }}
                  onPress={() =>
                    this.toggleDamageModal(!this.state.isDamageVisible)
                  }
                >
                  <Text>Danno</Text>
                </Button>
                {this.state.isDamageVisible && (
                  <DamagePopup
                    submitDamage={this.submitDamage}
                    toggleFunction={this.toggleDamageModal}
                    isVisible={this.state.isDamageVisible}
                    poison_burning
                  />
                )}
              </View>
              <View
                style={{
                  width: "100%",
                  height: "30%"
                }}
              >
                <Button
                  block
                  light
                  style={{ elevation: 0 }}
                  onPress={() =>
                    this.toggleHealModal(!this.state.isHealVisible)
                  }
                >
                  <Text>Cura</Text>
                </Button>
                <HealPopup
                  submitHeal={this.submitHeal}
                  toggleFunction={this.toggleHealModal}
                  isVisible={this.state.isHealVisible}
                />
              </View>
            </View>
            <View
              style={{
                width: "30%",
                height: "100%",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "30%"
                }}
              >
                <Button
                  block
                  light
                  style={{ elevation: 0 }}
                  onPress={() =>
                    this.toggleAlteredStatusModal(
                      !this.state.isAlteredStatusVisible
                    )
                  }
                >
                  <Text>Status Alterati</Text>
                </Button>
                {this.state.isAlteredStatusVisible && (
                  <AlteredStatusPopup
                    poisoning={monster.poisoning}
                    burning={monster.burning}
                    submitAltered={this.submitAltered}
                    toggleFunction={this.toggleAlteredStatusModal}
                    isVisible={this.state.isAlteredStatusVisible}
                  />
                )}
              </View>
              <View
                style={{
                  width: "100%",
                  height: "30%"
                }}
              >
                <Button
                  block
                  light
                  style={{ elevation: 0 }}
                  onPress={() =>
                    this.toggleBonusMalusModal(!this.state.isBonusMalusVisible)
                  }
                >
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
        {this.state.isDeleteMonsterVisible && (
          <DeletePopup
            submitFunction={this.deleteMonster}
            toggleFunction={this.toggleDeleteMonster}
            isVisible={this.state.isDeleteMonsterVisible}
          />
        )}
      </LeftRightBar>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MonsterScreen);
