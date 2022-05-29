import React from 'react';
import { Text, View, Linking, StyleSheet } from 'react-native';
import RNUrlPreview from 'react-native-url-preview';
import { Layout } from '../../../constants';

let wide = Layout.width;
const LinkLabel = ({ data, style, size = 14, bold, color, italic, ...props }) => (
    <>
        <RNUrlPreview
            text={data}
            containerStyle={styles.container}
            titleStyle={styles.title}
            imageStyle={styles.imgStyle}
        // faviconStyle={styles.faviconStyle}
        // textContainerStyle={styles.title}
        />
        <Text
            {...props}
            onPress={() => Linking.openURL(data)}
            style={[
                { ...style },
                bold && { fontWeight: 'bold' },
                size && { fontSize: size },
                color && { color: color, },
                italic && { fontStyle: 'italic', borderRadius }
            ]}>
            {data}
            {props.children}
        </Text>
    </>
);

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        backgroundColor: "lightgray",
        borderRadius: 10,
        padding: wide * 0.01,
    },
    title: {
        fontWeight: 'bold',
    },
    imgStyle: {
        // marginTop: 2,
        width: "100%",
        height: wide * 0.34,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

})

export default LinkLabel