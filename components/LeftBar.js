import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { connect } from "react-redux";
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
  renderEntity = (entity, image, key, selected, onClickFunction) => {
    return (
      <TouchableOpacity
        key={entity.id + key}
        activeOpacity={0.7}
        style={{
          flex: 1,
          width: "80%",
          alignItems: "center",
          borderRadius: 7,
          backgroundColor: "black",
          marginHorizontal: "10%",
          marginVertical: "10%",
          overflow: "hidden"
        }}
        onPress={onClickFunction}
      >
        <Image
          source={image}
          style={[
            {
              resizeMode: "cover",
              aspectRatio: 5 / 6,
              width: "100%",
              height: null
            },
            selected ? {} : { opacity: 0.3 }
          ]}
        />
        <View
          style={{
            aspectRatio: 20 / 1,
            width: "100%",
            height: null,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              flex: entity.curr_hp
            }}
          />
          <View
            style={{
              backgroundColor: "black",
              flex: entity.hp - entity.curr_hp
            }}
          />
        </View>
        {entity.mp ? (
          <View
            style={{
              aspectRatio: 20 / 1,
              width: "100%",
              height: null,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                backgroundColor: "#faad14",
                flex: entity.curr_mp
              }}
            />
            <View
              style={{
                backgroundColor: "black",
                flex: entity.mp - entity.curr_mp
              }}
            />
          </View>
        ) : (
          <View />
        )}
        {entity.fp ? (
          <View
            style={[{
              backgroundColor: "#3385ff",
              position: "absolute",
              top: 0,
              right: 0},
              selected ? {} : { opacity: 0.5 }
            ]}
          >
            <Text style={styles.text}> {entity.curr_fp} </Text>
          </View>
        ) : (
          <View />
        )}
        {entity.curr_hp === 0 ? (
          <View style={{ position: "absolute", bottom: 0, left: 0 }}>
            <Text style={{ fontSize: 15 }}>☠️</Text>
          </View>
        ) : (
          <View />
        )}
      </TouchableOpacity>
    );
  };

  renderHeroes = () => {
    const { navigate } = this.props.navigation;
    const heroes = this.props.heroes;
    const selectedHero = this.props.navigation.getParam("heroId");

    return heroes.map(hero => {
      let hero_image = heroesList.heroes[hero.id].head_image;
      return this.renderEntity(
        hero,
        hero_image,
        null,
        hero.id === selectedHero,
        () => {
          navigate("Hero", { heroId: hero.id });
        }
      );
    });
  };

  renderAnimals = () => {
    const { navigate } = this.props.navigation;
    const animals = this.props.animals;
    const selectedAnimal = this.props.navigation.getParam("animalId");

    return animals.map(animal => {
      let animal_image = animalsList.animals[animal.id].image;
      return this.renderEntity(
        animal,
        animal_image,
        null,
        animal.id === selectedAnimal,
        () => {
          navigate("Animal", { animalId: animal.id });
        }
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
      return this.renderEntity(
        monster,
        monster_image,
        i,
        monster.id === selectedMonsterId && i === selectedMonsterKey,
        () => {
          navigate("Monster", { monsterId: monster.id, monsterKey: i });
        }
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
          marginTop: "1%",
        }}
      >
        <View
          style={{
            width: "70%",
            flex: 1,
            backgroundColor: "#F5EFE0",
            borderWidth: 3,
            borderRadius: 5,
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

const styles = StyleSheet.create({
  text: {
    fontSize: 7,
    color: "white"
  }
});

export default connect(mapStateToProps)(LeftBar);
