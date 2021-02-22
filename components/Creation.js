import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert, ScrollView, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import * as firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

export default class Creation extends React.Component {
  constructor(props) {
      super(props);
    this.fetchLocalization();
      this.state = {
          file: null,
          localization: null,
          description: '',
          firebaseUrl: '',
          saving: false
      };
  }

   uploadImage = async (uri,name) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const destination = firebase.auth().currentUser.uid.toString() + "/" + name;
    var ref = firebase.storage().ref().child(destination);

    ref.put(blob).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                       this.addMemory(url)
             })
         });
   }

   convertDate(inputFormat) {
     function pad(s) { return (s < 10) ? '0' + s : s; }
     var d = new Date(inputFormat)
     return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
   }

   getDate=(time)=>{
        var date = new Date(parseInt(time));
        return this.convertDate(date.toLocaleDateString());
   }

  takePhoto = () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: false,
        }).then(image => {
        var name = 'memory'+ image.modificationDate + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        var date = this.getDate(image.modificationDate);
            this.setState({
                    file: {uri: image.path, width: image.width, height: image.height, imageName: name, modificationDate: date, time: image.modificationDate}
                  });
        });
  };

  addMemory = (url) => {
    firebase.database().ref().child('Memories').push({ latitude: this.state.localization.coords.latitude, longitude: this.state.localization.coords.longitude,
        image: url, imageName: this.state.file.imageName, date: this.state.file.modificationDate,
        description: this.state.description, time: this.state.file.time, userId: firebase.auth().currentUser.uid });
        Actions.pop();
  }

  saveMemory = () => {
  if(this.state.file!=null){
      if(this.state.file.uri!=''){
            this.setState({
                  saving: true,
             });
              this.uploadImage(this.state.file.uri,this.state.file.imageName);
         }
    }
  }

   renderCurrentState() {
       if (this.state.saving) {
           return (
           <View style={styles.form}>
               <ActivityIndicator size='large' />
               <Text>Saving...</Text>
           </View>
           )
       }
       else{
       return (
           <>
           <View style={styles.container}>
                       {this.renderImage(this.state.file)}
                 </View>
                 <View style={{flexDirection:"row"}}>
                 <View style={{flex:1, margin: 5}}>
                      <TextInput style={styles.input} placeholder='Description' onChangeText = {this.handleDescriptionChange}/>
                 </View>
                 </View>
                 <View style={{flexDirection:"row"}}>
                      <View style={{flex:1, margin: 5}}>
                          <Button title="Take photo" onPress={this.takePhoto} />
                      </View>
                      <View style={{flex:1, margin: 5}}>
                           <Button title="Save" onPress={this.saveMemory} />
                      </View>
                 </View>
           </>
           );
         }
   }

  renderImage(image) {
    if(image!=null){
        return <Image style={styles.imageStyle} source={image} />
    }
  }

  fetchLocalization(){
    Geolocation.getCurrentPosition(info => this.setState({
        localization: info
    }));
  }

  handleDescriptionChange = (text) => {
        this.setState({
            description: text
        })
  }



  renderDate(){
        if(this.state.file != null){
            if(this.state.file.modificationDate != null){
               return <Text>{this.state.file.modificationDate}</Text>
            }
        }
  }

  renderMap(){
        if(this.state.localization != null){
          return  <View style={styles.mapContainer}>
                     <MapView style={styles.mapContainer}
                        initialRegion={{
                            latitude:this.state.localization.coords.latitude,
                            longitude:this.state.localization.coords.longitude,
                            latitudeDelta: 0.0322,
                            longitudeDelta: 0.0381
                        }}
                     >
                     <MapView.Marker coordinate={this.state.localization.coords}/>
                     </MapView>
                  </View>
        }
  }

  render() {
    return (
    <>
    {this.renderCurrentState()}

      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 5, alignItems: "center" },
  input: {
      paddingRight: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      marginBottom:5,
      color: '#333333',
      fontSize: 16,
      width: '100%',
      borderColor: '#eee',
      borderWidth: 1
    },
    mapContainer: {
        width:'100%',
        height:200
    },
    imageStyle: {
            alignSelf:'stretch',
            height: 180
        },
    map:{
        width:'100%',
        height:'100%'
    },
    imageStyle: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    },
    form: {
          flex: 1,
          height:'50%',
          alignItems: "center",
          flexDirection:'column',
           justifyContent:'center'
      }
});