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

var API_KEY = '352bdc4a87f11ece4fc71eeebbbafcae7f48d33e01a123c8f647380f7d51ff2ae810013d8deef886545f049a06ab4bffe492f355baf59c19df52fe00e0ac42f3eb5010516316e10eb4f5f9350f0fccf3c860ee4b1673775925e32b53c6207e81'
var PROJECT_ID = '5742044f07271914d3cbbf93';
var REQUEST_URL = 'https://api.keen.io/3.0/projects/' + PROJECT_ID + '/queries/extraction?api_key=' + API_KEY + '&event_collection=';
var REQUEST_PARAMETER = '&timezone=UTC&latest=1';
var FIREBASE_URL = "https://fungi-5edf1.firebaseio.com";

var FUNGI_HUMIDITY = REQUEST_URL + "fungi_humidity" + REQUEST_PARAMETER;
var FUNGI_TEMPERATURE = REQUEST_URL + "fungi_temperature" + REQUEST_PARAMETER;
var FUNGI_LUX = REQUEST_URL + "fungi_lux" + REQUEST_PARAMETER;

var minTemperature = 18;
var maxTemperature = 28;

var minHumidity = 60;
var maxHumidity = 90;

var minLux = 90;
var maxLux = 110;

var base = Rebase.createClass(FIREBASE_URL);

class HumidityComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            loading: true
        }
    }

    componentDidMount(){
        base.bindToState('fungi_humidity', {
            context: this,
            state: 'items',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });
    }

    render() {
        if (!this.state.loading) {
            return this.renderLoadingView();
        }

        if(this.state.items.length > 0)
        {
            return (
                <View>
                    <CardComponent title="Humidity" value={this.state.items[0].humidity} timestamp={this.state.items[0].created_date} colorStyle={turquoise}/>
                </View>
            );
        }

        return (
            <LoadingComponent title="humidity"/>
        );
    }
}

class LuxComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            loading: true
        }
    }

    componentDidMount(){
        base.bindToState('fungi_lux', {
            context: this,
            state: 'items',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });
    }

    render() {
        if (!this.state.loading) {
            return this.renderLoadingView();
        }

        if(this.state.items.length > 0)
        {
            return (
                <View>
                    <CardComponent title="Lux" value={Math.round(this.state.items[0].lux * 100) / 100} timestamp={this.state.items[0].created_date} colorStyle={yolk}/>
                </View>
            );
        }

        return (
            <LoadingComponent title="lux"/>
        );
    }
}

class TemperatureComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            loading: true
        }
    }

    componentDidMount(){
        base.bindToState('fungi_temperature', {
            context: this,
            state: 'items',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });
    }

    render() {
        if (!this.state.loading) {
            return this.renderLoadingView();
        }

        if(this.state.items.length > 0)
        {
            return (
                <View>
                    <CardComponent title="Temperature" value={this.state.items[0].temperature} timestamp={this.state.items[0].created_date} colorStyle={melon}/>
                </View>
            );
        }

        return (
            <LoadingComponent title="temperature"/>
        );
    }
}

class AwesomeProject extends Component {
    render() {
        return (
            <View>
                <HeaderComponent />
                <View style={styles.bodyView}>
                    <TemperatureComponent />
                    <HumidityComponent />
                    <LuxComponent />
                </View>
            </View>
        );
    }
}

var turquoise = { backgroundColor: '#01B9BB', }
var melon = { backgroundColor: '#F25E42', }
var yolk = { backgroundColor: '#F7D22B', }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyView: {
        margin: 10,
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
