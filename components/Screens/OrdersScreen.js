import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class OrdersScreen extends Component {  
    static navigationOptions = {
        header: (
            <View/>
        )
    };
    constructor(props) {
        super(props);
        this.state = {
        };       
    }   
    render() {
        return (
            <View style={styles.container}>
                <Text>Orders</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginView: {
        flex: 1,
        justifyContent: 'space-around'
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold',
        alignContent: 'center',
        alignSelf: 'center'
    }
});
