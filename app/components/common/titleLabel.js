import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import {
    CommonStyles,
    Colors,
    Layout,
    Container,
    Fonts,
} from '../../constants';


export const Title = ({ data }) => {
    return (
        <View style={{
            width: '100%', flexDirection: 'row', alignItems: 'center',
        }}>
            <View style={{
                backgroundColor: Colors.fontColorGray, width: '5%', height: '2%',
                borderBottomColor: Colors.fontColorGray,
            }} />
            <Text style={{
                color: Colors.titleLabelColor, fontSize: 16,
                lineHeight: 24, fontFamily: Fonts.Bold,
                // width: Platform.OS == 'ios' ? '37%' : '35%', 
                marginLeft: 10,
            }}>
                {data}
            </Text>
            <View style={{
                width: '100%', height: '2%', borderColor: Colors.fontColorGray,
                backgroundColor: Colors.fontColorGray,
                marginLeft: 10
            }} />
        </View>

    )
}