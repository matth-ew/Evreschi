import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Text, Tab, Tabs, TabHeading, View} from "native-base";
import RightBarContainer from "../../components/RightBarContainer";
import AddHeroStats from "./AddHeroStats";
import heroesList from "../../components/heroes-list";
import { connect } from "react-redux";
import { addHero } from "../../redux/actions/act-heroes";
import {styles} from "../../components/Styles"

const mapStateToProps = state => {
  return {
    heroes: state.Heroes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addHero: hero => dispatch(addHero(hero))
  };
};

class AddHero extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      heroId: null
    };
  }

  toggleModal = visible => {
    this.setState({
      isVisible: visible
    });
  };

  createHero = (heroId, heroHp, heroMp, heroDef) => {
    const heroFp = heroesList.heroes[heroId].fp;
    const hero = { heroId, heroFp, heroHp, heroMp, heroDef };

    this.props.addHero(hero);
  };

  setHero = heroId => {
    this.setState({ heroId: heroId });
  };

  renderHeroes = hero_class => {
    let isDisabledTop = false;
    const { heroes, heroesIds } = heroesList;
    if (this.props.heroes.length >= 5) isDisabledTop = true;
    return heroesIds.map(heroId => {
      const hero = heroes[heroId];
      if (hero.class === hero_class) {
        let isDisabled = false;
        if (this.props.heroes.find(elem => heroes[elem.id].subclass === hero.subclass))
          isDisabled = true;
        return (
          <TouchableOpacity
            key={heroId}
            disabled={isDisabled || isDisabledTop}
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              width: "30%",
              height: "40%",
              marginVertical: 10
            }}
            onPress={() => {
              this.toggleModal(true);
              this.setHero(heroId);
            }}
          >
            <Image
              source={hero.head_image}
              style={[{ width: "80%",resizeMode: "cover", height: "auto", flex: 1},
                isDisabled || isDisabledTop
                  ? { opacity: 0.3 }
                  : {}
              ]}
            />
            <Text style={styles.text}>{hero.label}</Text>
          </TouchableOpacity>
        );
      } else return;
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <RightBarContainer navigation={this.props.navigation}>
        <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 2 }}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "black" }}>
                <Text>Guerrieri</Text>
              </TabHeading>
            }
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginHorizontal: "10%",
              backgroundColor: "transparent"
            }}
          >
            {this.renderHeroes('guerrieri')}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "black" }}>
                <Text>Silvani</Text>
              </TabHeading>
            }
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginHorizontal: "10%",
              backgroundColor: "transparent"
            }}
          >
            {this.renderHeroes('silvani')}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "black" }}>
                <Text>Maghi</Text>
              </TabHeading>
            }
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginHorizontal: "10%",
              backgroundColor: "transparent"
            }}
          >
            {this.renderHeroes('maghi')}
          </Tab>
        </Tabs>

        {/*Modal*/}
        {this.state.isVisible && (
          <AddHeroStats
            isVisible={this.state.isVisible}
            toggleFunction={this.toggleModal}
            createHero={(heroHp, heroMp, heroDef) =>
              this.createHero(this.state.heroId, heroHp, heroMp, heroDef)
            }
          />
        )}
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
        {/*Bottone Undo
          <Button
            onPress={() => console.log("UNDO")}
            icon={
              <Icon
              raised
              name="undo"
              size={15}
              color="grey"
              type='material-icons'/>
            }
            title="Undo"
            type="clear"
            titleStyle={{color:"white"}}
            containerStyle={{
              position: 'absolute',
              bottom: 10,
              right: 10,
            }}
          />*/}
      </RightBarContainer>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddHero);
