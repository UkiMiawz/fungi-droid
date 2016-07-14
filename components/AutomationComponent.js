import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

class AutomationComponent extends Component {
    render() {
        return (
            <View style={[styles.automationView]}>
                <View style={[styles.cardViewLight]}>
                    <Image source={require("../images/lightOn.png")} style={styles.iconImage} resizeMode={Image.resizeMode.contain}></Image>
                    <View style={styles.valueContainer}>
                        <Text style={styles.value}>Turn Off</Text>
                    </View>
                </View>
                <View style={[styles.cardViewWatering]}>
                    <Image source={require("../images/watering.png")} style={styles.iconImage} resizeMode={Image.resizeMode.contain}></Image>
                    <View style={styles.valueContainer}>
                        <Text style={styles.value}>Watering</Text>
                    </View>
                </View>
            </View>

    );
    }
}

const styles = StyleSheet.create({
    automationView: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardViewLight: {
        borderWidth: 1,
        borderColor: '#ffffff',
        flex: 0.3,
        backgroundColor: '#000000',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
    },
    cardViewWatering: {
        borderWidth: 1,
        borderColor: '#ffffff',
        flex: 0.3,
        backgroundColor: '#000000',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        opacity: 0.5,
    },
    iconImage: {
        flex: 1,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    value: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center',
    }
});

export default AutomationComponent;