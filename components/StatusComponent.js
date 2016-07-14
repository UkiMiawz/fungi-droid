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

class StatusComponent extends Component {
    render() {
        return (
            <View style={[styles.statusView]}>
                <Image source={getStatusImage(this.props.humidity, this.props.lux, this.props.temperature)} style={styles.iconImage} resizeMode={Image.resizeMode.cover}></Image>
            </View>
    );
    }
}

getStatusImage= function(humidity, lux, temperature){
    if(humidity < GLOBAL.HUMIDITY.MAX && humidity > GLOBAL.HUMIDITY.MIN
    && lux < GLOBAL.LUX.MAX && humidity > GLOBAL.LUX.MIN
    && temperature < GLOBAL.TEMPERATURE.MAX && humidity > GLOBAL.TEMPERATURE.MIN){
        return require("../images/spritFungi1.png");
    }
    else {
        //calculate which is more urgent by differences
        var humidityDiff = 0;
        var temperatureDiff = 0;
        var luxDiff = 0;

        if(humidity < GLOBAL.HUMIDITY.MIN)
            humidityDiff = GLOBAL.HUMIDITY.MIN - humidity;
        else if(humidity > GLOBAL.HUMIDITY.MAX)
            humidityDiff = humidity - GLOBAL.HUMIDITY.MAX;

        if(temperature < GLOBAL.TEMPERATURE.MIN)
            temperatureDiff = GLOBAL.TEMPERATURE.MIN - temperature;
        else if(humidity > GLOBAL.TEMPERATURE.MAX)
            temperatureDiff = temperature - GLOBAL.TEMPERATURE.MAX;

        if(lux < GLOBAL.LUX.MIN)
            luxDiff = GLOBAL.LUX.MIN - lux;
        else if(humidity > GLOBAL.LUX.MAX)
            luxDiff = lux - GLOBAL.LUX.MAX;

        if(humidityDiff > temperatureDiff && humidityDiff > luxDiff)
            return require("../images/spritFungi2.png");
        else if(luxDiff > temperatureDiff && luxDiff > humidityDiff)
            return require("../images/spritFungi5.png");
        else
            if(temperature > GLOBAL.TEMPERATURE.MAX)
                return require("../images/spritFungi4.png");
            else
                return require("../images/spritFungi3.png");
    }
}

const styles = StyleSheet.create({
    statusView: {
        flex: 1,
        backgroundColor: '#000000',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    iconImage: {
        flex: 1,
        width: 200,
        height: 200,
    }
});

export default StatusComponent;