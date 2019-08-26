import React from 'react';
import {Text,View,SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import {Button, Header, Avatar, Icon} from 'react-native-elements'
import background from '../assets/background.jpg'
import LeftBar from '../components/LeftBar'
import RightBar from '../components/RightBar'

class LeftRightBar extends React.Component  {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={{flex:1, backgroundColor: '#666666'}}>
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
          <View style={{flex: 1, width:'100%',height:'100%',flexDirection: 'row', justifyContent:'space-between',alignItems:'stretch'}}>

            <LeftBar navigation={this.props.navigation}/>

            <View style={{flex:1}}>
              {this.props.children}
            </View>

            <RightBar navigation={this.props.navigation} editFunction={this.props.editFunction} animalFunction={this.props.animalFunction} deleteFunction={this.props.deleteFunction}/>

          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default LeftRightBar;
