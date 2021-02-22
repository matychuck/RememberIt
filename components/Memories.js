import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import React, { Component } from "react";
import {ActivityIndicator, View, Text, StyleSheet, Alert, FlatList, TouchableOpacity, Image} from "react-native";
import {ListItem, Card, Icon} from "react-native-elements";
import {Input} from "../elements/Input.js";
import {Button} from "../elements/Button.js";
import {SignUpButton} from "../elements/SignUpButton.js";
import firebase from '../Firebase';
import { Searchbar } from 'react-native-paper';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient';

export default class Memories extends Component {
  constructor(props) {
    super(props);

    this.itemsRef = this.getRef().child('Memories').orderByChild('userId').equalTo(firebase.auth().currentUser.uid);

    this.state = {
      dataSource: [],
      data: [],
      error: null
    };

  }

getRef(){
     return firebase.database().ref();
}

componentDidMount() {
    this.getItems(this.itemsRef);
}



getItems(itemsRef){
    itemsRef.on('value', (snap) => {
        let items = [];
        snap.forEach((child)=> {
            items.push({
                uri: child.val().image,
                _key: child.key,
                date: child.val().date,
                description: child.val().description,
                imageName: child.val().imageName,
                longitude: child.val().longitude,
                latitude: child.val().latitude,
                time: child.val().time
            })
        });

        items.sort((a,b) => (a.time > b.time) ? -1 : ((b.time > a.time) ? 1 : 0));
        this.setState({
        data: items,
        dataSource: items
        });
    })

}


  onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        Actions.pop();
      }, error => {
        console.error('Sign Out Error', error);
      });
  }

renderItem = ({item}) =>
    (
    <TouchableOpacity
           onPress={() => Actions.details({_key: item._key, description: item.description,
           date: item.date, url: item.uri, latitude: item.latitude, longitude: item.longitude })}>
        <View style={styles.cardStyle}>
            <Card >
                <View style={{flex:1}}>
                    <Image style={styles.imageStyle} source={item} />
                </View>
                <View style={styles.titleContainer}>
                     <Text style={styles.title}>{item.date}</Text>
                </View>
            </Card>
        </View>
     </TouchableOpacity>
    );


renderSeparator = () => {
return (
  <View
    style={{
      height: 1,
      width: "86%",
      backgroundColor: "#CED0CE",
      marginLeft: "14%"
    }}
  />
);
};

handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    var data = [];
    for(var i=0;i<this.state.data.length;i++){
        if(this.state.data[i].date.toLowerCase().includes(formatQuery)){
            data.push(this.state.data[i]);
        }
    }
    this.setState({
        dataSource: data,
    });
  }


  render() {
    return (
      <View style={{flex: 1, paddingTop:0}}>
        <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => (
                                  <ListItem
                                    Component={TouchableScale}
                                    friction={90} //
                                    tension={100} // These props are passed to the parent component (here TouchableScale)
                                    activeScale={0.95} //
                                    linearGradientProps={{
                                      colors: ['#e6e6ff', '#f2f2f2'],
                                      start: { x: 1, y: 0 },
                                      end: { x: 0.2, y: 0 },
                                    }}
                                    ViewComponent={LinearGradient} // Only if no expo
                                    leftAvatar={{ rounded: true, source: { uri: 'https://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Photo-icon.png' } }}
                                    title={item.date}
                                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                                    subtitleStyle={{ color: 'black' }}
                                    subtitle={item.description}
                                    containerStyle={{ marginBottom: 2, borderBottomWidth: 1, borderRadius: 16, overflow: 'hidden' }}
                                    chevron={{ color: 'black' }}
                                    onPress={() => Actions.details({_key: item._key, description: item.description, date: item.date, url: item.uri, latitude: item.latitude, longitude: item.longitude, imageName: item.imageName })}
                                  />
                                )}
                keyExtractor={item => item._key}
              />
         <View style={{ position: 'relative', backgroundColor: '#e6e6ff', bottom: 0, zIndex: 1, width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 0, borderColor:'#ccccff',borderBottomWidth:1,borderTopWidth:1 }}>
               <Searchbar style={{ width:'80%', height:'80%',marginTop: 5}} placeholder="Search..." onChangeText = {this.handleSearch}/>

               <View style={{ flexDirection: 'row' }}>
                     <TouchableOpacity
                             style={styles.TouchableOpacityStyle}
                             onPress={() => Actions.creation()}>
                         <Icon
                             name='add'
                             type='material'
                             color='#ffffff'
                             containerStyle={{ alignSelf: 'center' }}
                             reverse
                             reverseColor
                             size={25}
                         />
                     </TouchableOpacity>

               </View>
         </View>
      </View>
    );
  }
  
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
      justifyContent: 'center',
      flexDirection: 'row'
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
    }
  });