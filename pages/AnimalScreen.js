import React from "react";
import { Image, StyleSheet } from "react-native";
import { Button, Text, View } from "native-base";
import LeftRightBar from "../components/LeftRightBar";
import { connect } from "react-redux";
import animalsList from "../components/animals-list";
import Health from "./HMComponent/Health";
import Defence from "./HMComponent/Defence";
import Fury from "./HMComponent/Fury";
import DamagePopup from "./HMComponent/DamagePopup";
import HealPopup from "./HMComponent/HealPopup";
import DeletePopup from "./HMComponent/DeletePopup";
import {
  deleteAnimal,
  animalDamage,
  animalHeal,
  animalFury,
  animalDefence
} from "../redux/actions/act-animals";

const mapStateToProps = state => {
  return {
    animals: state.Animals,
    settings: state.Settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteAnimal: (id, options) => dispatch(deleteAnimal(id, options)),
    animalDamage: (id, damage) => dispatch(animalDamage(id, damage)),
    animalHeal: animal_heal => dispatch(animalHeal(animal_heal)),
    animalFury: (id, value) => dispatch(animalFury(id, value)),
    animalDefence: (id, value) => dispatch(animalDefence(id, value))
  };
};

class AnimalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDamageVisible: false,
      isHealVisible: false,
      isDeleteAnimalVisible: false
    };
  }

  toggleDamageModal = visibility => {
    this.setState({ isDamageVisible: visibility });
  };
  toggleFuryModal = visibility => {
    this.setState({ isFuryVisible: visibility });
  };
  toggleHealModal = visibility => {
    this.setState({ isHealVisible: visibility });
  };

  toggleDeleteAnimal = () => {
    this.setState(prevState => ({
      isDeleteAnimalVisible: !prevState.isDeleteAnimalVisible
    }));
  };

  submitDamage = (dice, multiplier, critical, withoutDefence) => {
    const animalId = this.props.navigation.getParam("animalId", "NO-ID");
    const animal = this.props.animals.find(animal => animal.id == animalId);

    let damage = 0;
    if (dice) {
      //DANNO DA ATTACCO SUBITO
      if (!withoutDefence) damage = (dice - animal.curr_def) * multiplier;
      else damage = dice * multiplier;

      if (critical) damage *= 2;
      //INCREMENTO DI 1 LE FURIE
      this.props.animalFury(animalId, 1);

      if (damage > 0) {
        this.props.animalDamage(animalId, damage);
      }
    }
  };

  deleteAnimal = options => {
    const { navigate } = this.props.navigation;
    const animalId = this.props.navigation.getParam("animalId", "NO-ID");
    if (options.deleteThisEntity) {
      navigate("Main");
    }
    this.props.deleteAnimal(animalId, options);
  };

  submitHeal = (total_heal, half_heal, hp_heal) => {
    const animalId = this.props.navigation.getParam("animalId", "NO-ID");
    this.props.animalHeal({ id: animalId, total_heal, half_heal, hp_heal });
  };

  handleFury = val => {
    const animalId = this.props.navigation.getParam("animalId", "NO-ID");
    this.props.animalFury(animalId, val);
  };

  submitFury = () => {
    const animalId = this.props.navigation.getParam("animalId", "NO-ID");
    this.props.animalFury(animalId, -4);
  };

  submitBonusMalus = (bonus, malus, remove) => {
    const animalId = this.props.navigation.getParam("animalId", "NO-ID");
    let value = 0;
    if (bonus) value = bonus;
    else if (malus) value -= malus;
    else value = 0;
    this.props.animalDefence(animalId, value);
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const animalId = navigation.getParam("animalId", "NO-ID");
    const animal = this.props.animals.find(animal => animal.id == animalId);
    const { image, label } = animalsList.animals[animalId];
    return (
      <LeftRightBar
        navigation={this.props.navigation}
        deleteFunction={this.toggleDeleteAnimal}
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
            {/*Parte Centrale Superiore -- Immagine Animale*/}
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
                <Text style={styles.buttonText}> --Descrizione </Text>
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
                <Health curr_hp={animal.curr_hp} hp={animal.hp} />
              </View>
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              >
                <Defence
                  curr_def={animal.curr_def}
                  def={animal.def}
                  submitBonusMalus={this.submitBonusMalus}
                />
              </View>
              <View
                style={{ flex: 1, paddingTop: "10%", flexDirection: "row" }}
              >
                <Fury
                  fp={animal.fp}
                  max_fp={4}
                  submitFury={this.submitFury}
                  handleFury={this.handleFury}
                />
              </View>
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
          </View>
        </View>

        {this.state.isDamageVisible && (
          <DamagePopup
            submitDamage={this.submitDamage}
            toggleFunction={this.toggleDamageModal}
            isVisible={this.state.isDamageVisible}
            monster_multiplier={this.props.settings.monster_multiplier}
          />
        )}

        <HealPopup
          submitHeal={this.submitHeal}
          toggleFunction={this.toggleHealModal}
          isVisible={this.state.isHealVisible}
        />

        {this.state.isDeleteAnimalVisible && (
          <DeletePopup
            curr_hp={animal.curr_hp}
            submitFunction={this.deleteAnimal}
            toggleFunction={this.toggleDeleteAnimal}
            isVisible={this.state.isDeleteAnimalVisible}
          />
        )}
      </LeftRightBar>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnimalScreen);
