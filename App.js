import React from 'react';
import { StyleSheet, Text, View, StatusBar, BackHandler, Alert} from 'react-native';
import { AppLoading, ScreenOrientation } from 'expo';

import HomeScreen from "./pages/HomeScreen"
import MainScreen from "./pages/MainScreen"
import AddEntity from "./pages/AddEntity"
import AddMonster from "./pages/AddEntityComponent/AddMonster"
import AddHero from "./pages/AddEntityComponent/AddHero"
import HeroScreen from "./pages/HeroScreen"
import MonsterScreen from "./pages/MonsterScreen"

import { createStore } from "redux";
import { Provider } from "react-redux"
import rootReducer from "./redux/reducers/reducer";
import {createStackNavigator, createSwitchNavigator, createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { useScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const store = createStore(rootReducer);


useScreens();

const HeroNavigator = createSwitchNavigator({
  HeroScreen: {screen: HeroScreen},
  /*AddHero: {screen: AddHero},
  AddMonster: {screen: AddMonster}*/
}, {
    initialRouteName: 'HeroScreen',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

const MonsterNavigator = createSwitchNavigator({
  MonsterScreen: {screen: MonsterScreen},
  /*AddHero: {screen: AddHero},
  AddMonster: {screen: AddMonster}*/
}, {
    initialRouteName: 'MonsterScreen',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

const AddEntityNavigator = createSwitchNavigator({
  AddEntity: {screen: AddEntity},
  AddHero: {screen: AddHero},
  AddMonster: {screen: AddMonster}
}, {
    initialRouteName: 'AddEntity',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});




let Navigator = createSwitchNavigator({
  Home: {screen: HomeScreen},
  Main: {screen: MainScreen},
  Hero: {screen: HeroNavigator},
  Monster: {screen: MonsterNavigator},
  AddEntity: {screen: AddEntityNavigator}
}, {
    initialRouteName: 'Main',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

let Navigation = createAppContainer(Navigator);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      ...MaterialCommunityIcons.font,
    });
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    this.setState({ isReady: true });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
      Alert.alert(
        'Uscita',
        'Sei sicuro di voler uscire?',
        [
          {
            text: 'Annulla',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => BackHandler.exitApp()},
        ],
      );
      return true;
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return(
      <Provider store={ store }>
      <StatusBar hidden={true} />
        <Navigation/>
      </Provider>
    )
  }
}


export default App;
