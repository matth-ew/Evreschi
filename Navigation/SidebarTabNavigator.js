import React from 'react';

import { createNavigator, TabRouter, SafeAreaView } from 'react-navigation';
import { View, ImageBackground } from 'react-native';
import LeftBar from '../components/LeftBar';
import background from '../assets/background_bis.jpg'

const SidebarTabsNavigator = ({ navigation, descriptors }) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];

  const ActiveScreen = descriptor.getComponent();

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row', backgroundColor: '#666666' }}>
              <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
              <View style={{flex: 1, width:'100%',height:'100%',flexDirection: 'row', justifyContent:'space-between',alignItems:'stretch'}}>

        <LeftBar navigation={navigation}/>
        <View style={{flex:1}}>
        <ActiveScreen navigation={descriptor.navigation} />
        </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
  const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);

  return createNavigator(SidebarTabsNavigator, customTabRouter, {});
};

export default createSidebarNavigator;