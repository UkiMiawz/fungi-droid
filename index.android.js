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

var API_KEY = '352bdc4a87f11ece4fc71eeebbbafcae7f48d33e01a123c8f647380f7d51ff2ae810013d8deef886545f049a06ab4bffe492f355baf59c19df52fe00e0ac42f3eb5010516316e10eb4f5f9350f0fccf3c860ee4b1673775925e32b53c6207e81'
var PROJECT_ID = '5742044f07271914d3cbbf93';
var REQUEST_URL = 'https://api.keen.io/3.0/projects/' + PROJECT_ID + '/queries/extraction?api_key=' + API_KEY + '&event_collection=';
var REQUEST_PARAMETER = '&timezone=UTC&latest=1';

var FUNGI_HUMIDITY = REQUEST_URL + "fungi_humidity" + REQUEST_PARAMETER;
var FUNGI_TEMPERATURE = REQUEST_URL + "fungi_temperature" + REQUEST_PARAMETER;
var FUNGI_LUX = REQUEST_URL + "fungi_lux" + REQUEST_PARAMETER;

var TIMEZONE = 'Europe/Berlin'
var TIME_FORMAT = 'MMMM Do YYYY, h:mm:ss a'

class HumidityComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 != row2,
            }),
            loaded: false,
        };
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch(FUNGI_HUMIDITY)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.result),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if(!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderSensorData}
                    style={styles.listView}
                />
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading humidity sensor data...
                </Text>
            </View>
        )
    }

    renderSensorData(sensor) {
        var time = moment(sensor.timestamp).tz(TIMEZONE).format(TIME_FORMAT);
        return (
          <View style={[styles.container, styles.turquoise]}>
              <View style={styles.rightContainer}>
                  <Text style={styles.title}>Humidity </Text>
                  <Text style={styles.value}>{sensor.humidity}</Text>
                  <Text style={styles.dateFormat}>{time}</Text>
              </View>
          </View>
        );
    }
}

class LuxComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 != row2,
            }),
            loaded: false,
        };
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch(FUNGI_LUX)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.result),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if(!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderSensorData}
                    style={styles.listView}
                />
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading lux sensor data...
                </Text>
            </View>
        )
    }

    renderSensorData(sensor) {
        var time = moment(sensor.timestamp).tz(TIMEZONE).format(TIME_FORMAT);
        return (
          <View style={[styles.container, styles.yolk]}>
              <View style={styles.rightContainer}>
                  <Text style={styles.title}>Lux </Text>
                  <Text style={styles.value}>{sensor.lux}</Text>
                  <Text style={styles.dateFormat}>{time}</Text>
              </View>
          </View>
        );
    }
}

class TemperatureComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 != row2,
            }),
            loaded: false,
        };
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch(FUNGI_TEMPERATURE)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.result),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if(!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderSensorData}
                    style={styles.listView}
                />
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading temperature sensor data...
                </Text>
            </View>
        )
    }

    renderSensorData(sensor) {
        var time = moment(sensor.timestamp).tz(TIMEZONE).format(TIME_FORMAT);
        return (
          <View style={[styles.container, styles.melon]}>
              <View style={styles.rightContainer}>
                  <Text style={styles.title}>Temperature </Text>
                  <Text style={styles.value}>{sensor.temperature}</Text>
                  <Text style={styles.dateFormat}>{time}</Text>
              </View>
          </View>
        );
    }
}

class AwesomeProject extends Component {
    render() {
        return (
            <View>
                <TemperatureComponent />
                <HumidityComponent />
                <LuxComponent />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    turquoise: {
        backgroundColor: '#01B9BB',
    },
    yolk: {
        backgroundColor: '#F7D22B',
    },
    melon: {
        backgroundColor: '#F25E42',
    },
    rightContainer: {
        flex: 1,
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        color: '#ffffff',
        textAlign: 'center',
    },
    value: {
      fontSize: 28,
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 8,
    },
    dateFormat: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
    },
    listView: {
        backgroundColor: '#F5FCFF',
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
