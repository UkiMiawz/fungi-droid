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

class CardComponent extends Component {
  render() {
    var time = moment(this.props.timestamp).tz(TIMEZONE).format(TIME_FORMAT);
    return(
      <View style={[styles.container]}>
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
  render(){
    return(
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
      <LoadingView title="humidity" />
    );
  }

  renderSensorData(sensor) {
    return (
      <CardComponent title="Humidity" value={sensor.humidity} timestamp={sensor.timestamp} colorStyle={turquoise} />
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
      <LoadingView title="lux" />
    );
  }

  renderSensorData(sensor) {
    return (
      <CardComponent title="Lux" value={sensor.lux} timestamp={sensor.timestamp} colorStyle={yolk} />
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
      <LoadingView title="temperature" />
    );
  }

  renderSensorData(sensor) {
    return (
      <CardComponent title="Temperature" value={sensor.temperature} timestamp={sensor.timestamp} colorStyle={melon} />
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
    alignItems: 'center',
    backgroundColor: '#DFDFE1',
    margin: 10,
  },
  header: {
    padding: 10,
    alignSelf: 'stretch',
  },
  footer: {
    borderTopColor: '#C0C0C4',
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
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
