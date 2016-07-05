import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import moment from 'moment';
import tz from 'moment-timezone'

var TIMEZONE = 'Europe/Berlin';
var TIME_FORMAT = 'MMMM Do YYYY, hh:mm:ss';

class CardComponent extends Component {
    render() {
        var time = moment(this.props.timestamp).tz(TIMEZONE).format(TIME_FORMAT);
        return (
            <View style={[styles.cardView]}>
                <View style={[styles.header, this.props.colorStyle]}>
                    <Text style={styles.title}>{this.props.title} </Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{this.props.value}</Text>
                </View>
                <View style={[styles.footer]}>
                    <Text style={styles.dateFormat}>{time}</Text>
                </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    cardView: {
        margin: 10,
        backgroundColor: '#DFDFE1',
    },
    header: {
        padding: 10,
        alignSelf: 'stretch',
    },
    footer: {
        borderTopColor: '#adadad',
        borderTopWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        padding: 5,
    },
    valueContainer: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 20,
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        color: '#ffffff',
        textAlign: 'left',
    },
    value: {
        fontSize: 28,
        color: '#565962',
        textAlign: 'center',
    },
    dateFormat: {
        fontSize: 16,
        color: '#565962',
        textAlign: 'left',
    }
});

export default CardComponent;