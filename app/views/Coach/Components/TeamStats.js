import React from 'react'
import { View, Text, ScrollView } from 'react-native';
import { Title } from '../../../components/common/titleLabel';
import { Colors } from '../../../constants';

function TeamStats() {
    return (

        <View style={{ marginTop: 30 }}>

            <Title data={"Saturday, 1st July 2020"} />

            <View style={{ flex: 1 }}>
                <View style={{
                    marginTop: 20,
                    marginHorizontal: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    backgroundColor: '#23262F',
                    borderRadius: 10,
                    borderWidth: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    <View style={{}} >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                borderRadius: 60 / 2,
                                backgroundColor: '#85ADFF',
                            }}>
                                <Text style={{
                                    alignSelf: 'center',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    fontSize: 15,
                                }}>K</Text>

                            </View>
                            <View style={{ marginLeft: 5, marginTop: 5, color: '#ffffff', }}>
                                <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.lightshade, }}>
                                    Kalumet
                                </Text>
                                <Text style={{ fontSize: 10, color: '#85ADFF', }}>
                                    Copper King
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ marginLeft: 20, color: '#ffffff', marginTop: 8 }}>
                                <Text style={{ fontSize: 15, color: '#ffffff', }}>
                                    VS
                                </Text>

                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{ flex: 3, flexDirection: 'row' }}>

                            <View style={{ marginLeft: 5, marginTop: 5, color: '#ffffff', marginRight: 10 }}>
                                <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.lightshade, }}>
                                    Divine Child
                                </Text>
                                <Text style={{ fontSize: 10, color: '#FF5E5E', }}>
                                    Falcons
                                </Text>
                            </View>
                            <View style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                borderRadius: 60 / 2,
                                backgroundColor: '#FF5E5E',
                            }}>
                                <Text style={{
                                    alignSelf: 'center',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    fontSize: 15,
                                }}>K</Text>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginLeft: 18, marginRight: 10, marginTop: 10 }} >


                    <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ color: '#ffffff', }}>Team</Text>

                        <ScrollView scrollEnabled={true} horizontal={true} style={{ marginLeft: 50 }}>
                            <Text style={{ color: "#ffffff" }}> 1 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 2 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 3 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 4 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 5 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 6 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 7 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 8 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 9 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 10 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 2 </Text>

                        </ScrollView>










                    </View>





                </View>
                <View style={{ marginLeft: 18, marginRight: 10, marginTop: 20 }} >


                    <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ color: '#85ADFF', fontWeight: "bold" }}>Coper King</Text>

                        <ScrollView scrollEnabled={true} horizontal={true} style={{ marginLeft: 10 }}>
                            <Text style={{ color: "#85ADFF", fontWeight: "bold" }}> 1 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 2 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 3 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 4 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 5 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 6 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 7 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 8 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 9 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 10 </Text>
                            <Text style={{ color: "#85ADFF", marginLeft: 30, fontWeight: "bold" }}> 2 </Text>

                        </ScrollView>
                    </View>

                </View>
                <View style={{ marginLeft: 18, marginRight: 10, marginTop: 20 }} >


                    <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ color: '#ffffff', }}>Falcon</Text>

                        <ScrollView scrollEnabled={true} horizontal={true} style={{ marginLeft: 45 }}>
                            <Text style={{ color: "#ffffff" }}> 1 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 2 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 3 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 4 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 5 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 6 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 7 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 8 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 9 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 10 </Text>
                            <Text style={{ color: "#ffffff", marginLeft: 30 }}> 2 </Text>

                        </ScrollView>










                    </View>





                </View>

            </View>
        </View>
    )
}

export default TeamStats