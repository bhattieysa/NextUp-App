import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { Modal, TouchableOpacity, View, Text } from 'react-native'
import { Colors, Fonts, Layout } from '../../../constants'

let wide = Layout.width;
let high = Layout.height;

function RoleMenuModal({ show = false, hideModal, id, removeCoach }) {

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}
            >
                <TouchableOpacity
                    onPress={() => hideModal()}
                    style={{
                        width: wide,
                        height: high,
                        justifyContent: 'center', alignItems: 'center'
                    }}
                >


                    <BlurView style={{
                        width: wide,
                        height: high,
                        position: 'absolute',
                        // justifyContent: 'center', alignItems: 'center'
                    }}
                        blurAmount={10}
                        blurRadius={10}
                    />
                    <View style={{
                        width: '60%',
                        height: wide * 0.2,
                        backgroundColor: Colors.ractangelCardColor,
                        marginTop: 20, borderRadius: 20, alignItems: 'center',

                    }}>


                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 40,
                                // backgroundColor: "yellow"
                            }}
                            onPress={() => {
                                console.log(`Removing coach with id ${id}`)
                                removeCoach(id)
                                hideModal();

                            }}
                        >
                            <View style={{ width: '60%', height: '30%', marginBottom: 40 }}>


                                {/* Menu List */}


                                <Text style={{
                                    color: Colors.light, fontSize: 15, lineHeight: 16,
                                    fontFamily: Fonts.Bold,
                                }}>{"Remove"}</Text>



                                {/* End Menu List */}

                            </View>
                        </TouchableOpacity>


                    </View>

                    {/* </BlurView> */}
                </TouchableOpacity>
            </Modal>
        </>
    )
}

export default RoleMenuModal