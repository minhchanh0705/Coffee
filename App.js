import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
export default class App extends Component {
    constructor() {
        super();
        var chosen_items = [];
        var filter = {
            price: 110, iced_hot: 'iced'
        };
        var items = [
            { title: 'ABC', price: 10, iced_hot: 'iced', sugar: 1, shots: 1 },
            { title: 'DEF', price: 8, iced_hot: 'hot', sugar: 1, shots: 1 }
        ];
        chosen_items = items.filter(function (item) {
            for (var key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });
        if (chosen_items.length != 0) {
            console.log(chosen_items);
            console.log('length: ' + chosen_items.length);
        } else {
            console.log('length: ' + chosen_items.length);
        }

    }
    render() {
        return (
            <View>
                <Text></Text>
            </View>
        );

    }
}



