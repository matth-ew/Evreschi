import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, View } from "native-base";
import RightBarContainer from "../components/RightBarContainer";
import { connect } from "react-redux";
import monstersList from "../components/monsters-list";

import {
  Health,
  Defence,
  DamagePopup,
  HealPopup,
  AlteredStatusPopup,
  DeleteMonsterPopup as DeletePopup,
  DescriptionPopup
} from "./HMComponent";
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
    deleteMonster: (key, options) => dispatch(deleteMonster(key, options)),
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
      isDeleteMonsterVisible: false,
      isDescriptionVisible: false
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
  toggleDeleteMonster = () => {
    this.setState(prevState => ({
      isDeleteMonsterVisible: !prevState.isDeleteMonsterVisible
    }));
  };
  toggleDescriptionModal = visibility => {
    this.setState({ isDescriptionVisible: visibility });
  };

  submitDamage = (dice, multiplier, critical, withoutDefence, poison, burn) => {
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
          this.props.monsterAltered({
            key: monsterKey,
            poisoning: poison,
            burning: null
          });
        }
        if (burn) {
          this.props.monsterAltered({
            key: monsterKey,
            poisoning: null,
            burning: burn
          });
        }

        this.props.monsterDamage(monsterKey, damage);
      }
    }
  };

  
  submitPercentDamage = percent => {
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    const monster = this.props.monsters[monsterKey];
    const damage = Math.ceil((monster.hp * percent) / 100);
    if (damage > 0) {
      this.props.monsterDamage(monsterKey, damage);
    }
  };

  submitPoison = () => {
    this.submitPercentDamage(15)
  };

  submitBurning = () => {
    this.submitPercentDamage(10)
  };


  deleteMonster = options => {
    const { navigate } = this.props.navigation;
    const monsterKey = this.props.navigation.getParam("monsterKey", "NO-ID");
    if (options.deleteAllDead) {
      const monster = this.props.monsters[monsterKey];
      if (monster.curr_hp === 0) navigate("Main");
    }
    if (options.deleteThisMonster) {
      navigate("Main");
    }
    this.props.deleteMonster(monsterKey, options);
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
    const { image, label, description } = monstersList.monsters[monsterId];
    return (
      <RightBarContainer
        navigation={this.props.navigation}
        deleteFunction={this.toggleDeleteMonster}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 4,
              height: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              marginLeft: "10%",
              paddingVertical: "5%"
            }}
          >
            {/*Parte Centrale Superiore -- Immagine Mostro*/}
            <View
              style={{
                width: "60%",
                height: "30%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "row",
                borderWidth: 2,
                borderColor: "#F1C232",
                backgroundColor: "black"
              }}
            >
              <Image
                source={image}
                style={{ height: "100%", width: null, aspectRatio: 1 }}
              />
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "column"
                }}
              >
                <Text style={styles.text}>{label}</Text>
                <Text
                  allowFontScaling={true}
                  numberOfLines={3}
                  style={styles.buttonText}
                >
                  {" "}
                  {description}{" "}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.toggleDescriptionModal(
                      true
                    )
                  }
                >
                  <Text style={styles.buttonText}>Mostra Altro</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                width: "50%",
                alignItems: "flex-start",
                flexDirection: "column",
                paddingBottom: "10%"
              }}
            >
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              >
                <Health
                  curr_hp={monster.curr_hp}
                  hp={monster.hp}
                  poisoning={monster.poisoning}
                  burning={monster.burning}
                  submitPoison={this.submitPoison}
                  submitBurning={this.submitBurning}
                />
              </View>
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              >
                <Defence
                  curr_def={monster.curr_def}
                  def={monster.def}
                  submitBonusMalus={this.submitBonusMalus}
                />
              </View>
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              />
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              />
            </View>
          </View>
          {/*Parte dei quattro bottoni*/}
          <View
            style={{
              flex: 1,
              height: "100%",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Button
              block
              style={styles.button}
              onPress={() =>
                this.toggleDamageModal(!this.state.isDamageVisible)
              }
            >
              <Text style={styles.buttonText}>Attacco</Text>
            </Button>

            <Button
              block
              style={styles.button}
              onPress={() => this.toggleHealModal(!this.state.isHealVisible)}
            >
              <Text style={styles.buttonText}>Cura</Text>
            </Button>

            <Button
              block
              style={styles.button}
              onPress={() =>
                this.toggleAlteredStatusModal(
                  !this.state.isAlteredStatusVisible
                )
              }
            >
              <Text style={styles.buttonText}>Status Alterati</Text>
            </Button>
          </View>
        </View>
        {this.state.isDamageVisible && (
          <DamagePopup
            submitDamage={this.submitDamage}
            toggleFunction={this.toggleDamageModal}
            isVisible={this.state.isDamageVisible}
            poison_burning
          />
        )}
        {this.state.isAlteredStatusVisible && (
          <AlteredStatusPopup
            poisoning={monster.poisoning}
            burning={monster.burning}
            submitAltered={this.submitAltered}
            toggleFunction={this.toggleAlteredStatusModal}
            isVisible={this.state.isAlteredStatusVisible}
          />
        )}
        <HealPopup
          submitHeal={this.submitHeal}
          toggleFunction={this.toggleHealModal}
          isVisible={this.state.isHealVisible}
        />

        {this.state.isDeleteMonsterVisible && (
          <DeletePopup
            curr_hp={monster.curr_hp}
            submitFunction={this.deleteMonster}
            toggleFunction={this.toggleDeleteMonster}
            isVisible={this.state.isDeleteMonsterVisible}
          />
        )}
        {this.state.isDescriptionVisible && (
          <DescriptionPopup
            title={label}
            description={description}
            toggleFunction={this.toggleDescriptionModal}
            isVisible={this.state.isDescriptionVisible}
          />
        )}
      </RightBarContainer>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderWidth: 2,
    height: "10%",
    borderColor: "#F1C232"
  },
  text: {
    fontSize: 15,
    color: "white"
  },
  buttonText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MonsterScreen);
