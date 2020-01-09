import React from 'react';
import {Text,View,SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import {Button, Header, Avatar, Icon} from 'react-native-elements'
import background from '../assets/background_bis.jpg'
import RightBar from '../components/RightBar'

class RightBarContainer extends React.Component  {
  render() {
    const {navigate} = this.props.navigation;
    return (
          <View style={{flex: 1, width:'100%',height:'100%',flexDirection: 'row', justifyContent:'space-between',alignItems:'stretch'}}>

            <View style={{flex:1}}>
              {this.props.children}
            </View>

            <RightBar navigation={this.props.navigation} editFunction={this.props.editFunction} animalFunction={this.props.animalFunction} deleteFunction={this.props.deleteFunction}/>

          </View>
    );
  }
}
export default RightBarContainer;
