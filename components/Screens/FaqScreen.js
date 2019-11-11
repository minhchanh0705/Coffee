import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class FaqScreen extends Component {
    static navigationOptions = {
        header: (
            <View />
        )
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View elevation={20} style={styles.container}>
                <Text>Hello World !</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop:150
        // shadowColor: "#000000",
        // shadowOpacity: 0.2,
        // shadowRadius: 1,
        // shadowOffset: {
        //     height: 2,
        //     width: 2
        // }
    }
});
