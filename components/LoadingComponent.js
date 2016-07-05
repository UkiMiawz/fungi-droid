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
                <Text>
                    Loading {this.props.title} sensor data...
                </Text>
            </View>
        );
    }
}

export default LoadingComponent;