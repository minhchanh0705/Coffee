import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Input, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
var STORAGE_KEY = 'key_access_token';
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    _onPressLogin(event) {
        let serviceUrl = "https://csshotscoffeeapi.azurewebsites.net/api/token";
        let username = this.state.username;
        let password = this.state.password;
        var access_token = '';
        fetch(serviceUrl, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username, password: password
            }),
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                access_token = responseJSON.token;
                if (access_token != undefined) {
                    try {
                        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseJSON));
                        var { navigate } = this.props.navigation;
                        this.props.dispatch({
                            type: 'TOGGLE_LOGGED',
                            logged: true
                        })
                        this.props.dispatch({
                            type: 'GET_TOKEN',
                            token: access_token
                        })
                        navigate('Logged');
                    } catch (error) {
                        console.log('AsyncStorage error: ' + error.message);
                    }
                }
                else {
                    Alert.alert('Login failure');
                }
            })
            .catch((error) => {
                Alert.alert('Login failure');
            });
    }

    render() {
        const { username, password } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.loginTitle}>
                    <Text style={styles.headerText}>logo</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.loginInput}>
                        <Input
                            leftIcon={
                                <Icon
                                    name="envelope-o"
                                    type="font-awesome"
                                    color="white"
                                    size={16} />
                            }
                            containerStyle={{ marginVertical: 10 }}
                            onChangeText={username => this.setState({ username })}
                            value={username}
                            inputStyle={{ marginLeft: 20, fontSize: 14, color: 'white' }}
                            keyboardAppearance="light"
                            placeholder="Email"
                            fontFamily="Arial-Regular"
                            autoFocus={false}
                            autoCapitalize="none"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            placeholderTextColor="white"
                            errorStyle={{ textAlign: 'center', fontSize: 12 }}
                        />
                        <Input
                            leftIcon={
                                <Icon
                                    name="lock"
                                    type="font-awesome"
                                    color="white"
                                    size={16}
                                />
                            }
                            containerStyle={{ marginVertical: 2 }}
                            onChangeText={password => this.setState({ password })}
                            value={password}
                            inputStyle={{ marginLeft: 20, fontSize: 14, color: 'white' }}
                            secureTextEntry={true}
                            keyboardAppearance="light"
                            placeholder="Password"
                            fontFamily="Arial-Regular"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType="done"
                            blurOnSubmit={true}
                            placeholderTextColor="white"
                        />
                    </View>
                    <View style={styles.footerView}>
                        <TouchableOpacity onPress={this._onPressLogin.bind(this)}>
                            <View style={styles.button}>
                                <Text style={styles.btn_login}>Login</Text>
                            </View>
                        </TouchableOpacity> 
                        <TouchableOpacity >
                            <View>
                                <Text style={styles.btn_register}>No Account? SIGN UP</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        );
    }
}
function mapStatetoProps(state) {
    return {
        logged: state.logged
    };
}
export default connect(mapStatetoProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2B2B2B",
        alignItems: 'center'
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#CFAB57',
        fontSize: 20,
        fontFamily: 'Comfortaa-Bold'

    },
    body: {
        marginBottom: SCREEN_HEIGHT/15,
    },
    loginInput: {
        width: SCREEN_WIDTH - 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerView: {
        marginTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        marginBottom: 10,
        width: 250,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#CFAB57',
        alignItems: 'center',
        borderRadius: 30
    },
    btn_login: {
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        color: 'white',
        fontSize: 14
    },
    btn_register: {
        textAlign: 'center',
        fontFamily: 'Comfortaa-Regular',
        color: 'white',
        fontSize: 10
    }
});

