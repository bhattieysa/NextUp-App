import React from 'react'
import { Pressable, Keyboard } from 'react-native';
import { Colors } from '../../constants';

const KeyBoardDismissHandler = ({ action = () => { }, ...props }) => <Pressable activeOpacity={1} style={{ flex: 1, backgroundColor: Colors.white }}
    onPress={() => { Keyboard.dismiss(); action() }}>
    {props.children}
</Pressable>

export default KeyBoardDismissHandler