import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View
} from 'react-native';

/* Splash screen loading component, no logic here */

class LoadingComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../images/spritFungi.png')} style={styles.imageLoading} resizeMode={Image.resizeMode.contain}></Image>
                <Text style={styles.textLoading}>
                    Loading {this.props.title} sensors data...
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
        flex: 1,
        fontSize: 20,
        color: "#ffffff"
    },
    imageLoading: {
        flex: 1,
        width: 300,
        height: 200,
    },
});

export default LoadingComponent;
