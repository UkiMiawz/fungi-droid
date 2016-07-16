import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableNativeFeedback,
    TextInput,
    ScrollView,
} from 'react-native';
import Rebase from 're-base';
import moment from 'moment';
import tz from 'moment-timezone';

import * as GLOBAL from './Globals';

var base = Rebase.createClass(GLOBAL.FIREBASE.URL);

var TIMEZONE = 'Europe/Berlin';
var DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

var timestampText = moment().unix();
var timeText = moment().tz(TIMEZONE).format(DATE_FORMAT);

class SettingsComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            parameters: [],
            loading: true,
            modalVisible: false,
            lux_min: 0,
            lux_max: 0,
            humidity_max: 0,
            humidity_min: 0,
            temperature_max: 0,
            temperature_min: 0,
            reload: false,
        }
    }

    componentDidMount(){
        base.bindToState(GLOBAL.FIREBASE.FUNGI_PARAMETERS, {
            context: this,
            state: 'parameters',
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToLast: 1
            }
        });

        this.state.loading = false;
        this.state.reload = true;
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
        this.state.reload = true;
    }

    _onPressSubmit = function(){
        base.push(GLOBAL.FIREBASE.FUNGI_PARAMETERS, {
                data: {
                    timestamp: timestampText,
                    created_at: timeText,
                    client: "android",
                    param_humidity: {
                      max: parseInt(this.state.humidity_max),
                      min: parseInt(this.state.humidity_min)
                    },
                    param_lux: {
                      max: parseInt(this.state.lux_max),
                      min: parseInt(this.state.lux_min)
                    },
                    param_temperature: {
                      max: parseInt(this.state.temperature_max),
                      min: parseInt(this.state.temperature_min)
                    },
                },
                context: this,
                then: () => {
                    console.log('POSTED TO PARAMETERS');
                }
        });

        this._setModalVisible(!this.state.modalVisible);
    }

    render() {
      if(this.state.loading == false && this.state.parameters.length > 0){

        if(this.state.reload){
          this.state.temperature_max = this.state.parameters[0].param_temperature.max;
          this.state.temperature_min = this.state.parameters[0].param_temperature.min;

          this.state.humidity_max = this.state.parameters[0].param_humidity.max;
          this.state.humidity_min = this.state.parameters[0].param_humidity.min;

          this.state.lux_max = this.state.parameters[0].param_lux.max;
          this.state.lux_min = this.state.parameters[0].param_lux.min;

          this.state.reload = false;
        }

        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <ScrollView contentContainerStyle={styles.containerModal}>
                      <View style={styles.containerHeader}>
                        <Image style={styles.bgImage} source={require("../images/settingsCover.png")} resizeMode={Image.resizeMode.stretch}>
                          <Text style={styles.textHeader}>Settings</Text>
                        </Image>
                      </View>
                      <View style={styles.formContainer}>

                        <Text style={styles.textTitle}>Temperature</Text>
                        <View style={styles.textForms}>
                          <Text style={styles.textLabel}>Min</Text>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(temperature_min) => this.setState({temperature_min})}
                            value={this.state.temperature_min.toString()}
                          />
                          <Text style={styles.textLabel}>Max</Text>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(temperature_max) => this.setState({temperature_max})}
                            value={this.state.temperature_max.toString()}
                          />
                        </View>

                        <Text style={styles.textTitle}>Humidity</Text>
                        <View style={styles.textForms}>
                          <Text style={styles.textLabel}>Min</Text>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(humidity_min) => this.setState({humidity_min})}
                            value={this.state.humidity_min.toString()}
                          />
                          <Text style={styles.textLabel}>Max</Text>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(humidity_max) => this.setState({humidity_max})}
                            value={this.state.humidity_max.toString()}
                          />
                        </View>

                        <Text style={styles.textTitle}>Lux</Text>
                        <View style={styles.textForms}>
                          <Text style={styles.textLabel}>Min</Text>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(lux_min) => this.setState({lux_min})}
                            value={this.state.lux_min.toString()}
                          />
                          <Text style={styles.textLabel}>Max</Text>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(lux_max) => this.setState({lux_max})}
                            value={this.state.lux_max.toString()}
                          />
                        </View>

                      </View>

                      <View style={styles.buttonContainer}>
                        <TouchableNativeFeedback
                            onPress={() => {this._setModalVisible(!this.state.modalVisible)}}
                           background={TouchableNativeFeedback.SelectableBackground()}>
                           <View style={styles.containerGreen}>
                               <View style={styles.valueContainer}>
                                   <Text style={styles.textSetting}>Cancel</Text>
                               </View>
                           </View>
                       </TouchableNativeFeedback>
                       <TouchableNativeFeedback
                           onPress={() => {this._onPressSubmit()}}
                          background={TouchableNativeFeedback.SelectableBackground()}>
                          <View style={styles.container}>
                              <View style={styles.valueContainer}>
                                  <Text style={styles.textSetting}>Save changes</Text>
                              </View>
                          </View>
                      </TouchableNativeFeedback>
                      </View>
                    </ScrollView>
                </Modal>
            <View style={styles.container}>
                <TouchableNativeFeedback
                    onPress={() => {this._setModalVisible(!this.state.modalVisible)}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.containerBox}>
                        <Image source={require("../images/settings.png")} style={styles.iconImage} resizeMode={Image.resizeMode.contain}></Image>
                        <View style={styles.valueContainer}>
                            <Text style={styles.textSetting}>Settings</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
          </View>
        );
      }

      return(
        <View style={styles.container}><Text>Loading...</Text></View>
      )
  }
}

const styles = StyleSheet.create({
    textForms: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    textTitle: {
      fontSize: 16,
    },
    bgImage: {
      flex: 1,
      width: null,
      height: null,
    },
    formContainer: {
      flex: 1,
      margin: 10,
      marginTop: 30,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    textLabel: {
      flex: 1,
      margin: 10,
      borderColor: 'gray',
      borderWidth: 1,
    },
    textInput: {
      flex: 1,
      height: 35,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 20,
    },
    containerHeader: {
      flex: 0.3,
      flexDirection: 'column',
    },
    containerModal: {
        borderWidth: 1,
        borderColor: '#555555',
        flex: 1,
        margin: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    container: {
        borderWidth: 1,
        borderColor: '#ffffff',
        flex: 0.3,
        backgroundColor: '#000000',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
    },
    containerGreen: {
        borderWidth: 1,
        borderColor: '#ffffff',
        flex: 0.3,
        backgroundColor: '#72a433',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
    },
    containerBox: {
        flex: 0.3,
        width: 170,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        flex: 1,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSetting: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center'
    },
    textHeader: {
        fontSize: 24,
        color: '#000000',
        textAlign: 'left',
        margin: 10,
    },
    imageLoading: {
        flex: 1,
        width: 300,
        height: 200,
    },
    valueContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsComponent;
