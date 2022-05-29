import React, { useEffect, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, FlatList, Alert } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { Colors, Fonts, Layout } from '../../../constants';



let wide = Layout.width;
let high = Layout.height;

function EditAccessRole({ showModalProps = false, onHideModalProps }) {

    const [showModal, setShowModal] = useState(showModalProps);
    const [roleList, setRoleList] = useState([
        "Admin",
        "Game Support"
    ]);

    // useEffect(() => {
    //     setShowModal(showModalProps);
    // }, [showModalProps]);

    const renderRoleList = (item) => {
        return (
            <TouchableOpacity
                style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    height: 50, marginTop: 10,
                    // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
                }}
                onPress={() => {
                    // onHideModalProps(false);
                    Alert.alert("Item", `Selected Item is ${item.item}`);
                }}
            >
                <Text style={{
                    color: Colors.light, fontSize: 15, lineHeight: 16,
                    fontFamily: Fonts.Bold,
                }}>{item.item}</Text>

            </TouchableOpacity>
        )
    }

    return (
        <>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModalProps}
            >
                <TouchableOpacity
                    onPress={() => onHideModalProps()}
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
                        width: '60%', height: wide * 0.3, backgroundColor: Colors.ractangelCardColor,
                        marginTop: 20, borderRadius: 20, alignItems: 'center'
                    }}>

                        <View style={{ width: '60%', height: '80%', }}>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                style={{ flex: 1 }}
                                data={roleList}
                                renderItem={(item, index) => renderRoleList(item)}
                            />
                        </View>


                    </View>

                    {/* </BlurView> */}
                </TouchableOpacity>
            </Modal>

        </>
    )
}

export default EditAccessRole