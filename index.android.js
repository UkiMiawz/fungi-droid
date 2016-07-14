/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Rebase from 're-base';

import CardComponent from './components/CardComponent'
import HeaderComponent from './components/HeaderComponent'
import LoadingComponent from './components/LoadingComponent'
import StatusComponent from './components/StatusComponent'
import AutomationComponent from './components/AutomationComponent'
import DateComponent from './components/DateComponent'

var FIREBASE_URL = "https://fungi-5edf1.firebaseio.com";

var FUNGI_HUMIDITY = "fungi_humidity";
var FUNGI_TEMPERATURE = "fungi_temperature";
var FUNGI_LUX = "fungi_lux";

var minTemperature = 18;
var maxTemperature = 28;
var limitTemperature = 50;

var minHumidity = 60;
var maxHumidity = 90;
var limitHumidity = 100;

var minLux = 90;
var maxLux = 110;
var limitLux = 200;

var base = Rebase.createClass(FIREBASE_URL);

class ContainerProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            humidities: [],
            temperatures: [],
            luxes: [],
            loading: true
        }
    }

    componentDidMount(){
        base.bindToState(FUNGI_TEMPERATURE, {
            context: this,
            state: 'temperatures',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });

        base.bindToState(FUNGI_HUMIDITY, {
            context: this,
            state: 'humidities',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });

        base.bindToState(FUNGI_LUX, {
            context: this,
            state: 'luxes',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });
    }

    render() {

        if(this.state.temperatures.length > 0 && this.state.humidities.length > 0 && this.state.luxes.length > 0)
        {
                return (
                    <View style={styles.container}>
                        <Image source={require('./images/background.png')} style={styles.backgroundImage} resizeMode={Image.resizeMode.cover}>
                        <HeaderComponent />
                        <View style={styles.bodyView}>
                            <View>
                                <CardComponent title="Temperature" value={this.state.temperatures[0].temperature + "°"}
                                imageIcon={require("./images/termometer.png")}
                                valueRaw={this.state.temperatures[0].temperature} min={minTemperature} max={maxTemperature} limit={limitTemperature}/>
                            </View>
                            <View>
                                <CardComponent title="Humidity" value={this.state.humidities[0].humidity + "%"}
                                imageIcon={require("./images/humidity.png")}
                                valueRaw={this.state.humidities[0].humidity} min={minHumidity} max={maxHumidity} limit={limitHumidity}/>
                            </View>
                            <View>
                                <CardComponent title="Lux" value={Math.round(this.state.luxes[0].lux)}
                                imageIcon={require("./images/light.png")}
                                valueRaw={this.state.luxes[0].lux} min={minLux} max={maxLux} limit={limitLux}/>
                            </View>
                        </View>
                        <View><StatusComponent /></View>
                        <View><AutomationComponent /></View>
                        <View><DateComponent timestamp={this.state.humidities[0].created_date}/></View>
                        </Image>
                    </View>
                );
        }

        return (
            <LoadingComponent title="all"/>
        );
    }
}

class AwesomeProject extends Component {
    render() {
        return (
            <ContainerProject />
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    bodyView: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
