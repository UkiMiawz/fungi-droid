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
import * as GLOBAL from './components/Globals';

var base = Rebase.createClass(GLOBAL.FIREBASE.URL);

class ContainerProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            humidities: [],
            temperatures: [],
            luxes: [],
            lightAutomations: [],
            loading: true
        }
    }

    componentDidMount(){
        base.bindToState(GLOBAL.FIREBASE.FUNGI_TEMPERATURE, {
            context: this,
            state: 'temperatures',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });

        base.bindToState(GLOBAL.FIREBASE.FUNGI_HUMIDITY, {
            context: this,
            state: 'humidities',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });

        base.bindToState(GLOBAL.FIREBASE.FUNGI_LUX, {
            context: this,
            state: 'luxes',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });

        base.bindToState(GLOBAL.FIREBASE.FUNGI_AUTOMATION, {
            context: this,
            state: 'lightAutomations',
            asArray: true,
            queries: {
                orderByChild: 'name',
                equalTo: 'light',
                limitToLast: 1
            }
        });

        this.state.loading = false;
    }

    render() {

        if(this.state.temperatures.length > 0 && this.state.humidities.length > 0 && this.state.luxes.length > 0
            && this.state.lightAutomations.length > 0 && this.state.loading == false)
        {
                return (
                    <View style={styles.container}>
                        <Image source={require('./images/background.png')} style={styles.backgroundImage} resizeMode={Image.resizeMode.cover}>
                        <HeaderComponent />
                        <View style={styles.bodyView}>
                            <View>
                                <CardComponent title="Temperature" value={this.state.temperatures[0].temperature + "°"}
                                imageIcon={require("./images/termometer.png")}
                                valueRaw={this.state.temperatures[0].temperature} min={GLOBAL.TEMPERATURE.MIN} max={GLOBAL.TEMPERATURE.MAX}
                                limit={GLOBAL.TEMPERATURE.LIMIT}/>
                            </View>
                            <View>
                                <CardComponent title="Humidity" value={this.state.humidities[0].humidity + "%"}
                                imageIcon={require("./images/humidity.png")}
                                valueRaw={this.state.humidities[0].humidity} min={GLOBAL.HUMIDITY.MIN} max={GLOBAL.HUMIDITY.MAX}
                                limit={GLOBAL.HUMIDITY.LIMIT}/>
                            </View>
                            <View>
                                <CardComponent title="Lux" value={Math.round(this.state.luxes[0].lux)}
                                imageIcon={require("./images/light.png")}
                                valueRaw={this.state.luxes[0].lux} min={GLOBAL.LUX.MIN} max={GLOBAL.LUX.MAX} limit={GLOBAL.LUX.LIMIT}/>
                            </View>
                        </View>
                        <View><StatusComponent humidity={this.state.humidities[0].humidity}
                                lux={this.state.luxes[0].lux} temperature={this.state.temperatures[0].temperature} /></View>
                        <View><AutomationComponent lightAutomations={this.state.lightAutomations}
                                lightAutomation={this.state.lightAutomations[0].value} /></View>
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
