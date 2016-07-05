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
import moment from 'moment';
import tz from 'moment-timezone';
import Rebase from 're-base';

var base = Rebase.createClass('https://fungi-5edf1.firebaseio.com');

var API_KEY = '352bdc4a87f11ece4fc71eeebbbafcae7f48d33e01a123c8f647380f7d51ff2ae810013d8deef886545f049a06ab4bffe492f355baf59c19df52fe00e0ac42f3eb5010516316e10eb4f5f9350f0fccf3c860ee4b1673775925e32b53c6207e81'
var PROJECT_ID = '5742044f07271914d3cbbf93';
var REQUEST_URL = 'https://api.keen.io/3.0/projects/' + PROJECT_ID + '/queries/extraction?api_key=' + API_KEY + '&event_collection=';
var REQUEST_PARAMETER = '&timezone=UTC&latest=1';

var FUNGI_HUMIDITY = REQUEST_URL + "fungi_humidity" + REQUEST_PARAMETER;
var FUNGI_TEMPERATURE = REQUEST_URL + "fungi_temperature" + REQUEST_PARAMETER;
var FUNGI_LUX = REQUEST_URL + "fungi_lux" + REQUEST_PARAMETER;

var TIMEZONE = 'Europe/Berlin';
var TIME_FORMAT = 'MMMM Do YYYY, hh:mm:ss';

var minTemperature = 18;
var maxTemperature = 28;

var minHumidity = 60;
var maxHumidity = 90;

var minLux = 90;
var maxLux = 110;

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

class LoadingView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading {this.props.title} sensor data...
                </Text>
            </View>
        );
    }
}

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
            <View>
            <CardComponent title="Humidity" value="0" timestamp="_" colorStyle={turquoise}/>
            </View>
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
            <View>
            <CardComponent title="Lux" value="0" timestamp="_" colorStyle={yolk}/>
            </View>
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
            <View>
            <CardComponent title="Temperature" value="0" timestamp="_" colorStyle={melon}/>
            </View>
    );
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Fungi</Text>
            </View>
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

var turquoise = {
    backgroundColor: '#01B9BB',
}

var melon = {
    backgroundColor: '#F25E42',
}

var yolk = {
    backgroundColor: '#F7D22B',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardView: {
        margin: 10,
        backgroundColor: '#DFDFE1',
    },
    bodyView: {
        margin: 10,
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
    thumbnail: {
        width: 53,
        height: 81,
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
    },
    listView: {
        backgroundColor: '#F5FCFF',
    },
    headerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00B1DA',
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        color: '#ffffff',
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
