import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  PanResponder
} from "react-native";

class Entity extends React.PureComponent {
  
  render(){
    const {entity, image, keyProp, selected, onClickFunction} = this.props;
    return (
      <TouchableOpacity
        key={entity.id + keyProp}
        activeOpacity={0.7}
        style={{
          flex: 1,
          width: "80%",
          alignItems: "center",
          //borderRadius: 7,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          backgroundColor: "black",
          marginHorizontal: "10%",
          marginVertical: "10%",
          overflow: "hidden"
        }}
        onPress={onClickFunction}
      >
        <Image
          source={image}
          style={[
            {
              resizeMode: "cover",
              aspectRatio: 5 / 6,
              width: "100%",
              height: null
            },
            selected ? {} : { opacity: 0.5 }
          ]}
        />
        <View
          style={{
            aspectRatio: 10 / 1,
            width: "100%",
            borderColor: "black",
            borderWidth: 1,
            height: null,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              flex: entity.curr_hp
            }}
          />
          <View
            style={{
              backgroundColor: "black",
              flex: entity.hp - entity.curr_hp
            }}
          />
        </View>
        {entity.mp ? (
          <View
            style={{
              aspectRatio: 10 / 1,
              width: "100%",
              borderColor: "black",
              borderWidth: 1,
              height: null,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                backgroundColor: "#faad14",
                flex: entity.curr_mp
              }}
            />
            <View
              style={{
                backgroundColor: "black",
                flex: entity.mp - entity.curr_mp
              }}
            />
          </View>
        ) : (
          <View />
        )}
        {entity.fp ? (
          <View
            style={[
              {
                backgroundColor: "#3385ff",
                position: "absolute",
                top: 0,
                right: 0
              },
              selected ? {} : { opacity: 0.5 }
            ]}
          >
            <Text style={styles.text}> {entity.curr_fp} </Text>
          </View>
        ) : (
          <View />
        )}
        {entity.curr_hp === 0 ? (
          <View style={{ position: "absolute", bottom: 0, left: 0 }}>
            <Text style={{ fontSize: 15 }}>☠️</Text>
          </View>
        ) : (
          <View />
        )}
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 7,
    color: "white"
  }
});

export default Entity;
