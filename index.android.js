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

var API_KEY = '352bdc4a87f11ece4fc71eeebbbafcae7f48d33e01a123c8f647380f7d51ff2ae810013d8deef886545f049a06ab4bffe492f355baf59c19df52fe00e0ac42f3eb5010516316e10eb4f5f9350f0fccf3c860ee4b1673775925e32b53c6207e81'
var PROJECT_ID = '5742044f07271914d3cbbf93'
var REQUEST_URL = 'https://api.keen.io/3.0/projects/' + PROJECT_ID + '/queries/extraction?api_key=' + API_KEY + '&event_collection=fungi_dht11&timezone=UTC&latest=5&timeframe=this_14_days&filters=%5B%5D';

class AwesomeProject extends Component {
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
        fetch(REQUEST_URL)
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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderSensorData}
                style={styles.listView}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading sensor data...
                </Text>
            </View>
        )
    }

    renderSensorData(sensor) {
        return (
            <View style={styles.container}>
                <View style={styles.thumbnail}>
                    <Text style={styles.year}> {sensor.keen.timestamp}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>Lux : {sensor.lux}</Text>
                    <Text style={styles.title}>Temperature : {sensor.temperature}</Text>
                    <Text style={styles.title}>Humidity : {sensor.humidity}</Text>
                </View>
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
        textAlign: 'center',
    },
    year: {
      textAlign: 'center',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
