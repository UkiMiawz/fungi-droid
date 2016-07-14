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
import * as GLOBAL from './Globals';

class CardComponent extends Component {
    render() {
        return (
            <View style={[styles.cardView]}>
                <Image source={this.props.imageIcon} style={styles.iconImage} resizeMode={Image.resizeMode.contain}></Image>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{this.props.value}</Text>
                </View>
                <View style={[styles.statusView]}>
                    <View style={statusStyle(this.props.valueRaw, this.props.min, this.props.max, this.props.limit)}></View>
                </View>
        </View>
        );
    }
}

calculatePercentage = function(value, limit){
    return Math.round((value / limit) * 100);
}

generateColor = function(value, minValue, maxValue) {
    if(value > maxValue)
        return GLOBAL.COLORS.RED;
    else if(value < minValue)
        return GLOBAL.COLORS.YELLOW;
    else
        return GLOBAL.COLORS.GREEN;
}

statusStyle = function(value, minValue, maxValue, limit) {
    return {
        backgroundColor: generateColor(value, minValue, maxValue),
        height: 4,
        width: calculatePercentage(value, limit),
    }
}

const styles = StyleSheet.create({
    statusView: {
        borderWidth: 1,
        borderColor: '#818181',
        height: 5,
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