import React from "react";
import {
  View,
  ScrollView,
  PanResponder,
} from "react-native";
import { Avatar } from "react-native-elements";
import { connect } from "react-redux";
import Entity from "./Entity";
import heroesList from "./heroes-list";
import monstersList from "./monsters-list";
import animalsList from "./animals-list";

const mapStateToProps = state => {
  return {
    heroes: state.Heroes,
    animals: state.Animals,
    monsters: state.Monsters
  };
};

class LeftBar extends React.PureComponent {

  
  renderHeroes = () => {
    const { navigate } = this.props.navigation;
    const heroes = this.props.heroes;
    const selectedHero = this.props.navigation.getParam("heroId");

    return heroes.map(hero => {
      let hero_image = heroesList.heroes[hero.id].head_image;
      return (
        <Entity
          entity={hero}
          key={hero.id}
          image={hero_image}
          keyProp={null}
          selected={hero.id === selectedHero}
          onClickFunction={() => {
            navigate("Hero", { heroId: hero.id });
          }}
        />
      );
    });
  };

  renderAnimals = () => {
    const { navigate } = this.props.navigation;
    const animals = this.props.animals;
    const selectedAnimal = this.props.navigation.getParam("animalId");

    return animals.map(animal => {
      let animal_image = animalsList.animals[animal.id].image;
      return (
        <Entity
          entity={animal}
          key={animal.id}
          image={animal_image}
          keyProp={null}
          selected={animal.id === selectedAnimal}
          onClickFunction={() => {
            navigate("Animal", { animalId: animal.id });
          }}
        />
      );
    });
  };

  renderMonsters = () => {
    const { navigate } = this.props.navigation;
    const monsters = this.props.monsters;
    const selectedMonsterId = this.props.navigation.getParam("monsterId");
    const selectedMonsterKey = this.props.navigation.getParam("monsterKey");

    return monsters.map((monster, i) => {
      let monster_image = monstersList.monsters[monster.id].image;
      return (
        <Entity
          entity={monster}
          key={monster.id + i}
          image={monster_image}
          keyProp={i}
          selected={
            monster.id === selectedMonsterId && i === selectedMonsterKey
          }
          onClickFunction={() => {
            navigate("Monster", { monsterId: monster.id, monsterKey: i });
          }}
        />
      );
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          width: "10%",
          height: "95%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1%"
        }}
      >
        <View
          style={{
            width: "90%",
            flex: 1,
            backgroundColor: "#F5EFE0",
            borderWidth: 3,
            borderRadius: 10,
            borderColor: "#F1C232",
            overflow: "hidden"
          }}
        >
          <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            {this.renderHeroes()}
            {this.renderAnimals()}
            {this.renderMonsters()}
          </ScrollView>
        </View>
        <Avatar
          size="small"
          overlayContainerStyle={{ backgroundColor: "white" }}
          onPress={() => {
            navigate("AddEntity");
          }}
          activeOpacity={0.7}
          rounded
          containerStyle={{ marginVertical: 6 }}
          icon={{
            name: "plus",
            color: "grey",
            type: "material-community",
            size: 35
          }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(LeftBar);
