import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View
} from 'react-native';

class LoadingComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textLoading}>
                    Loading {this.props.title} sensor data...
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000",
    },
    textLoading: {
        fontSize: 30,
        color: "#ffffff"
    }
});

export default LoadingComponent;