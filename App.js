import React from 'react';
import { StyleSheet, Text, View, StatusBar, BackHandler, Alert} from 'react-native';
import { AppLoading, ScreenOrientation } from 'expo';

import HomeScreen from "./pages/HomeScreen"
import MainScreen from "./pages/MainScreen"
import AddEntity from "./pages/AddEntity"
import AddMonster from "./pages/AddEntityComponent/AddMonster"
import AddHero from "./pages/AddEntityComponent/AddHero"
import HeroScreen from "./pages/HeroScreen"
import AnimalScreen from "./pages/AnimalScreen"
import MonsterScreen from "./pages/MonsterScreen"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/store';
import {createStackNavigator, createSwitchNavigator, createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { useScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Navigation from './Navigation/NavigationStack'

useScreens();
/*
const HeroNavigator = createSwitchNavigator({
  HeroScreen: {screen: HeroScreen},
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
}, {
    initialRouteName: 'MonsterScreen',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});
*/
/*
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
  Hero: {screen: HeroScreen},
  Animal: {screen: AnimalScreen},
  Monster: {screen: MonsterScreen},
  AddEntity: {screen: AddEntityNavigator}
}, {
    //initialRouteName: 'Home',
    initialRouteName: 'Home',
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

let Navigation = createAppContainer(Navigator);
*/

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
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar hidden={true} />
          <Navigation/>
        </PersistGate>
      </Provider>
    )
  }
}


export default App;
