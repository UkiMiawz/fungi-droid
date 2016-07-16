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

import * as GLOBAL from './Globals';

var base = Rebase.createClass(GLOBAL.FIREBASE.URL);

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
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
      if(this.state.loading == false && this.state.parameters.length > 0){
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
                        <Text>Temperature</Text>
                        <TextInput
                          style={styles.TextInput}
                          onChangeText={(temperature_min) => this.setState({temperature_min})}
                          value={this.state.parameters[0].param_temperature.min.toString()}
                        />
                        <TextInput
                          style={styles.TextInput}
                          onChangeText={(temperature_max) => this.setState({temperature_max})}
                          value={this.state.parameters[0].param_temperature.max.toString()}
                        />
                        <Text>Humidity</Text>
                        <TextInput
                          style={styles.TextInput}
                          onChangeText={(humidity_min) => this.setState({humidity_min})}
                          value={this.state.parameters[0].param_humidity.min.toString()}
                        />
                        <TextInput
                          style={styles.TextInput}
                          onChangeText={(humidity_max) => this.setState({humidity_max})}
                          value={this.state.parameters[0].param_humidity.max.toString()}
                        />
                        <Text>Lux</Text>
                        <TextInput
                          style={styles.TextInput}
                          onChangeText={(lux_min) => this.setState({lux_min})}
                          value={this.state.parameters[0].param_lux.min.toString()}
                        />
                        <TextInput
                          style={styles.TextInput}
                          onChangeText={(lux_max) => this.setState({lux_max})}
                          value={this.state.parameters[0].param_lux.max.toString()}
                        />
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
                           onPress={() => {this._setModalVisible(!this.state.modalVisible)}}
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
    bgImage: {
      flex: 1,
      width: null,
      height: null,
    },
    formContainer: {
      flex: 1,
      margin: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
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
