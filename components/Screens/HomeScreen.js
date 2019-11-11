import React, { Component } from 'react';
import {
    StyleSheet,
    View,   
    Text,     
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';

import ItemPopUp  from '../PopupScreen/ItemPopUp';
import { connect } from 'react-redux';
import axios from 'axios';
class HomeScreen extends Component {
    static navigationOptions = {
        header: (
            <View />
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };

        let Url = "https://csshotscoffeeapi.azurewebsites.net/api/item";
        let head = 'Bearer ' + this.props.myToken;
        axios.get(Url, { headers: { Authorization: head } })
            .then(response => {
                this.props.dispatch({
                    type: 'GET_ITEMS',
                    items: response.data
                })
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }
    _onPressChoose(img, title, price) {
        this.props.dispatch({
            type: 'CHOOSE_ITEM',
            img: img,
            title: title,
            price: price,
        });
        this.props.dispatch({
            type: 'TOGGLE_VISIBLE',
            visible: true
        })
    }
    _onPressNext() {
        var total_cups = this.props.lst_chosen.reduce((count, item, index, lst_chosen) => {
            return count += item.count
        }, 0);
        var total_price = this.props.lst_chosen.reduce((price, item, index, lst_chosen) => {
            return price += item.price * item.count
        }, 0);
        this.props.dispatch({
            type: 'TOTAL_CUPS',
            total_cups: total_cups
        });
        this.props.dispatch({
            type: 'TOTAL_PRICE',
            total_price: total_price
        })
        var { navigate } = this.props.navigation;
        navigate('CartScreen');
    }
    render() {
        let { myItems } = this.props;
        if (myItems == []) {
            return (<View></View>);
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>Hello John.</Text>
                    <Text style={styles.txt_title}>Get your coffee fix</Text>
                    <View style={styles.menu}>
                        <View style={styles.lst_items}>
                            <FlatList
                                data={myItems}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={styles.item}
                                        onPress={() => this._onPressChoose(item.ImageURL, item.Title, item.Price)}>
                                        <Image
                                            style={styles.img}
                                            source={{ uri: item.ImageURL }}
                                        />
                                        <View style={styles.content_item}>
                                            <Text style={styles.txt_content}>{item.Title}</Text>
                                            <Text style={styles.txt_content}>${item.Price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View >
                        <View style={styles.button}>
                            <TouchableOpacity onPress={this._onPressNext.bind(this)}>
                                <View style={styles.btn}>
                                    <Text style={styles.btn_next}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </View >
                    </View>
                    <ItemPopUp />
                </View >
            );
        }
    }
}
function mapStatetoProps(state) {
    return {
        myToken: state.token,
        myItems: state.items,
        lst_chosen: state.lst_chosen,
        count: state.count
    };
}
export default connect(mapStatetoProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#2B2B2B',
        color: '#E6E6E6',
        fontFamily: 'Comfortaa-Bold',
        fontSize: 22,
        paddingLeft: 24,
        paddingTop: 29,
        paddingBottom: 24
    },
    txt_title: {
        color: '#2B2B2B',
        fontFamily: 'Comfortaa-Bold',
        fontSize: 18,
        marginLeft: 22.5,
        marginTop: 48,
        paddingBottom: 7.5,
        marginBottom: 26.5,
        borderBottomWidth: 3,
        borderBottomColor: '#CFAB57'
    },
    menu: {
        flexDirection: 'row',
    },
    lst_items: {
        flex: 1,
        marginLeft: 27,
        marginBottom: 60,
        paddingBottom: 120
    },
    item: {
        flexDirection: 'row',
        marginBottom: 30
    },
    img: {
        borderRadius: 10,
        width: 69,
        height: 67
    },
    content_item: {
        paddingLeft: 17,
        justifyContent: 'center'
    },
    txt_content: {
        fontFamily: 'Comfortaa-Bold'
    },
    button: {
        flexDirection: 'column-reverse',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    btn: {
        marginBottom: 220,
        marginRight: 36,
        width: 91,
        height: 36,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B2B2B'
    },
    btn_next: {
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        color: 'white',
        fontSize: 14
    },
    
});
