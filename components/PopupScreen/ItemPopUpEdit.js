import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
import Modal, { ModalContent } from 'react-native-modals';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
class ItemPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            btn_ice: 'Iced',
            btn_sugar: '0%',
            btn_shots: 'Decaffeinated',
        };
    }

    chooseIceHot(iced_hot) {
        this.setState({
            btn_ice: iced_hot
        })
    }
    chooseSugar(sugar) {
        this.setState({
            btn_sugar: sugar,
        })
    }
    chooseShots(shots) {
        this.setState({
            btn_shots: shots,
        })
    }
    changeColorButtonIce(btn_ice) {
        if (btn_ice == this.state.btn_ice) return styles.btn_chosen;
        return styles.btn_choose
    }
    changeColorButtonSugar(btn_sugar) {
        if (btn_sugar == this.state.btn_sugar) return styles.btn_chosen;
        return styles.btn_choose
    }
    changeColorButtonShots(btn_shots) {
        if (btn_shots == this.state.btn_shots) return styles.btn_numShots_1;
        return styles.btn_numShots
    }
    _onPressEdit(iced_hot, sugar, shots) {
        index=this.props.index
        let chosen=
        {
            img: this.props.lst_chosen[index].img,
            title: this.props.lst_chosen[index].title,
            iced_hot: iced_hot,
            sugar: sugar,
            shots: shots,
            count: this.props.lst_chosen[index].count,
            price: this.props.lst_chosen[index].price
          }        
        this.props.lst_chosen.splice(index, 1,chosen)
        this.props.dispatch({
            type: 'EDIT_ITEM',
            lst_chosen: this.props.lst_chosen
        })
        this.props.dispatch({
            type: 'FILTER',
            count: this.state.count,
            btn_ice: iced_hot,
            btn_sugar: sugar,
            btn_shots: shots,
        });
        this.props.dispatch({
            type: 'TOGGLE_VISIBLE_EDIT',
            visible_edit: false
        })
    
    }
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.props.visible_edit}
                    onTouchOutside={() => {
                        this.props.dispatch({
                            type: 'FILTER_ICED',
                            btn_ice: 'Iced'
                        });
                        this.props.dispatch({
                            type: 'FILTER_SUGAR',
                            btn_sugar: '0%'
                        });
                        this.props.dispatch({
                            type: 'FILTER_SHOTS',
                            btn_shots: 'Decaffeinated'
                        });
                        this.props.dispatch({
                            type: 'TOGGLE_VISIBLE_EDIT',
                            btn_shots: false
                        });
                    }}
                >
                    <View style={styles.frame}>
                        <ModalContent >
                            <View style={styles.dishes}>
                                <View style={styles.left_content}>
                                    <Image
                                        style={styles.img}
                                        source={{ uri: this.props.myItem.img }}
                                    />
                                    <View style={styles.content_item}>
                                        <Text style={styles.txt_content}>{this.props.myItem.title}</Text>
                                        <Text style={styles.txt_content}>${this.props.myItem.price}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.txt_option}>Iced/Hot</Text>
                            <View style={styles.option}>
                                <TouchableOpacity style={this.changeColorButtonIce('Iced')} onPress={() => this.chooseIceHot('Iced')}>
                                    <Text style={styles.txt_btn}>Iced</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.changeColorButtonIce('Hot')} onPress={() => this.chooseIceHot('Hot')}>
                                    <Text style={styles.txt_btn}>Hot</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.txt_option}>Sugar</Text>
                            <View style={styles.option}>
                                <TouchableOpacity style={this.changeColorButtonSugar('0%')} onPress={() => this.chooseSugar('0%')}>
                                    <Text style={styles.txt_btn}>0%</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.changeColorButtonSugar('25%')} onPress={() => this.chooseSugar('25%')}>
                                    <Text style={styles.txt_btn}>25%</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.changeColorButtonSugar('50%')} onPress={() => this.chooseSugar('50%')}>
                                    <Text style={styles.txt_btn}>50%</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.changeColorButtonSugar('75%')} onPress={() => this.chooseSugar('75%')}>
                                    <Text style={styles.txt_btn}>75%</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.changeColorButtonSugar('100%')} onPress={() => this.chooseSugar('100%')}>
                                    <Text style={styles.txt_btn}>100%</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.txt_option}>Number of Shots</Text>
                            <View style={styles.option}>
                                <TouchableOpacity style={this.changeColorButtonShots('Decaffeinated')} onPress={() => this.chooseShots('Decaffeinated')}>
                                    <Text style={styles.txt_btn}>Decaffeinated</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.changeColorButtonShots('Single Shot')} onPress={() => this.chooseShots('Single Shot')}>
                                    <Text style={styles.txt_btn}>Single Shot</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.changeColorButtonShots('Double Shot')} onPress={() => this.chooseShots('Double Shot')}>
                                    <Text style={styles.txt_btn}>Double Shot</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.btn_addCart} onPress={() => this._onPressEdit(this.state.btn_ice, this.state.btn_sugar, this.state.btn_shots)}>
                                <Text style={styles.addCart}>Edit</Text>
                            </TouchableOpacity>
                        </ModalContent>

                    </View>
                </Modal>
            </View>
        );
    }
}
function mapStatetoProps(state) {
    return {
        myItem: state.item,
        visible_edit: state.visible_edit,
        lst_chosen: state.lst_chosen,
        filter: state.filter
    };
}
export default connect(mapStatetoProps)(ItemPopUp);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    frame: {
        width: SCREEN_WIDTH - 25,
        height: SCREEN_WIDTH - 23,
        borderRadius: 10,
        
    },
    dishes: {
        flexDirection: 'row',
        marginBottom: 5
    },
    left_content: {
        flex: 1,
        flexDirection: 'row',
        
    },
    option: {
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 2
    },
    img: {
        borderRadius: 10,
        width: 63,
        height: 61
    },
    content_item: {
        paddingLeft: 8,
        justifyContent: 'center'
    },
    total_quantity: {
        paddingTop:25,
        marginLeft: -10,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        
    },
    txt_content: {
        fontFamily: 'Comfortaa-Bold',
        fontSize:14
    },
    num: {
        fontSize: 16
    },
    btnPlus: {
        paddingHorizontal: 7
    },
    txt_option: {
        fontSize: 12,
        fontFamily: 'Comfortaa-Bold',
    },
    txt_btn: {
        fontSize: 10,
        fontFamily: 'Comfortaa-Regular',
    },
    btn_choose: {
        flex: 0,
        borderWidth: 1,
        borderRadius: 30,
        width: 42,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    btn_chosen: {
        flex: 0,
        borderWidth: 1,
        borderRadius: 30,
        width: 42,
        height: 30,
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        marginRight: 5
    },
    btn_numShots: {
        flex: 0,
        borderWidth: 1,
        borderRadius: 30,
        width: 85,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    btn_numShots_1: {
        flex: 0,
        borderWidth: 1,
        borderRadius: 30,
        width: 85,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        backgroundColor: '#E6E6E6',
    },
    btn_addCart: {
        borderWidth: 1,
        borderRadius: 30,
        width: 91,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        alignSelf: 'center',
        backgroundColor: '#2B2B2B',
        marginBottom: 12,
        marginTop: 5
    },
    addCart: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
    }
});
