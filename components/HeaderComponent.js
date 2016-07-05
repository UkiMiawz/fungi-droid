import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View
} from 'react-native';

class HeaderComponent extends Component {
    render() {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Fungi</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00B1DA',
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        color: '#ffffff',
    }
});

export default HeaderComponent;