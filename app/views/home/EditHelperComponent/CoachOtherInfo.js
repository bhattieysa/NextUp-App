import React, { useState } from "react"
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ActionSheet } from "react-native-cross-actionsheet"
import { DropDownSelect } from "../../../components/common/customDropDown"
import { RadioButton } from "../../../components/common/radioButton"
import { Colors, Layout, Fonts, } from "../../../constants"
import AnimatedInput from "../../../Helpers/react-native-animated-input"
import Navigation from "../../../lib/Navigation"


let wide = Layout.width

export const CoachOtherInfo = ({ isHighSchool, coachTeam, selected_coachingType, selected_state,
  city, ageGroup, stateList, cityList, onAgeGroupSelect, onRadaioButtonPress, onStateSearch, onCitySearch,
  onCoachingTypeSelect, onStateSelect, onCitySelect }) => {

  const [openStatModal, setOpenStatModal] = useState(false)
  const [openCityModal, setOpenCityModal] = useState(false)

  console.log("")
  const onClickCoaching = () => {

    ActionSheet.options({
      message: 'Select an option',
      options: [
        {
          text: 'Jr Varsity', onPress: () => onCoachingTypeSelect('JV', 'Jr Varsity')
        },
        {
          text: 'Varsity', onPress: () => onCoachingTypeSelect('VARSITY', 'Varsity')
        },
        {
          text: 'Both', onPress: () => onCoachingTypeSelect('BOTH', 'Both')
        },
      ],
      tintColor: '#008888'
    })
  }

  const onClickAgeGroup = () => {
    ActionSheet.options({
      message: 'Select an option',
      options: [
        {
          text: '14 & Under', onPress: () => onAgeGroupSelect('14 & Under')
        },
        {
          text: '15 & Under', onPress: () => onAgeGroupSelect('15 & Under')
        },
        {
          text: '18 & Under', onPress: () => onAgeGroupSelect('18 & Under')
        },
      ],
      tintColor: '#008888'
    })
  }

  return (
    <View style={{
      // marginTop: wide * 0.08,

    }}>
      <Text style={{
        color: Colors.txtFieldPlaceHolder,
        fontFamily: Fonts.Bold, fontSize: 14,
        lineHeight: 22, fontWeight: '700'
      }}>OPTION</Text>
      <View style={{
        flexDirection: 'row',
        marginTop: wide * 0.025,
      }}>
        <TouchableOpacity style={{
          flexDirection: 'row', justifyContent: 'center',
          alignItems: 'center',
        }}
          activeOpacity={1}
          onPress={() => onRadaioButtonPress(true)}
        >
          <RadioButton
            containerStyle={{
              width: wide * 0.07, height: wide * 0.07,
              borderRadius: wide * 0.07 / 2,
              borderColor: isHighSchool == true ? Colors.btnBg : Colors.radioBtnBorder,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: wide * 0.006,
            }}
            centerStyle={{
              width: '50%', height: '50%',
              borderRadius: wide * 0.07 / 4,
              backgroundColor: Colors.btnBg
            }}
            isSelected={isHighSchool == true ? true : false}
            onPress={() => onRadaioButtonPress(true)}
          />
          <Text style={{
            color: isHighSchool == true ? Colors.light : Colors.txtFieldPlaceHolder, alignSelf: 'center',
            fontFamily: Fonts.SemiBold, fontSize: 16,
            lineHeight: 18, marginHorizontal: wide * 0.025,
            fontWeight: '600'
          }}>High School</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: wide * 0.07,
        }}
          activeOpacity={1}
          onPress={() => onRadaioButtonPress(false)}
        >

          <RadioButton
            containerStyle={{
              width: wide * 0.07, height: wide * 0.07,
              borderRadius: wide * 0.07 / 2,
              borderColor: isHighSchool == false ? Colors.btnBg : Colors.radioBtnBorder,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: wide * 0.006,
            }}
            centerStyle={{
              width: '50%', height: '50%',
              borderRadius: wide * 0.07 / 4,
              backgroundColor: Colors.btnBg
            }}
            isSelected={isHighSchool == false ? true : false}
            onPress={() => onRadaioButtonPress(false)}

          />
          <Text style={{
            color: isHighSchool == false ? Colors.light : Colors.txtFieldPlaceHolder,
            alignSelf: 'center',
            fontFamily: Fonts.SemiBold, fontSize: 16,
            lineHeight: 18, marginHorizontal: wide * 0.025,
            fontWeight: '600',
          }}>Travel Team</Text>
        </TouchableOpacity>

      </View>

      {isHighSchool == true ?
        <View style={{
          marginTop: wide * 0.04,
          justifyContent: 'space-between',

        }}>


          <TouchableOpacity
            onPress={() => Navigation.navigate("TeamList")}
            style={{ marginTop: wide * 0.06 }}
          >

            <DropDownSelect
              isIcon
              containerStyle={{
                width: wide * 0.8,
                // height: 60,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderColor,
                // backgroundColor: 'red',
                alignItems: "center",
                justifyContent: 'center'
              }}
              placeHolderContainerStyl={{
                flexDirection: 'row', width: '98%',
                justifyContent: 'space-between',
                alignItems: 'center',
                // marginTop: wide * 0.015,
                marginBottom: coachTeam == '' || coachTeam == undefined ? wide * 0.025 : wide * 0.008

              }}
              placeHolderLabelStyl={{
                fontFamily: Fonts.Bold,
                color: Colors.txtFieldPlaceHolder,
                fontSize: 16, lineHeight: 18,
                fontWeight: '700'
              }}
              iconStyl={{
                width: 8,
                height: 8,
              }}
              textStyle={{
                width: '98%',
                fontFamily: Fonts.Bold,
                color: Colors.light,
                fontSize: 16, lineHeight: 18, fontWeight: '600',
                // marginTop: wide * 0.03,
                // marginBottom: wide * 0.015,
                marginTop: wide * 0.02,
                marginBottom: wide * 0.03,
                alignSelf: 'center'
              }}
              placeHolder={'SELECT TEAM'}
              selectedValue={coachTeam}
              onPress={() => Navigation.navigate("TeamList")}
            />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onClickCoaching()}
            style={{ marginTop: wide * 0.1, }}

          >
            <DropDownSelect
              isIcon
              containerStyle={{
                width: wide * 0.44,
                // height: 60,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderColor,
                alignItems: "center",
                justifyContent: 'center',

              }}
              placeHolderContainerStyl={{
                flexDirection: 'row', width: '98%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: selected_coachingType == '' || selected_coachingType == undefined ? wide * 0.025 : wide * 0.008

              }}
              placeHolderLabelStyl={{
                fontFamily: Fonts.Bold,
                color: Colors.txtFieldPlaceHolder,
                fontSize: 16, lineHeight: 18,
                fontWeight: '700'
              }}
              iconStyl={{
                width: 8,
                height: 8,
              }}
              textStyle={{
                width: '98%',
                fontFamily: Fonts.Bold,
                color: Colors.light,
                fontSize: 16, lineHeight: 18,
                fontWeight: '600',
                marginTop: wide * 0.02,
                marginBottom: wide * 0.03,
                alignSelf: 'center'
              }}
              placeHolder={'SELECT'}
              selectedValue={selected_coachingType}
              onPress={() => onClickCoaching()}
            />
          </TouchableOpacity>

        </View>
        :
        <View style={{
          marginTop: wide * 0.1,
          alignItems: 'flex-start'
        }}>

          <AnimatedInput
            placeholder="NAME"
            onChangeText={(e) => onCoachTeamTextChange(e)}
            value={coachTeam}
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
              width: wide * 0.5
            }}
          />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: wide * 0.07,
            width: '100%',
            // alignSelf: 'center',
          }}>
            <TouchableOpacity onPress={() => setOpenStatModal(true)}
              activeOpacity={1}
            >
              <DropDownSelect
                isIcon
                containerStyle={{
                  width: wide * 0.4,
                  // height: 60,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.borderColor,
                  alignItems: "center",
                  justifyContent: 'center',

                }}
                placeHolderContainerStyl={{
                  flexDirection: 'row', width: '98%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // marginTop: wide * 0.015,
                  marginBottom: selected_state == '' || selected_state == undefined ? wide * 0.025 : wide * 0.008

                }}
                placeHolderLabelStyl={{
                  fontFamily: Fonts.Bold,
                  color: Colors.txtFieldPlaceHolder,
                  fontSize: 16, lineHeight: 18,
                  fontWeight: '700'
                }}
                iconStyl={{
                  width: 8,
                  height: 8,
                }}
                textStyle={{
                  width: '98%',
                  fontFamily: Fonts.Bold,
                  color: Colors.light,
                  fontSize: 16, lineHeight: 18,
                  fontWeight: '600',
                  marginTop: wide * 0.02,
                  marginBottom: wide * 0.03,
                  alignSelf: 'center'
                }}
                placeHolder={'STATE'}
                selectedValue={selected_state}
                onPress={() => setOpenStatModal(true)}
              />


            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOpenCityModal(true)}
              activeOpacity={1}
            >
              <DropDownSelect
                isIcon
                containerStyle={{
                  width: wide * 0.4,
                  // height: 60,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.borderColor,
                  alignItems: "center",
                  justifyContent: 'center',

                }}
                placeHolderContainerStyl={{
                  flexDirection: 'row', width: '98%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: city == '' || city == undefined ? wide * 0.025 : wide * 0.008

                }}
                placeHolderLabelStyl={{
                  fontFamily: Fonts.Bold,
                  color: Colors.txtFieldPlaceHolder,
                  fontSize: 16, lineHeight: 18,
                  fontWeight: '700'
                }}
                iconStyl={{
                  width: 8,
                  height: 8,
                }}
                textStyle={{
                  width: '98%',
                  fontFamily: Fonts.Bold,
                  color: Colors.light,
                  fontSize: 16, lineHeight: 18,
                  fontWeight: '600',
                  marginTop: wide * 0.02,
                  marginBottom: wide * 0.03,
                  alignSelf: 'center'
                }}
                placeHolder={'CITY'}
                selectedValue={city}
                onPress={() => setOpenCityModal(true)}
              />
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={{ alignItems: 'center', marginTop: wide * 0.11, }}
            onPress={() => onClickAgeGroup()}
          >

            <DropDownSelect
              isIcon
              containerStyle={{
                width: wide * 0.4,
                // height: 60,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderColor,
                alignItems: "center",
                justifyContent: 'center',

              }}
              placeHolderContainerStyl={{
                flexDirection: 'row', width: '98%',
                justifyContent: 'space-between',
                alignItems: 'center',
                // marginTop: wide * 0.015,
                marginBottom: ageGroup == '' || ageGroup == undefined ? wide * 0.025 : wide * 0.008

              }}
              placeHolderLabelStyl={{
                fontFamily: Fonts.Bold,
                color: Colors.txtFieldPlaceHolder,
                fontSize: 16, lineHeight: 18,
                fontWeight: '700'
              }}
              iconStyl={{
                width: 8,
                height: 8,
              }}
              textStyle={{
                width: '98%',
                fontFamily: Fonts.Bold,
                color: Colors.light,
                fontSize: 16, lineHeight: 18,
                fontWeight: '600',
                marginTop: wide * 0.02,
                marginBottom: wide * 0.03,
                alignSelf: 'center'
              }}
              placeHolder={'AGE'}
              selectedValue={ageGroup}
              onPress={() => onClickAgeGroup()}
            />

          </TouchableOpacity>

        </View>
      }

      <Modal
        visible={openStatModal}
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
              onPress={() => setOpenStatModal(false)}
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
              style={[pickerSelectStyles.input, { width: '90%', }]}
              onChangeText={(text) => onStateSearch(text)}
              // value={this.state.state_srch}
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
                {stateList !== null ?
                  stateList.map(el => (
                    <TouchableOpacity
                      onPress={() => {
                        setOpenStatModal(false)
                        onStateSelect(el)
                        // this.setState({ selected_state: el, city: '', openStateModal: false }, () => {
                        //   this.getCityData(el)
                        // })
                      }}
                    >
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
                  ))
                  :
                  <></>
                }
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
              onPress={() => setOpenCityModal(false)}
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
              style={[pickerSelectStyles.input, { width: '90%', }]}
              onChangeText={(text) => onCitySearch(text)}
              // onChangeText={(text) => this.setState({ city_srch: text }, () => {
              //   this.handleCitySrch(text);
              // })}
              // value={this.state.city_srch}
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
                {cityList !== null ?
                  cityList.map(el => (
                    <TouchableOpacity
                      onPress={() => {
                        setOpenCityModal(false)
                        onCitySelect(el)
                      }}

                    >
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
                  ))
                  :
                  <></>
                }
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

    </View>

  )
}


// Style
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontFamily: Fonts.Bold,
    borderRadius: 4,
    color: Colors.light,
    paddingRight: 0, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 0,
    fontFamily: Fonts.Bold,
    borderRadius: 8,
    color: Colors.light,
    paddingRight: 0, // to ensure the text is never behind the icon
  },
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