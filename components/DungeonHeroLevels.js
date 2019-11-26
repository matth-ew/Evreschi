import React from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Picker
} from "react-native";
import { Form, Item, Text } from "native-base";
import produce from "immer";
import Popup from "./Popup";
import monstersList from "./monsters-list";
import { connect } from "react-redux";
import { setLevels } from "../redux/actions/act-settings";

const mapStateToProps = state => {
  return {
    settings: state.Settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLevels: settings => dispatch(setLevels(settings))
  };
};

class DungeonHeroLevels extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hero_levels: [null, null, null, null, null],
      dungeon_level: null
    };
  }

  componentDidMount() {
    this.setState({
      hero_levels: [...this.props.settings.hero_levels],
      dungeon_level: this.props.settings.dungeon_level
    });
  }
  /*
  componentDidUpdate(prevProps) {
      if(prevProps.settings !== this.props.settings){
        this.setState({
          hero_levels: [...this.props.settings.hero_levels],
          dungeon_level: this.props.settings.dungeon_level,
        })
      }
  }*/

  levelPicker = (id, max) => {
    var pickerItems = [];
    for (var i = 1; i <= max; i++)
      pickerItems.push(
        <Picker.Item key={id || i} label={i.toString()} value={i} />
      );
    return pickerItems;
  };

  dungeonPicker = () => {
    var pickerItems = [];
    monstersList.dungeonsIds.forEach((dungeonId, i) => {
      const { id, label } = monstersList.dungeons[dungeonId];
      pickerItems.push(
        <Picker.Item key={"dungeon" || i} label={label} value={id} />
      );
    });

    return pickerItems;
  };

  submitFunction = () => {
    const { hero_levels, dungeon_level } = this.state;
    const { dungeons, fasce } = monstersList;
    let multipliers = null;
    if (dungeon_level) {
      let fascia
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

      multipliers = fascia.multipliers
    }

    this.props.setLevels({
      hero_levels: hero_levels,
      dungeon_level: dungeon_level,
      monster_multiplier: multipliers
    });
  };

  render() {
    const { hero_levels, dungeon_level } = this.state;
    return (
      <Popup
        isVisible={this.props.isVisible}
        submitFunction={this.submitFunction}
        toggleFunction={this.props.toggleFunction}
        height="90%"
        width="50%"
        flex={6}
      >
        <Form style={{ flex: 1 }}>
          {hero_levels.map((hero_level, i) => {
            return (
              <Item key={i} style={{ flex: 1 }} picker>
                <Text style={{ flex: 1, textAlign: "center" }}>
                  Eroe {i + 1}
                </Text>
                <Picker
                  key={i}
                  mode="dropdown"
                  selectedValue={hero_level}
                  style={{ flex: 1, width: undefined }}
                  onValueChange={itemValue =>
                    this.setState(
                      produce(draft => {
                        draft.hero_levels[i] = itemValue;
                      })
                    )
                  }
                >
                  <Picker.Item label="Seleziona il livello" value={null} />
                  {this.levelPicker(i, 100)}
                </Picker>
              </Item>
            );
          })}
          {/*Dungeon Picker*/}
          <Item key={"dungeon"} style={{ flex: 1 }} picker>
            <Text style={{ flex: 1, textAlign: "center" }}>Dungeon </Text>
            <Picker
              key={"dungeon"}
              mode="dropdown"
              selectedValue={dungeon_level}
              style={{ flex: 1, width: undefined }}
              onValueChange={itemValue =>
                this.setState(
                  produce(draft => {
                    draft.dungeon_level = itemValue;
                  })
                )
              }
            >
              <Picker.Item label="Seleziona" value={null} />
              {this.dungeonPicker()}
            </Picker>
          </Item>
        </Form>
      </Popup>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonHeroLevels);
