import { createAppContainer,createSwitchNavigator } from "react-navigation";
import createSidebarNavigator from './SidebarTabNavigator';

import {
  HomeScreen,
  MainScreen,
  AddEntity,
  HeroScreen,
  AnimalScreen,
  MonsterScreen,
  AddMonster,
  AddHero,
} from "../pages";

const AddEntityNavigator = createSwitchNavigator(
  {
    AddEntity: { screen: AddEntity },
    AddHero: { screen: AddHero },
    AddMonster: { screen: AddMonster }
  },
  {
    initialRouteName: "AddEntity",
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const MainNavigator = createSidebarNavigator(
  {
    Main: { screen: MainScreen },
    Hero: { screen: HeroScreen },
    Animal: { screen: AnimalScreen },
    Monster: { screen: MonsterScreen },
    AddEntity: { screen: AddEntityNavigator }
  },
  {
    initialRouteName: "Main",
    //initialRouteName: "Main", // TEST
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

//let sidebarNavigator = createSidebarNavigator(
let sidebarNavigator = createSwitchNavigator(
  {
    Home: { screen: HomeScreen },
    Main: { screen: MainNavigator },
  },
  {
    initialRouteName: "Home",
    //initialRouteName: "Main", // TEST
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(sidebarNavigator);
