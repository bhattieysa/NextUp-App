import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Modal, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux';
import { getStates, getSchoolOrTeamList, getCities } from '../../actions/home';
import { Colors, Fonts, Layout } from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import AnimatedInput from "../../Helpers/react-native-animated-input";

let wide = Layout.width;

function TeamList(props) {

  const [loading, setLoading] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  const dispatch = useDispatch();
  const [state_data, setStates] = useState([]);
  const [city_data, setCity] = useState([]);
  const [team_data, setTeam] = useState([]);
  const [state_search, setStateSearch] = useState("");
  const [city_search, setCitySeatch] = useState("");
  const [team_search, setTeamSearch] = useState("");

  const [city_selected, setSelectedCity] = useState("");
  const [state_selected, setSelectedState] = useState("");

  const [openStateModal, setStateModal] = useState(false);
  const [openCityModal, setCityModal] = useState(false);


  useEffect(() => {
    setLoading(true);
    dispatch(getStates((st, data) => {
      if (st) {
        debugger
        // setLoading(false);
        setStates(data);
        setStateList(data);
        setSelectedState(data[0])
        dispatch(getCities(data[0], (res, city_dt) => {
          if (res) {
            debugger
            setCity(city_dt);
            setCityList(city_dt);
            setSelectedCity(city_dt[0])
            dispatch(getSchoolOrTeamList(city_dt[0], data[0], "TEAM", (res1, team_dt) => {
              if (res1) {
                debugger
                setLoading(false)
                setTeam(team_dt)
                setTeamList(team_dt)
              }
            }))
          }
        }))
      }
    }));
  }, [dispatch]);



  useEffect(() => {
    if (state_search) {
      let input = state_search.toUpperCase();
      let resultStates = state_data.filter(i => i.includes(input));
      setStateList(resultStates);
    }
    else {
      setStateList(state_data);
    }

  }, [state_search]);

  useEffect(() => {
    if (city_search) {
      let input = city_search.toLowerCase();
      let resultStates = city_data.filter(i => i.toLowerCase().includes(input));
      setCityList(resultStates);
    }
    else {
      setCityList(city_data);
    }

  }, [city_search]);

  useEffect(() => {
    if (team_search) {
      let input = team_search.toLowerCase();
      let resultStates = team_data.filter(i => i.name.toLowerCase().includes(input));
      setTeamList(resultStates);
    }
    else {
      setTeamList(team_data);
    }

  }, [team_search]);

  const getCityData = (stat) => {
    if (stat) {
      dispatch(getCities(stat, (res, city_dt) => {
        if (res) {
          setCity(city_dt);
          setCityList(city_dt);
        }
      }))
    }
  }

  const getTeamData = (city) => {
    if (city) {
      dispatch(getSchoolOrTeamList(city, state_selected, "TEAM", (res, team_dt) => {
        if (res) {
          // setLoading(false)
          setTeam(team_dt)
          setTeamList(team_dt)
        }
      }))
    }
  }

  const setTextofFields = (frm, txt) => {
    switch (frm) {
      case 'city':
        setSelectedCity(txt)
        break;

      case 'state':
        setSelectedState(txt)
        break;

      // case 'school':
      //   this.setS({ school: txt })
      //   break;

      default:
        break;
    }
  }

  const navParams = props.navigation.state.params;

  if (loading) {
    return <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
      <AppLoader visible={loading} />
    </SafeAreaView>
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.base, }}>
      <SafeAreaView style={{
        flex: 1,
        marginTop: Platform.OS == 'android' ? 30 : 0,
        backgroundColor: Colors.base
      }}>

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
              Select Team
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
            marginHorizontal: 15,
            alignItems: 'center',
            marginTop: wide * 0.04,
            marginBottom: wide * 0.04
          }}>
            <TextInput
              style={[styles.input, { width: '90%', }]}
              onChangeText={(text) => setTeamSearch(text)}
              value={team_search}
              placeholder="Search Team"
              placeholderTextColor={Colors.newGrayFontColor}
            />
          </View>

          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', marginTop: wide * 0.08,
            width: '82%', alignSelf: 'center',
            // backgroundColor: "red"
          }}>
            <TouchableOpacity onPress={() => setStateModal(true)} activeOpacity={1}>
              <AnimatedInput
                placeholder="STATE"
                onChangeText={(e) => this.setTextofFields('school', e)}
                value={state_selected}
                disabled
                // editable={false}
                // onFocus={() => setStateModal(true)}
                sufix={
                  <Image
                    style={{
                      width: 7,
                      height: 7,
                      position: 'absolute',
                      top:
                        Platform.OS === "android"
                          ? 5
                          : state_selected != ""
                            ? 30
                            : 5,
                      right: 7
                    }}
                    source={require('../../Images/dropDownIconNew.png')}
                  />
                }
                styleInput={{
                  fontFamily: Fonts.Bold,
                  color: Colors.light,
                  fontSize: 16, lineHeight: 18
                }}
                styleLabel={{
                  fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                  fontSize: 12,
                }}
                styleBodyContent={{
                  borderBottomWidth: 1.5,
                  borderBottomColor: Colors.borderColor,
                  width: wide * 0.3
                }}
              // isAutoFocus={true}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCityModal(true)} activeOpacity={1}>
              <AnimatedInput
                placeholder="CITY"
                onChangeText={(e) => this.setTextofFields('city', e)}
                value={city_selected}
                disabled
                // onFocus={() => setCityModal(true)}

                sufix={
                  <Image
                    style={{
                      width: 7,
                      height: 7,
                      position: 'absolute',
                      top:
                        Platform.OS === "android"
                          ? 5
                          : city_selected != ""
                            ? 30
                            : 5,
                      right: 7
                    }}
                    source={require('../../Images/dropDownIconNew.png')}
                  />
                }
                styleInput={{
                  fontFamily: Fonts.Bold,
                  color: Colors.light,
                  fontSize: 16, lineHeight: 18
                }}
                styleLabel={{
                  fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                  fontSize: 12,
                }}
                styleBodyContent={{
                  borderBottomWidth: 1.5,
                  borderBottomColor: Colors.borderColor,
                  width: wide * 0.4
                }}
              // isAutoFocus={true}
              />
            </TouchableOpacity>
          </View>

          <Text style={{ color: Colors.lightshade }}>{JSON.stringify(navParams)}</Text>

          {city_selected !== "" ?
            <View style={{
              flexDirection: "column",
              marginHorizontal: 40
            }}>

              {
                teamList.map((st, index) => (
                  <TouchableOpacity key={`state-${index}`} style={{ marginTop: 15 }} onPress={() => {
                    Navigation.navigate("TellUsMoreIntro", { team: st, selected_state: state_selected, city: city_selected })
                  }}>
                    <Text style={{ color: Colors.lightshade, fontSize: 16 }}>{st.name}</Text>
                  </TouchableOpacity>
                ))
              }

            </View>
            : <></>
          }



        </KeyboardAwareScrollView>
        {/* </KeyboardAvoidingView> */}

        <Modal
          visible={openStateModal}
          animationType={'slide'}
        >
          <SafeAreaView style={{ backgroundColor: Colors.base }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}
            >
              <Text style={{ color: Colors.white_08, fontSize: 20 }}>Choose States</Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 10
                }}
                onPress={() => setStateModal(false)}
              >
                <View>
                  <Text
                    style={{
                      color: Colors.white_08,
                      fontSize: 20,
                      fontWeight: '600'
                    }}
                  >X</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{
              marginHorizontal: 15,
              alignItems: 'center',
              marginTop: wide * 0.05,
              marginBottom: wide * 0.02
            }}>
              <TextInput
                style={[styles.input, { width: '90%', }]}
                onChangeText={(text) => setStateSearch(text)}
                value={state_search}
                placeholder="Search State"
                placeholderTextColor={Colors.newGrayFontColor}
              />
            </View>
            <View
              style={{
                height: '98%',
                width: '100%',
              }}
            >
              <ScrollView
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{ marginBottom: wide * 0.05 }}
              >
                <View
                  style={{
                    width: '100%',
                    padding: 20,
                  }}
                >
                  {stateList.map(el => (
                    <TouchableOpacity onPress={() => {
                      setSelectedState(el)
                      setTeamList([])
                      setSelectedCity('')
                      getCityData(el)
                      setStateModal(false)
                    }}>
                      <View
                        style={{
                          padding: 10,
                          width: '95%',
                          alignSelf: 'center'
                          // borderBottomWidth: 0.5,
                          // borderBottomColor: Colors.white_08
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.lightshade,
                            fontSize: 14,
                          }}
                        >{el}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          visible={openCityModal}
          animationType={'slide'}
        >
          <SafeAreaView style={{ backgroundColor: Colors.base }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}
            >
              <Text style={{ color: Colors.white_08, fontSize: 20 }}>Choose City</Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 10
                }}
                onPress={() => setCityModal(false)}
              >
                <View>
                  <Text
                    style={{
                      color: Colors.white_08,
                      fontSize: 20,
                      fontWeight: '600'
                    }}
                  >X</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{
              marginHorizontal: 15,
              alignItems: 'center',
              marginTop: wide * 0.05,
              marginBottom: wide * 0.02
            }}>
              <TextInput
                style={[styles.input, { width: '90%', }]}
                onChangeText={(text) => setCitySeatch(text)}
                value={city_search}
                placeholder="Search City"
                placeholderTextColor={Colors.newGrayFontColor}
              />
            </View>
            <View
              style={{
                height: '98%',
                width: '100%',
              }}
            >
              <ScrollView
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{ marginBottom: wide * 0.05 }}
              >
                <View
                  style={{
                    width: '100%',
                    padding: 20,
                  }}
                >
                  {cityList.map(el => (
                    <TouchableOpacity onPress={() => {
                      setSelectedCity(el)
                      getTeamData(el)
                      setCityModal(false)
                    }}>
                      <View
                        style={{
                          padding: 10,
                          width: '95%',
                          alignSelf: 'center'
                          // borderBottomWidth: 0.5,
                          // borderBottomColor: Colors.white_08
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.lightshade,
                            fontSize: 14,
                          }}
                        >{el}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </Modal>

      </SafeAreaView>
    </View>
  )
}

export default TeamList


const styles = StyleSheet.create({
  input: {
    // height: 45,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    // borderColor: Colors.lightshade,
    // color: Colors.lightshade,

    borderWidth: 2,
    borderColor: Colors.newGrayFontColor,
    fontFamily: Fonts.Bold, height: 45,
    // width: '90%',
    paddingLeft: 10, paddingRight: wide * 0.1,
    borderRadius: 5, color: Colors.light, fontSize: 16

  },

});