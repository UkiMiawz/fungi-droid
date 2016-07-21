import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableNativeFeedback,
} from 'react-native';
import Rebase from 're-base';
import moment from 'moment';
import tz from 'moment-timezone';

import SettingsComponent from './SettingsComponent';
import * as GLOBAL from './Globals';

/* Component for the light button to trigger light on or off */

//calculate timestamp
var timestampText = moment().unix();
var timeText = moment().tz(GLOBAL.TIMEZONE.LOCAL_TIMEZONE).format(GLOBAL.TIMEZONE.DATE_FORMAT);

//firebase client
var base = Rebase.createClass(GLOBAL.FIREBASE.URL);

class AutomationComponent extends Component {

    _onPressLight = function(value){
        var newValue = 0;
        if(value == 0)
            newValue = 1;

        //push automation data to firebase on pressing light button in the app
        base.push(GLOBAL.FIREBASE.FUNGI_AUTOMATION, {
                data: {
                    name: GLOBAL.FUNGI_AUTOMATION.LIGHT,
                    value: newValue,
                    timestamp: timestampText,
                    created_at: timeText,
                    client: "android"
                },
                context: this,
                then: () => {
                    console.log('POSTED TO LIGHT');
                }
        });
    }

    render() {
        return (
            <View style={[styles.automationView]}>
                <TouchableNativeFeedback
                    onPress={() => {this._onPressLight(this.props.lightAutomation)}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={automationBox(this.props.lightAutomation)}>
                        <Image source={lightImage(this.props.lightAutomation)} style={styles.iconImage} resizeMode={Image.resizeMode.contain}></Image>
                        <View style={styles.valueContainer}>
                            <Text style={textStyle(this.props.lightAutomation)}>{textValue(this.props.lightAutomation)}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <SettingsComponent />
            </View>

    );
    }
}

//generate light image on the light button
lightImage = function(value){
    if(value == 0)
        return require("../images/lightOn.png");
    else
        return require("../images/lightOff.png");
}

//generate text value on the light button
textValue = function(value){
    if(value == 0)
        return "Turn On";
    else
        return "Turn Off";
}

//generate text color on the light button
generateTextColor = function(value){
    if(value == 0)
        return GLOBAL.COLORS.WHITE;
    else
        return GLOBAL.COLORS.BLACK;
}

//generate css class for the light button texts
textStyle = function(value){
    return {
        fontSize: 20,
        color: generateTextColor(value),
        textAlign: 'center',
    }
}

//generate box background color for the light button
generateColorBox = function(value) {
    if(value == 0)
        return GLOBAL.COLORS.LIGHTOFF;
    else
        return GLOBAL.COLORS.LIGHTON;
}

//generate the light button css
automationBox = function(value) {
    return {
        backgroundColor: generateColorBox(value),
        borderWidth: 1,
        borderColor: generateTextColor(value),
        flex: 0.3,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
    }
}

const styles = StyleSheet.create({
    automationView: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardViewWatering: {
        borderWidth: 1,
        borderColor: '#ffffff',
        flex: 0.3,
        backgroundColor: '#000000',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        opacity: 0.5,
    },
    iconImage: {
        flex: 1,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AutomationComponent;
