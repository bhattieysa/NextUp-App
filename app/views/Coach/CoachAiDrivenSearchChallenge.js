import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Image, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AIDrivenSearch from './Components/AIDrivenChallenge/AIDrivenSearch';

import { connect } from 'react-redux';
import {
    getAIDrivenSearch, getSeacrhData
} from '../../actions/home';
import { getObject } from '../../middleware';
const CoachAiDrivenSearchChallenge = (props) => {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState()
    const [categories, setCategories] = useState()
    const [data, setData] = useState()
    const [searchFlag, setSearchFlag] = useState(false)
    const [selectedTab, setSelectedtab] = useState("first")
    const [selectedCategories, setSelectedCategories] = useState(0)






    function getSeacrhData(search1) {

        setLoading(true)

        props.dispatch(getAIDrivenSearch(search1, (result, response) => {

            if (result) {

                console.log("eysadata", response)
                setLoading(false)
                setCategories(response.categories)
                setData(response.challengeList)

            } else {
                console.log("eysadata", result)
            }
        }))


    }


    let wide = Layout.width;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />

                <View>

                    <ScreenHeader
                        title={'Search'}
                        backButtonAction={() => Navigation.back()}
                    />


                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }}
                    behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <View>
                        <View style={{
                            borderColor: 'rgba(255, 255, 255, 0.24)',
                            borderWidth: 1,
                            marginHorizontal: 24,
                            height: wide * 0.13,
                            flexDirection: 'row'
                        }}>
                            <View
                                style={{
                                    marginHorizontal: wide * 0.03,
                                    flex: 4,
                                }}>
                                <TextInput
                                    placeholder='Search state challenges'
                                    placeholderTextColor='rgba(255, 255, 255, 0.24)'
                                    style={{
                                        color: Colors.light,
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    onChangeText={(text) => setSearch(text)}
                                ></TextInput>
                            </View>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    style={{
                                        height: 50, flexDirection: 'row', alignItems: 'center',
                                        marginHorizontal: 24, marginBottom: 8,
                                    }}
                                    onPress={() => {getSeacrhData(search),setSearchFlag(true)}}
                                >
                                    <Image source={require("../../Images/search.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>            
                        {searchFlag == false ?
                            <View style={{
                                justifyContent: 'center',

                                alignItems: 'center',
                                marginTop: wide * 0.3,
                            }}>
                                <Image
                                    style={{
                                        width: wide * 0.5
                                    }}
                                    source={require('../../Images/datablank.png')}
                                />
                                <Text style={{
                                    fontFamily: 'Metropolis',
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: Colors.light,
                                    marginTop: wide * 0.04
                                }}>No challenges found yet</Text>
                            </View>
                            :
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: wide * 0.07,
                                    justifyContent: 'center',
                                    alignSelf: 'center'


                                }}>

                                    {selectedTab == "first" ?

                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: wide * 0.023,
                                                alignItems: 'center',
                                                justifyContent: 'center',


                                            }}

                                        >

                                            <Text style={{

                                                borderBottomColor: Colors.light,
                                                borderBottomWidth: 2,
                                                color: Colors.light,
                                                fontWeight: '600',
                                                fontSize: 17,
                                                fontFamily: 'Metropolis',




                                            }}>
                                                Stats
                                            </Text>
                                            <View style={{

                                                borderBottomColor: Colors.light,
                                                borderBottomWidth: 2,
                                                width: wide * 0.23,
                                                marginTop: wide * 0.02


                                            }}
                                            />

                                        </View>

                                        :

                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: wide * 0.023,
                                                alignItems: 'center',
                                                justifyContent: 'center',


                                            }}
                                        >
                                            <TouchableOpacity onPress={() => { setSelectedtab("first") }}>
                                                <Text style={{


                                                    color: Colors.titleLabelColor,
                                                    fontWeight: '400',
                                                    fontSize: 17,
                                                    fontFamily: 'Metropolis',


                                                }}>
                                                    Stats
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }


                                    {selectedTab == "secound" ?

                                        <View
                                            style={{
                                                flex: 1,
                                                marginRight: wide * 0.023,
                                                alignItems: 'center',
                                                justifyContent: 'center',



                                            }}
                                        >
                                            <Text style={{

                                                borderBottomColor: Colors.light,
                                                borderBottomWidth: 2,
                                                color: Colors.light,
                                                fontWeight: '600',
                                                fontSize: 17,
                                                fontFamily: 'Metropolis',




                                            }}>
                                                Video
                                            </Text>
                                            <View style={{

                                                borderBottomColor: Colors.light,
                                                borderBottomWidth: 2,
                                                width: wide * 0.23,
                                                marginTop: wide * 0.02


                                            }}
                                            />

                                        </View>
                                        :

                                        <View
                                            style={{
                                                flex: 1,
                                                marginRight: wide * 0.023,
                                                alignItems: 'center',
                                                justifyContent: 'center',


                                            }}
                                        >
                                            <TouchableOpacity onPress={() => { setSelectedtab("secound") }}>
                                                <Text style={{


                                                    color: Colors.titleLabelColor,
                                                    fontWeight: '400',
                                                    fontSize: 17,
                                                    fontFamily: 'Metropolis',


                                                }}>
                                                    Video
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    {selectedTab == "third" ?

                                        <View
                                            style={{
                                                flex: 1,
                                                marginRight: wide * 0.023,
                                                alignItems: 'center',
                                                justifyContent: 'center',



                                            }}
                                        >
                                            <Text style={{

                                                borderBottomColor: Colors.light,
                                                borderBottomWidth: 2,
                                                color: Colors.light,
                                                fontWeight: '600',
                                                fontSize: 17,
                                                fontFamily: 'Metropolis',




                                            }}>
                                                Questions
                                            </Text>
                                            <View style={{

                                                borderBottomColor: Colors.light,
                                                borderBottomWidth: 2,
                                                width: wide * 0.23,
                                                marginTop: wide * 0.02


                                            }}
                                            />

                                        </View>
                                        :

                                        <View
                                            style={{
                                                flex: 1,
                                                marginRight: wide * 0.023,
                                                alignItems: 'center',
                                                justifyContent: 'center',


                                            }}
                                        >
                                            <TouchableOpacity onPress={() => { setSelectedtab("third") }}>
                                                <Text style={{


                                                    color: Colors.titleLabelColor,
                                                    fontWeight: '400',
                                                    fontSize: 17,
                                                    fontFamily: 'Metropolis',


                                                }}>
                                                    Questions
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                                <View style={{ marginHorizontal: 24, marginTop: wide * 0.04 }} >
                                    {selectedTab == "first" ?



                                        <View >
                                            <FlatList
                                                data={categories}
                                                showsHorizontalScrollIndicator={false}
                                                bounces={false}
                                                horizontal
                                             
                                                keyExtractor={item => item.index}
                                                renderItem={(item, index) =>
                                                    <TouchableOpacity onPress={() => setSelectedCategories(item.index)} >
                                                        {selectedCategories == item.index ?

                                                            <View style={{
                                                                borderWidth: 1,
                                                                borderColor: 'rgba(36, 107, 253, 1)',
                                                                width: wide * 0.25,
                                                                height: wide * 0.1,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                borderRadius: wide * 0.05,
                                                                marginRight: wide * 0.03,
                                                                backgroundColor: 'rgba(36, 107, 253, 1)'

                                                            }}>
                                                                <Text style={{
                                                                    fontWeight: '500',
                                                                    fontSize: 13,
                                                                    color: Colors.light
                                                                }}>{item.item}</Text>


                                                            </View>


                                                            :
                                                            <View style={{
                                                                borderWidth: 1,
                                                                borderColor: 'rgba(115, 119, 123, 1)',
                                                                width: wide * 0.25,
                                                                height: wide * 0.1,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                borderRadius: wide * 0.05,
                                                                marginRight: wide * 0.03

                                                            }}>
                                                                <Text style={{
                                                                    fontWeight: '500',
                                                                    fontSize: 13,
                                                                    color: 'rgba(115, 119, 123, 1)'
                                                                }}>{item.item}</Text>


                                                            </View>
                                                        }
                                                    </TouchableOpacity>
                                                }
                                            />

                                            {categories != undefined && data != undefined ?



                                                <AIDrivenSearch
                                                    data={data}
                                                    categories={categories[selectedCategories]}
                                                    typeOfChallenge={'STATS'}




                                                />
                                                :
                                                null}
                                        </View>


                                        :
                                        selectedTab == "secound" ?
                                            <View>
                                                <FlatList
                                                    data={categories}
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal
                                                    bounces={false}
                                                    keyExtractor={item => item.index}
                                                    renderItem={(item, index) =>
                                                        <TouchableOpacity onPress={() => setSelectedCategories(item.index)} >
                                                            {selectedCategories == item.index ?

                                                                <View style={{
                                                                    borderWidth: 1,
                                                                    borderColor: 'rgba(36, 107, 253, 1)',
                                                                    width: wide * 0.25,
                                                                    height: wide * 0.1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: wide * 0.05,
                                                                    marginRight: wide * 0.03,
                                                                    backgroundColor: 'rgba(36, 107, 253, 1)'

                                                                }}>
                                                                    <Text style={{
                                                                        fontWeight: '500',
                                                                        fontSize: 13,
                                                                        color: Colors.light
                                                                    }}>{item.item}</Text>


                                                                </View>


                                                                :
                                                                <View style={{
                                                                    borderWidth: 1,
                                                                    borderColor: 'rgba(115, 119, 123, 1)',
                                                                    width: wide * 0.25,
                                                                    height: wide * 0.1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: wide * 0.05,
                                                                    marginRight: wide * 0.03

                                                                }}>
                                                                    <Text style={{
                                                                        fontWeight: '500',
                                                                        fontSize: 13,
                                                                        color: 'rgba(115, 119, 123, 1)'
                                                                    }}>{item.item}</Text>


                                                                </View>
                                                            }
                                                        </TouchableOpacity>
                                                    }
                                                />

                                                {categories != undefined && data != undefined ?



                                                    <AIDrivenSearch
                                                        data={data}
                                                        categories={categories[selectedCategories]}
                                                        typeOfChallenge={'VIDEO'}




                                                    />
                                                    :
                                                    null}
                                            </View>
                                            :


                                            <View>
                                                <FlatList
                                                    data={categories}
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal
                                                    bounces={false}
                                                    keyExtractor={item => item.index}
                                                    renderItem={(item, index) =>
                                                        <TouchableOpacity onPress={() => setSelectedCategories(item.index)} >
                                                            {selectedCategories == item.index ?

                                                                <View style={{
                                                                    borderWidth: 1,
                                                                    borderColor: 'rgba(36, 107, 253, 1)',
                                                                    width: wide * 0.25,
                                                                    height: wide * 0.1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: wide * 0.05,
                                                                    marginRight: wide * 0.03,
                                                                    backgroundColor: 'rgba(36, 107, 253, 1)'

                                                                }}>
                                                                    <Text style={{
                                                                        fontWeight: '500',
                                                                        fontSize: 13,
                                                                        color: Colors.light
                                                                    }}>{item.item}</Text>


                                                                </View>


                                                                :
                                                                <View style={{
                                                                    borderWidth: 1,
                                                                    borderColor: 'rgba(115, 119, 123, 1)',
                                                                    width: wide * 0.25,
                                                                    height: wide * 0.1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: wide * 0.05,
                                                                    marginRight: wide * 0.03

                                                                }}>
                                                                    <Text style={{
                                                                        fontWeight: '500',
                                                                        fontSize: 13,
                                                                        color: 'rgba(115, 119, 123, 1)'
                                                                    }}>{item.item}</Text>


                                                                </View>
                                                            }
                                                        </TouchableOpacity>
                                                    }
                                                />
                                                {categories != undefined && data != undefined ?



                                                    <AIDrivenSearch
                                                        data={data}
                                                        categories={categories[selectedCategories]}
                                                        typeOfChallenge={'QUESTION'}




                                                    />
                                                    :
                                                    null}
                                            </View>


                                    }

                                </View>


                            </View>
                        }

                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </View>
    )
}


function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.homePlayer
    };
}
export default connect(mapStateToProps)(CoachAiDrivenSearchChallenge);
