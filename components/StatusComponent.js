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

class StatusComponent extends Component {
    render() {
        return (
            <View style={[styles.statusView]}>
                <Image source={require("../images/spritFungi.png")} style={styles.iconImage} resizeMode={Image.resizeMode.cover}></Image>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    statusView: {
        flex: 1,
        backgroundColor: '#000000',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    iconImage: {
        flex: 1,
        width: 200,
        height: 200,
    }
});

export default StatusComponent;