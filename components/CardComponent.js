import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import moment from 'moment';
import tz from 'moment-timezone'

var TIMEZONE = 'Europe/Berlin';
var TIME_FORMAT = 'MMMM Do YYYY, hh:mm:ss';

var width = Dimensions.get('window').width;

class CardComponent extends Component {
    render() {
        var time = moment(this.props.timestamp).tz(TIMEZONE).format(TIME_FORMAT);
        return (
            <View style={[styles.cardView]}>
                <Image source={this.props.imageIcon} style={styles.iconImage} resizeMode={Image.resizeMode.contain}></Image>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{this.props.value}</Text>
                </View>
                <View style={[styles.statusView]}>
                    <View style={[styles.statusValue]}></View>
                </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    statusView: {
        borderWidth: 1,
        borderColor: '#818181',
        height: 5,
    },
    statusValue: {
        background: '#00ff00',
        height: 4,
    },
    cardView: {
        flex: 0.3,
        backgroundColor: '#000000',
        marginBottom: 10,
        flexDirection: 'column',
    },
    iconImage: {
        flex: 1,
        width: 100,
        height: 40,
        alignSelf: 'center',
        marginTop: 10,
    },
    valueContainer: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 20,
    },
    value: {
        fontSize: 28,
        marginTop: -20,
        color: '#ffffff',
        textAlign: 'center',
    }
});

export default CardComponent;