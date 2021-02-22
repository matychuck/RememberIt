import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert, ScrollView, TextInput, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import * as firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import {Card,Icon} from "react-native-elements";

export default class Details extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
            key: '',
            date: '',
            description: '',
            localization: null,
            file: null,
            imageName: ''
      };
  }

componentWillMount() {
    coords = {latitude: this.props.latitude, longitude: this.props.longitude}
    image = {uri:this.props.url}

   this.setState({
        key: this.props._key,
        date: this.props.date,
        description: this.props.description,
        localization: coords,
        file: image,
        imageName: this.props.imageName
   });
}

renderImage(image) {
  const deviceWidth = Dimensions.get('window').width;
  if(image!=null){
    return <Image style={{width: deviceWidth, height: 300, resizeMode: 'contain'}} source={image} />
  }
}

renderMap(){
  if(this.state.localization != null){
     return  <View style={styles.mapContainer}>
         <MapView style={styles.mapContainer}
            initialRegion={{
                latitude:this.state.localization.latitude,
                longitude:this.state.localization.longitude,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0381
            }}
         >
         <MapView.Marker coordinate={this.state.localization}/>
         </MapView>
      </View>
  }
}


RemoveItem = () => {
    var link = 'Memories/' + this.props._key;
    firebase.database().ref(link).remove();
    var imageLink = firebase.auth().currentUser.uid + "/" + this.state.file.imageName;
    var desertRef = firebase.storage().ref(firebase.auth().currentUser.uid).child(imageLink);
    let imageRef = firebase.storage().refFromURL(this.state.file.uri);
    imageRef.delete().then(() => {
    Actions.pop();
    }).catch(err => console.log);



}

onPressRemove = () => {
Alert.alert(
  'Warning!',
  'Are you sure you want to remove this memory?',
  [
    {text: 'Cancel'},
    {text: 'OK', onPress: () => this.RemoveItem()},
  ],
  { cancelable: false }
)

}

  render() {
    return (
<View>
<ScrollView>
<View style={styles.cardStyle}>
                <Card>
                        <Image style={styles.imageStyle} source={this.state.file} />
                        <View style={styles.titleContainer}>
                              <Text style={styles.title}>{this.state.date}</Text>
                              <TouchableOpacity onPress={() => this.onPressRemove()}>
                              <Icon
                                    name='event-busy'
                                    type='material'
                                    color='#ffffff'
                                    containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}
                                    size={25}
                                    reverse
                                    reverseColor
                                    />
                               </TouchableOpacity>
                        </View>

                </Card>

</View>

<View style={styles.container}>
<Text style={{fontWeight: 'bold'}}>Picture was taken here:</Text>
</View>
{this.renderMap()}
<View style={styles.container}>
<Text style={{fontWeight: 'bold'}}>Description:</Text>
</View>
<View style={styles.descContainer}>
<Text>{this.state.description}</Text>
</View>
</ScrollView>
</View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
          flex: 1,
          padding: 5,
          justifyContent: 'center',
          flexDirection: 'row'
        },
      form: {
          flex: 1
      },
      title: {
        fontSize: 25,
        fontFamily: 'PermanentMarker-x99j',
      },
      titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      centerContainer: {
        padding: 15,
        justifyContent: 'center',
        flexDirection: 'row'
      },
      error: {
        color: 'red'
      },
      TouchableOpacityStyle: {
        width: 30,
        height: 60,
        bottom: 5,
      },

      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
      },
      imageStyle: {
          alignSelf:'stretch',
          height: 280,
          marginBottom: 10,
      },
      cardStyle: {
          paddingBottom: 5
      },
      buttonContainer: {
          alignItems: 'center',
          justifyContent: 'center'
      },
      mapContainer: {
              width:'100%',
              height:200
          },
      map:{
              width:'100%',
              height:'100%'
      },
      descContainer:{
        margin: 10,
        padding:10,
        borderWidth:1,
        borderRadius: 8,
        backgroundColor:'#f1f0ef'
      }
});