import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux';
import { getStates, getYears } from '../../actions/home';
import { Colors, Fonts, Layout } from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';

let wide = Layout.width;




function Year({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [yearList, setYearList] = useState([]);

    const dispatch = useDispatch();
    const [years, setYears] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        setLoading(true);

        dispatch(getYears((st, data) => {
            if (st) {
                setLoading(false);
                setYears(data);
                setYearList(data);
            }
        }));

    }, [dispatch]);

    useEffect(() => {

        if (search) {
            let input = search.toUpperCase();
            let resultYears = years.filter(i => i.includes(input));
            setYearList(resultYears);
        }
        else {
            setYearList(years);
        }

    }, [search]);

    if (loading) {
        return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
            <AppLoader visible={loading} />
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

            {
                loading ? <AppLoader visible={loading} /> : null
            }



            <View style={{ marginHorizontal: 32, backgroundColor: Colors.base, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                    <TouchableOpacity style={{ width: wide * 0.1, }} onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.08, height: wide * 0.08,
                            borderRadius: wide * 0.02, borderWidth: 1, borderColor: Colors.borderColor
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                    <Text style={{
                        color: Colors.light, fontSize: 16,
                        fontFamily: Fonts.Bold, lineHeight: 24,
                        marginHorizontal: 10
                    }}>
                        Choose Year
                    </Text>
                </View>
            </View>

            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                style={{ marginTop: wide * 0.03, marginBottom: wide * 0.01 }}
                bounces={false}
            >

                <View style={{
                    marginHorizontal: 20
                }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        placeholder="Search Year"
                        placeholderTextColor={Colors.lightshade}
                        keyboardType="numeric"
                    />
                </View>


                <View style={{
                    flexDirection: "column",
                    marginHorizontal: 40
                }}>

                    {
                        yearList.map((st, index) => (
                            <TouchableOpacity key={`year-${index}`} style={{ marginTop: 15 }} onPress={() => {
                                Navigation.navigate("TellUsMore", { year: st })
                            }}>
                                <Text style={{ color: Colors.lightshade, fontSize: 20 }}>{st}</Text>
                            </TouchableOpacity>
                        ))
                    }

                </View>



            </KeyboardAwareScrollView>
            {/* </KeyboardAvoidingView> */}




        </SafeAreaView>
    )
}

export default Year


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.lightshade,
        color: Colors.lightshade,
    },
});