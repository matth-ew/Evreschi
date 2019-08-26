import React from 'react';
import {View} from 'react-native';
import {Button,Text,H3,Container} from 'native-base'
import LeftRightBar from '../components/LeftRightBar'
import {styles} from '../components/Styles'

class AddEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <LeftRightBar navigation={this.props.navigation}>
          <View style={styles.overlayBackground}>
            <View style={styles.overlay}>
              <H3 style={{flex: 1,marginVertical: '5%'}}>Cosa vuoi aggiungere?</H3>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%'
              }}>
                <Button primary onPress={() => {this.setState({ isVisible: false }); navigate('AddHero')}}>
                  <Text>Eroe</Text>
                </Button>
                <Button danger onPress={() => {this.setState({ isVisible: false }); navigate('AddMonster')}}>
                  <Text>Mostro</Text>
                </Button>
              </View>
            </View>
          </View>
        </LeftRightBar>
      </Container>
    );
  }
}

export default AddEntity;
