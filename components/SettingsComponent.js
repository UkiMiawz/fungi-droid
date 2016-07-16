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
            <View style={styles.container}>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <Text>Test</Text>
                    <TouchableNativeFeedback
                        onPress={() => {this._setModalVisible(!this.state.modalVisible)}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.containerModal}>
                            <View>
                                <Text style={styles.textSetting}>Settings</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </Modal>
            <View>
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
}

const styles = StyleSheet.create({
    containerModal: {
        borderWidth: 1,
        borderColor: '#555555',
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
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
    imageLoading: {
        flex: 1,
        width: 300,
        height: 200,
    },
    valueContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsComponent;