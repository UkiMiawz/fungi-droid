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
} from 'react-native';

class SettingsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={styles.valueContainer}>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <Text>Test</Text>
                    <TouchableNativeFeedback
                        onPress={() => {this._setModalVisible(!this.state.modalVisible)}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.container}>
                            <View style={styles.valueContainer}>
                                <Text style={styles.textSetting}>Settings</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </Modal>
                <TouchableNativeFeedback
                    onPress={() => {this._setModalVisible(!this.state.modalVisible)}}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.container}>
                        <View style={styles.valueContainer}>
                            <Text style={styles.textSetting}>Settings</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>

            </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ffffff',
        flex: 0.3,
        backgroundColor: '#000000',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
    },
    textSetting: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center'
    },
    imageLoading: {
        flex: 1,
        width: 300,
        height: 200,
    },
});

export default SettingsComponent;