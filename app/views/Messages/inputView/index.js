import React from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, Dimensions, Keyboard } from 'react-native'

let wide = Dimensions.get('window').width
const Input = ({ pickImageVideo,
    sendMsg, onChange, valForInput }) => <View style={{ marginVertical: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <TextInput
            style={{
                height: 46, borderRadius: 23, backgroundColor: "rgb(39,42,49)",
                width: "90%", color: '#fff', paddingTop: 15, paddingLeft: 20, paddingRight: wide * 0.28
            }}
            multiline
            placeholder={"Type a message"}
            placeholderTextColor={"rgb(117,118,124)"}
            onChangeText={(e) => onChange(e)}
            value={valForInput}
            autoCorrect={false}
            // onSubmit={Keyboard.dismiss(0)}
            blurOnSubmit={false}
        />
        <TouchableOpacity onPress={pickImageVideo} style={{
            position: 'absolute', height: 30, width: 40,
            right: wide * 0.16,
        }}>
            <Image style={{
                height: 30,
                width: 30
            }}
                source={require('../Assets/CameraIcon.png')} resizeMode={'contain'} />
        </TouchableOpacity>
        <TouchableOpacity

            onPress={() => sendMsg()}
            style={{
                position: 'absolute',
                width: 40, height: 30, right: wide * 0.05,
            }}>
            <Image style={{

                width: 30, height: 30, tintColor: '#979797'
            }} source={require('../Assets/sent.png')} resizeMode={'contain'} />
        </TouchableOpacity>
    </View>

export default Input