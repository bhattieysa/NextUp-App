import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    CommonStyles,
    Colors,
    Layout,
    Container,
    Fonts,
} from '../../constants';


export const Card = ({ ...props }) => {
    return (
        <LinearGradient
            colors={['#272930', '#181A20', 'black']}
            // colors={['yellow', 'green', 'black']}

            // collapsable={false}
            style={[props.style]}
            start={{ x: 0.22, y: 0.25 }} end={{ x: 0.2, y: 1.4 }}

        // shadowColor={['black']}
        >
            {props.children}
        </LinearGradient>

    )
}

var styles = StyleSheet.create({
    linearGradient: {
        // flex: 1,
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 30
        shadowColor: 'red',
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 1,
        shadowOpacity: 0.5,
        elevation: 8,
        backgroundColor: 'black'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});