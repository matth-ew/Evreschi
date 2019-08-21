import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { AppLoading } from 'expo';
import HomeScreen from "./pages/HomeScreen"
import MainScreen from "./pages/MainScreen"
import AddEntity from "./pages/AddEntity"
import AddMonster from "./pages/AddEntityComponent/AddMonster"
import AddHero from "./pages/AddEntityComponent/AddHero"
import { createStore } from "redux";
import { Provider } from "react-redux"
import rootReducer from "./redux/reducers/reducer";
import {createStackNavigator, createSwitchNavigator, createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { useScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const store = createStore(rootReducer);


useScreens();

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
  AddEntity: {screen: AddEntityNavigator}
}, {
    initialRouteName: 'AddEntity',
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
    });
    this.setState({ isReady: true });
  }

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
