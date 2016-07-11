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

var width = Dimensions.get('window').width;

class AutomationComponent extends Component {
    render() {
        return (
            <View style={[styles.automationView]}>
                <View style={[styles.cardView]}>
                    <Image source={require("../images/lightOn.png")} style={styles.iconImage} resizeMode={Image.resizeMode.contain}></Image>
                    <View style={styles.valueContainer}>
                        <Text style={styles.value}>Turn Off</Text>
                    </View>
                </View>
                <View style={[styles.cardView]}>
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
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardView: {
        flex: 0.2,
        backgroundColor: '#000000',
        padding: 10,
        flexDirection: 'row',
    },
    iconImage: {
        flex: 0.25,
        width: 50,
        height: 40,
        alignSelf: 'center',
    },
    valueContainer: {
        flex: 0.75,
    },
    value: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center',
    }
});

export default AutomationComponent;