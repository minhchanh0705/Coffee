import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import ItemPopUpEdit from '../PopupScreen/ItemPopUpEdit';
const SCREEN_WIDTH = Dimensions.get('window').width;
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class CartScreen extends Component {
    static navigationOptions = {
        header: (
            <View />
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            visible_edit: false,
            count: 1,
        };
    }
    _onPressCheckout() {

    }
    _onPressEdit(index, img, title, price) {
        this.props.dispatch({
            type: 'CHOOSE_ITEM',
            img: img,
            title: title,
            price: price,
        });
        this.props.dispatch({
            type: 'TOGGLE_VISIBLE_EDIT',
            visible_edit: true
        })
    }
    plus(index) {
        let chosen =
        {
            img: this.props.lst_chosen[index].img,
            title: this.props.lst_chosen[index].title,
            iced_hot: this.props.lst_chosen[index].iced_hot,
            sugar: this.props.lst_chosen[index].sugar,
            shots: this.props.lst_chosen[index].shots,
            count: this.props.lst_chosen[index].count + 1,
            price: this.props.lst_chosen[index].price
        }
        this.props.lst_chosen.splice(index, 1, chosen)
        this.props.dispatch({
            type: 'EDIT_ITEM',
            lst_chosen: this.props.lst_chosen
        })

    }
    minus(index) {
        if (this.props.lst_chosen[index].count > 0) {
            let chosen =
            {
                img: this.props.lst_chosen[index].img,
                title: this.props.lst_chosen[index].title,
                iced_hot: this.props.lst_chosen[index].iced_hot,
                sugar: this.props.lst_chosen[index].sugar,
                shots: this.props.lst_chosen[index].shots,
                count: this.props.lst_chosen[index].count - 1,
                price: this.props.lst_chosen[index].price
            }
            this.props.lst_chosen.splice(index, 1, chosen)
            this.props.dispatch({
                type: 'EDIT_ITEM',
                lst_chosen: this.props.lst_chosen
            })
        }
    }
    chooseIceHot(iced_hot) {
        this.props.dispatch({
            type: 'FILTER_ICED',
            btn_ice: iced_hot
        })
    }
    chooseSugar(sugar) {
        this.props.dispatch({
            type: 'FILTER_SUGAR',
            btn_sugar: sugar
        })
    }
    chooseShots(shots) {
        this.props.dispatch({
            type: 'FILTER_SHOTS',
            btn_shots: shots
        })
    }
    changeColorButtonIce(btn_ice) {
        if (btn_ice == this.props.filter.btn_ice) return styles.btn_chosen;
        return styles.btn_choose
    }
    changeColorButtonSugar(btn_sugar) {
        if (btn_sugar == this.props.filter.btn_sugar) return styles.btn_chosen;
        return styles.btn_choose
    }
    changeColorButtonShots(btn_shots) {
        if (btn_shots == this.props.filter.btn_shots) return styles.btn_numShots_1;
        return styles.btn_numShots
    }
    btn_close(index) {
        this.props.lst_chosen.splice(index, 1)
        this.props.dispatch({
            type: 'EDIT_ITEM',
            lst_chosen: this.props.lst_chosen
        })
    }
    _onPressGetCoffee(){
        var { navigate } = this.props.navigation;
        navigate('HomeScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.txt_header}>My Cart</Text>
                </View>
                <View style={styles.quantity}>
                    <Text style={styles.txt_quantity}>Qty: {this.props.total_cups} Cups</Text>
                    <Text style={styles.txt_total}>Total: ${this.props.total_price}</Text>
                </View>
                {
                    this.props.total_cups === 0 ?
                        (
                            <View style={styles.view_empty}>
                                <Text style={styles.txt_empty1} >Your cart is empty</Text>
                                <Text style={styles.txt_empty2}>Looks like you haven’t made your choice…</Text>
                                <Text style={styles.txt_empty3}>Make an order now!</Text>
                                <TouchableOpacity onPress={this._onPressGetCoffee.bind(this)}>
                                        <View style={styles.btn_getCoffee}>
                                            <Text style={styles.txt_checkout}>Get Coffee</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.container}>
                                <View style={styles.lst_items}>
                                    <FlatList
                                        data={this.props.lst_chosen}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item, index }) =>
                                            <View elevation={7} style={styles.lst}>
                                                <View style={styles.items}>
                                                    <View style={styles.left_content}>
                                                        <Image
                                                            style={styles.img}
                                                            source={{ uri: item.img }}
                                                        />
                                                        <View style={styles.content_item}>
                                                            <Text style={styles.txt_title}>{item.title}</Text>
                                                            <Text style={styles.txt_option}>{item.iced_hot}, {item.sugar} Sugar, {item.shots}.</Text>
                                                            <View style={styles.total_quantity}>
                                                                <TouchableOpacity>
                                                                    <Icon name='plus-circle' size={20} style={styles.btnPlus} onPress={() => this.plus(index)} />
                                                                </TouchableOpacity>
                                                                <Text >{this.props.lst_chosen[index].count}</Text>
                                                                <TouchableOpacity>
                                                                    <Icon name='minus-circle' size={20} style={styles.btnPlus} onPress={() => this.minus(index)} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.btn_item}>
                                                        <TouchableOpacity>
                                                            <Icon name='window-close' size={16} style={styles.btn_close} onPress={() => this.btn_close(index)} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.btn_edit}
                                                            onPress={() => this._onPressEdit(index, item.img, item.title, item.price)}>
                                                            <Text>edit</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <ItemPopUpEdit index={index} />
                                            </View>

                                        }
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <TouchableOpacity>
                                        <View style={styles.btn_checkout}>
                                            <Text style={styles.txt_checkout}>Checkout</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )

                }
            </View>
        );
    }
}
function mapStatetoProps(state) {
    return {
        lst_chosen: state.lst_chosen,
        filter: state.filter,
        total_cups: state.total_cups,
        total_price: state.total_price
    };
}
export default connect(mapStatetoProps)(CartScreen);
const styles = StyleSheet.create({
    lst: {
        backgroundColor: '#fff',
        marginLeft: 15,
        marginTop: 13,
        marginBottom: 5,
        marginRight: 14,
        paddingLeft: 7,
        paddingBottom: 15,
        paddingTop: 12,
    },
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#2B2B2B',
    },
    txt_header: {
        color: '#E6E6E6',
        fontFamily: 'Comfortaa-Bold',
        fontSize: 22,
        marginLeft: 24,
        marginTop: 29,
        marginBottom: 14,
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#CFAB57'
    },
    view_empty:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    txt_empty1:{
        fontFamily: 'Comfortaa-Bold',
        fontSize:15,
        color:'#CFAB57',
        paddingBottom:32
    },
    txt_empty2:{
        fontFamily: 'Comfortaa-Regular',
        fontSize:10,
        color:'#2B2B2B',
        opacity:0.47,
        paddingBottom:16
    },
    txt_empty3:{
        fontFamily: 'Comfortaa-Regular',
        fontSize:10,
        color:'#2B2B2B',
        paddingBottom:32
    },
    lst_items: {
        flex: 1,
        paddingBottom: 56,

    },
    quantity: {
        marginLeft: 15,
        marginTop: 23,
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    txt_quantity: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 17,
        fontFamily: 'Comfortaa-Bold',
        fontSize: 18
    },
    txt_total: {
        flex: 1,
        textAlign: 'right',
        marginLeft: 17,
        marginRight: 28,
        fontFamily: 'Comfortaa-Bold',
        fontSize: 18
    },
    items: {
        flexDirection: 'row',
    },
    left_content: {
        flex: 1,
        flexDirection: 'row'
    },
    total_quantity: {
        flexDirection: 'row',
        marginTop: 5
    },
    img: {
        borderRadius: 10,
        width: 67,
        height: 65
    },
    content_item: {
        paddingLeft: 7,
        justifyContent: 'center'
    },
    txt_title: {
        fontSize: 13,
        fontFamily: 'Comfortaa-Bold'
    },
    txt_option: {
        fontSize: 11,
        fontFamily: 'Comfortaa-Regular'
    },
    btnPlus: {
        paddingHorizontal: 10
    },
    btn_item: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    btn_close: {
        alignSelf: 'flex-end',
        marginRight: 11
    },
    btn_edit: {
        alignSelf: 'flex-end',
        marginRight: 11,
        flex: 0,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 10,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flexDirection: 'column-reverse',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    btn_checkout: {
        marginBottom: 10,
        marginRight: 36,
        width: 91,
        height: 36,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B2B2B'
    },
    btn_getCoffee: {
        width: 91,
        height: 36,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B2B2B',
        
    },
    txt_checkout: {
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
        color: 'white',
        fontSize: 14
    }
});
