import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Button, Icon } from "react-native-elements";
import {
  Text,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab,
  View,
  H2
} from "native-base";
import LeftRightBar from "../../components/LeftRightBar";
import AddMonsterPopup from "./AddMonsterPopup";
import monstersList from "../../components/monsters-list";
import { connect } from "react-redux";
import { addMonster } from "../../redux/actions/act-monsters";
import {styles} from "../../components/Styles"

const mapStateToProps = state => {
  return {
    monsters: state.Monsters,
    settings: state.Settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMonster: (monster,number) => dispatch(addMonster(monster,number))
  };
};

class AddMonster extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      monsterId: null,
    };
  }

  toggleModal = visible => {
    this.setState({
      isVisible: visible
    });
  };

  createMonster = (monsterId,number) => {
    console.log("IN CREAZIONE ", monsterId);
    let monsterHp,
      monsterDef,
      fascia = null;
    const { dungeons, fasce, monsters, monstersIds } = monstersList;
    const { dungeon_level, hero_levels } = this.props.settings;

    //CALCOLO LIVELLO MEDIO DEGLI EROI
    const hero_avg = hero_levels.reduce((a, b) => a + b) / hero_levels.length;
    const fasceIds = dungeons[dungeon_level].fasce;
    fasceIds.forEach(fasciaId => {
      if (
        fasce[fasciaId].levels[0] <= hero_avg &&
        hero_avg <= fasce[fasciaId].levels[1]
      ) {
        fascia = fasce[fasciaId];
      }
    });
    if (fascia == null) {
      if (hero_avg <= fasce[fasceIds[0]].levels[0]) {
        fascia = fasce[fasceIds[0]];
      } else {
        fascia = fasce[fasceIds[fasceIds.length - 1]];
      }
    }

    monsterHp = fascia.monsters[monsterId].pv;
    monsterDef = fascia.monsters[monsterId].def;

    const monster = { monsterId, monsterHp, monsterDef };
    this.props.addMonster(monster, number);
  };

  setMonster = monsterId => {
    console.log("ID: ", monsterId);
    this.setState({ monsterId: monsterId });
  };
  /*
  renderMonstersBis = type => {
    const { dungeons, fasce, monsters, monstersIds } = monstersList;
    const { dungeon_level, hero_levels } = this.props.settings;

    let isDisabled = false;
    //if(this.props.monsters.length > 7 ) isDisabled = true;

    return monstersIds.map(monsterId => {
      const monster = monsters[monsterId];
      //if(this.props.heroes.find(elem => elem.id == heroId)) isDisabled = true;
      if (
        type == monster.type &&
        fasce[dungeons[dungeon_level].fasce[0]].monsters[monsterId]
      ) {
        return (
          <TouchableOpacity
            key={monsterId}
            disabled={isDisabled}
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              minWidth: "20%",
              minHeight: "30%",
              maxWidth: "30%",
              maxHeight: "40%",
              flex: 1,
              marginVertical: 10
            }}
            onPress={() => {
              this.toggleModal(true);
              this.setMonster(monsterId);
            }}
          >
            <Image
              large
              source={monster.image}
              style={[
                { width: "80%", height: "auto", flex: 1 },
                isDisabled ? { opacity: 0.3 } : {}
              ]}
            />
            <Text style={styles.text}>
              {monster.label}
            </Text>
          </TouchableOpacity>
        );
      } else return;
    });
  };*/

  renderMonsters = type => {
    const { dungeons, fasce, monsters, monstersIds } = monstersList;
    const { dungeon_level, hero_levels } = this.props.settings;

    let isDisabled = false;
    if(this.props.monsters.length > 7 ) isDisabled = true;
    let count = 0;
    let monsters_vector = monstersIds.filter(monsterId => (monsters[monsterId].type == type && fasce[dungeons[dungeon_level].fasce[0]].monsters[monsterId]))
    console.log(type,monsters_vector)
    let firstRow = [], secondRow = [];
    monsters_vector.forEach((monsterId,i) => {
      const monster = monsters[monsterId];
      let elem = (<TouchableOpacity
      key={monsterId}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={{
        alignItems: "center",
        minWidth: "20%",
        minHeight: "55%",
        maxWidth: "30%",
        maxHeight: "75%",
        flex: 1,
        marginVertical: 10
      }}
      onPress={() => {
        this.toggleModal(true);
        this.setMonster(monsterId);
      }}
    >
      <Image
        large
        source={monster.image}
        style={[
          { width: "80%", height: "auto", flex: 1 },
          isDisabled ? { opacity: 0.3 } : {}
        ]}
      />
      <Text style={styles.text}>
        {monster.label}
      </Text>
    </TouchableOpacity>);

      if(i < Math.ceil(monsters_vector.length/2))
      firstRow.push(elem)
      else secondRow.push(elem)
    })

    return <View style={{flexDirection: "column", flex: 1}}>
      <View style={{flexDirection: "row", justifyContent: 'center', flex: 1}}>{firstRow}</View>
      <View style={{flexDirection: "row", justifyContent: 'center', flex: 1}}>{secondRow}</View>
    </View>
  };

  render() {
    const { navigate } = this.props.navigation;
    const { dungeon_level, hero_levels } = this.props.settings;

    if (dungeon_level != null && !hero_levels.some(x => x == null)) {
      return (
        <LeftRightBar navigation={this.props.navigation}>
          <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 2 }}>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "black" }}>
                  <Text>Bestie</Text>
                </TabHeading>
              }
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                paddingHorizontal: "20%",
                backgroundColor: "transparent"
              }}
            >
              {this.renderMonsters("beast")}
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "black" }}>
                  <Text>Magici</Text>
                </TabHeading>
              }
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                paddingHorizontal: "20%",
                backgroundColor: "transparent"
              }}
            >
              {this.renderMonsters("magical")}
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "black" }}>
                  <Text>Umanoidi</Text>
                </TabHeading>
              }
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                paddingHorizontal: "20%",
                backgroundColor: "transparent"
              }}
            >
              {this.renderMonsters("humanoid")}
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "black" }}>
                  <Text>Boss</Text>
                </TabHeading>
              }
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                paddingHorizontal: "20%",
                backgroundColor: "transparent"
              }}
            >
              {this.renderMonsters("boss")}
            </Tab>
          </Tabs>
          {/*Modal*/}
          { this.state.isVisible &&
          <AddMonsterPopup
            monsterId={this.state.monsterId}
            isVisible={this.state.isVisible}
            toggleFunction={this.toggleModal}
            createMonster={(number) => this.createMonster(this.state.monsterId,number)}
          />
          }
          {/*Bottone Home*/}
          <Button
            icon={
              <Icon
                raised
                name="home"
                size={15}
                color="grey"
                type="material-icons"
              />
            }
            title="Home"
            type="clear"
            titleStyle={{ color: "white" }}
            containerStyle={{
              position: "absolute",
              bottom: 10,
              left: 10
            }}
            onPress={() => {
              navigate("Main");
            }}
          />
          {/*Bottone Undo*/}
          <Button
            onPress={() => console.log("UNDO")}
            icon={
              <Icon
                raised
                name="undo"
                size={15}
                color="grey"
                type="material-icons"
              />
            }
            title="Undo"
            type="clear"
            titleStyle={{ color: "white" }}
            containerStyle={{
              position: "absolute",
              bottom: 10,
              right: 10
            }}
          />
        </LeftRightBar>
      );
    } else {
      return (
        <LeftRightBar navigation={this.props.navigation}>
          <View style={{ flex: 1, flexDirection: "row", margin: "5%" }}>
            <H2 style={{ flex: 9, color: "white" }}>
              Per poter inserire i mostri è necessario aggiungere le
              informazioni di Dungeon e Livello degli Eroi
            </H2>
            <View style={{ flex: 1, alignItems: "center", margin: "5%" }}>
              <Icon name="arrow-forward" color="white" size={35} />
            </View>
          </View>
        </LeftRightBar>
      );
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMonster);
