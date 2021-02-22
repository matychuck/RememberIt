import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon} from 'react-native-elements'
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
class BottomNavigator extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#f8f4f4'

            }}>

                <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#f8f4f4', width: 70, height: 70, borderRadius: 35, bottom: 25, zIndex: 10 }}>
                    <TouchableOpacity
                       style={styles.TouchableOpacityStyle}
                       onPress={() => Actions.creation()}>
                    <Icon
                        name='add'
                        type='material'
                        color='#f00'
                        containerStyle={{ alignSelf: 'center' }}
                        reverse
                        size={28}
                    />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', backgroundColor: '#2196F3', bottom: 0, zIndex: 1, width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
                    <Icon
                        name='menu'
                        type='material'
                        color='#fff'
                        onPress={() => {console.log('CLICKED')}}

                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            name='favorite'
                            type='material'
                            color='#fff'
                            onPress={() => {console.log('CLICKED')}}
                            containerStyle={{ marginHorizontal: 16 }}
                        />
                        <Icon
                            name='search'
                            type='material'
                            color='#fff'
                        />
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
      position: 'absolute',
      width: 200,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 10,
    },

    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    },
    imageStyle: {
        alignSelf:'stretch',
        height: 180,
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

export default BottomNavigator;

