import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Button, Text } from "native-base";
import RightBarContainer from "../components/RightBarContainer";
import { connect } from "react-redux";
import heroesList from "../components/heroes-list";
import {
  Health,
  Defence,
  Mana,
  Fury,
  DamagePopup,
  HealPopup,
  AlteredStatusPopup,
  EditHeroPopup,
  AddAnimalPopup,
  DeletePopup,
  DescriptionPopup
} from "./HMComponent";
import {
  changeHero,
  deleteHero,
  heroDamage,
  heroMana,
  heroHeal,
  heroFury,
  heroDefence,
  heroAltered
} from "../redux/actions/act-heroes";

const mapStateToProps = state => {
  return {
    heroes: state.Heroes,
    settings: state.Settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeHero: hero => dispatch(changeHero(hero)),
    deleteHero: (id, options) => dispatch(deleteHero(id, options)),
    heroDamage: (id, damage) => dispatch(heroDamage(id, damage)),
    heroMana: (id, value) => dispatch(heroMana(id, value)),
    heroHeal: hero_heal => dispatch(heroHeal(hero_heal)),
    heroAltered: hero_altered => dispatch(heroAltered(hero_altered)),
    heroFury: (id, value) => dispatch(heroFury(id, value)),
    heroDefence: (id, value) => dispatch(heroDefence(id, value))
  };
};

class HeroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDamageVisible: false,
      isHealVisible: false,
      isAlteredStatusVisible: false,
      isEditHeroVisible: false,
      isAnimalVisible: false,
      isDeleteHeroVisible: false,
      isDescriptionVisible: false
    };
  }

  toggleDescriptionModal = visibility => {
    this.setState({ isDescriptionVisible: visibility });
  };
  toggleDamageModal = visibility => {
    this.setState({ isDamageVisible: visibility });
  };
  toggleFuryModal = visibility => {
    this.setState({ isFuryVisible: visibility });
  };
  toggleHealModal = visibility => {
    this.setState({ isHealVisible: visibility });
  };
  toggleAlteredStatusModal = visibility => {
    this.setState({ isAlteredStatusVisible: visibility });
  };

  toggleEditHero = () => {
    this.setState(prevState => ({
      isEditHeroVisible: !prevState.isEditHeroVisible
    }));
  };

  toggleDeleteHero = () => {
    this.setState(prevState => ({
      isDeleteHeroVisible: !prevState.isDeleteHeroVisible
    }));
  };

  toggleAnimal = () => {
    this.setState(prevState => ({
      isAnimalVisible: !prevState.isAnimalVisible
    }));
  };

  submitEditHero = (heroHp, heroMp, heroDef) => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    this.props.changeHero({ id: heroId, heroHp, heroMp, heroDef });
  };

  submitDamage = (
    dice,
    multiplier,
    critical,
    withoutDefence,
    poison,
    burn,
    bleeding
  ) => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    const hero = this.props.heroes.find(hero => hero.id == heroId);

    let damage = 0;
    if (dice) {
      //DANNO DA ATTACCO SUBITO
      if (!withoutDefence) damage = (dice - hero.curr_def) * multiplier;
      else damage = dice * multiplier;

      if (critical) damage *= 2;
      //INCREMENTO DI 1 LE FURIE SE NON HO SANGUINAMENTO, ALTRIMENTI DECREMENTO
      if (hero.bleeding) this.props.heroFury(heroId, -1);
      else if (!bleeding) this.props.heroFury(heroId, 1);

      if (damage > 0) {
        if (poison) {
          this.props.heroAltered({
            id: heroId,
            poisoning: poison,
            burning: null,
            bleeding: null
          });
        }
        if (burn) {
          this.props.heroAltered({
            id: heroId,
            poisoning: null,
            burning: burn,
            bleeding: null
          });
        }
        if (bleeding) {
          this.props.heroAltered({
            id: heroId,
            poisoning: null,
            burning: null,
            bleeding: bleeding
          });
        }

        this.props.heroDamage(heroId, damage);
      }
    }
  };

  deleteHero = options => {
    const { navigate } = this.props.navigation;
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    if (options.deleteThisEntity) {
      navigate("Main");
    }
    this.props.deleteHero(heroId, options);
  };

  submitPercentDamage = percent => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    const hero = this.props.heroes.find(hero => hero.id == heroId);
    const damage = Math.ceil((hero.hp * percent) / 100);
    if (damage > 0) {
      this.props.heroDamage(heroId, damage);
    }
  };

  submitPoison = () => {
    this.submitPercentDamage(15)
  };

  submitBurning = () => {
    this.submitPercentDamage(10)
  };

  handleFury = val => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    this.props.heroFury(heroId, val);
  };

  submitMana = mp_using => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    this.props.heroMana(heroId, mp_using);
  };

  submitHeal = (total_heal, half_heal, hp_heal, mp_heal) => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    this.props.heroHeal({
      id: heroId,
      total_heal,
      half_heal,
      hp_heal,
      mp_heal
    });
  };

  submitAltered = (poisoning, burning, bleeding) => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    this.props.heroAltered({ id: heroId, poisoning, burning, bleeding });
  };

  submitFury = () => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    this.props.heroFury(heroId, -5);
  };

  submitBonusMalus = (bonus, malus, remove) => {
    const heroId = this.props.navigation.getParam("heroId", "NO-ID");
    let value = 0;
    if (bonus) value = bonus;
    else if (malus) value -= malus;
    else value = 0;
    this.props.heroDefence(heroId, value);
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const heroId = navigation.getParam("heroId", "NO-ID");
    const hero = this.props.heroes.find(hero => hero.id == heroId);
    const { image, label, subclass, description } = heroesList.heroes[heroId];
    return (
      <RightBarContainer
        navigation={this.props.navigation}
        editFunction={this.toggleEditHero}
        deleteFunction={this.toggleDeleteHero}
        animalFunction={subclass === "Ranger" ? this.toggleAnimal : undefined}
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
            {/*Parte Centrale Superiore -- Immagine Eroe*/}
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
                style={{
                  height: "100%",
                  resizeMode: "contain",
                  width: null,
                  aspectRatio: 1,
                  backgroundColor: "white"
                }}
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
                <Text style={styles.text}>
                  {label}, {subclass}
                </Text>
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
                  curr_hp={hero.curr_hp}
                  hp={hero.hp}
                  submitPercentDamage={
                    subclass === "Berserker"
                      ? this.submitPercentDamage
                      : undefined
                  }
                  poisoning={hero.poisoning}
                  burning={hero.burning}
                  submitPoison={this.submitPoison}
                  submitBurning={this.submitBurning}
                />
              </View>
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              >
                <Mana
                  curr_mp={hero.curr_mp}
                  mp={hero.mp}
                  submitMana={this.submitMana}
                />
              </View>
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              >
                <Defence
                  curr_def={hero.curr_def}
                  def={hero.def}
                  submitBonusMalus={this.submitBonusMalus}
                />
              </View>
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              >
                <Fury
                  fp={hero.curr_fp}
                  max_fp={hero.fp}
                  submitFury={this.submitFury}
                  handleFury={this.handleFury}
                  bleeding={hero.bleeding}
                />
              </View>
            </View>
          </View>

          {/*Parte dei tre bottoni*/}
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
            monster_multiplier={this.props.settings.monster_multiplier}
            poison_burning
            bleeding
          />
        )}
        {this.state.isAlteredStatusVisible && (
          <AlteredStatusPopup
            bleeding={hero.bleeding}
            poisoning={hero.poisoning}
            burning={hero.burning}
            submitAltered={this.submitAltered}
            toggleFunction={this.toggleAlteredStatusModal}
            isVisible={this.state.isAlteredStatusVisible}
          />
        )}
        <HealPopup
          submitHeal={this.submitHeal}
          toggleFunction={this.toggleHealModal}
          isVisible={this.state.isHealVisible}
          mana
        />

        {this.state.isEditHeroVisible && (
          <EditHeroPopup
            heroHp={hero.hp.toString()}
            heroMp={hero.mp.toString()}
            heroDef={hero.def.toString()}
            submitEditHero={this.submitEditHero}
            toggleFunction={this.toggleEditHero}
            isVisible={this.state.isEditHeroVisible}
          />
        )}
        {this.state.isDeleteHeroVisible && (
          <DeletePopup
            hero={true}
            curr_hp={hero.curr_hp}
            submitFunction={this.deleteHero}
            toggleFunction={this.toggleDeleteHero}
            isVisible={this.state.isDeleteHeroVisible}
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
        <AddAnimalPopup
          toggleFunction={this.toggleAnimal}
          isVisible={this.state.isAnimalVisible}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(HeroScreen);
