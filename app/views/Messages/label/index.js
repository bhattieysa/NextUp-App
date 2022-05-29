import React from 'react';
import { Text, View } from 'react-native';

const Label = ({ data, style, size = 14, bold, color, italic, ...props }) => (
    <Text
        {...props}
        style={[
            { ...style },
            bold && { fontWeight: 'bold' },
            size && { fontSize: size },
            color && { color: color, },
            italic && { fontStyle: 'italic' }
        ]}
    >
        {data}
        {props.children}
    </Text>
);

export default Label