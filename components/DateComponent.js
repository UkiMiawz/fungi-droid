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
var DATE_FORMAT = 'MMM.DD.YYYY';
var TIME_FORMAT = 'hh:mm:ss';

class DateComponent extends Component {

    render() {

        var timestampText = moment(this.props.timestamp);
        var dateText = timestampText.tz(TIMEZONE).format(DATE_FORMAT);
        var timeText = timestampText.tz(TIMEZONE).format(TIME_FORMAT);

        return (
            <View style={[styles.dateView]}>
                <View style={[styles.cardView]}>
                    <View style={styles.valueContainer}>
                        <Text style={styles.hour}>{timeText}</Text>
                        <Text style={styles.date}>{dateText}</Text>
                        <Text style={styles.text}>Last Server Sync</Text>
                    </View>
                </View>
            </View>

    );
    }
}

const styles = StyleSheet.create({
    dateView: {
        paddingBottom: 10,
        flexDirection: 'row',
    },
    cardView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    valueContainer: {
        flex: 0.3,
        paddingRight: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    hour: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
    },
    date: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: '#ffffff',
        textAlign: 'center',
    }
});

export default DateComponent;