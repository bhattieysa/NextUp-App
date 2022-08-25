import React, { useState } from "react"
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ActionSheet } from "react-native-cross-actionsheet"
import { DropDownSelect } from "../../../components/common/customDropDown"
import { RadioButton } from "../../../components/common/radioButton"
import { Colors, Layout, Fonts, } from "../../../constants"
import AnimatedInput from "../../../Helpers/react-native-animated-input"
import Navigation from "../../../lib/Navigation"


let wide = Layout.width

export const PlayerOtherInfo = ({ isGirl, classof, school, city, selected_state,
  selected_height, weight,
  onRadaioButtonPress, onHeightChange, onWeightChange, }) => {

  return (
    <View style={{
      // marginTop: wide * 0.08,

    }}>
      <View >
        <Text style={{
          color: Colors.txtFieldPlaceHolder,
          fontFamily: Fonts.Bold, fontSize: 14,
          lineHeight: 22, fontWeight: '700'
        }}>GENDER</Text>
        <View style={{
          flexDirection: 'row',
          marginTop: wide * 0.025,
        }}>
          <TouchableOpacity style={{
            flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center',
          }}
            activeOpacity={1}
            onPress={() => onRadaioButtonPress(false)}
          >
            <RadioButton
              containerStyle={{
                width: wide * 0.07, height: wide * 0.07,
                borderRadius: wide * 0.07 / 2,
                borderColor: isGirl == false ? Colors.btnBg : Colors.radioBtnBorder,
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
              isSelected={isGirl == false ? true : false}
              onPress={() => onRadaioButtonPress(false)}
            />
            <Text style={{
              color: isGirl == false ? Colors.light : Colors.txtFieldPlaceHolder, alignSelf: 'center',
              fontFamily: Fonts.SemiBold, fontSize: 16,
              lineHeight: 18, marginHorizontal: wide * 0.025,
              fontWeight: '600'
            }}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wide * 0.07,
          }}
            activeOpacity={1}
            onPress={() => onRadaioButtonPress(true)}
          >

            <RadioButton
              containerStyle={{
                width: wide * 0.07, height: wide * 0.07,
                borderRadius: wide * 0.07 / 2,
                borderColor: isGirl == true ? Colors.btnBg : Colors.radioBtnBorder,
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
              isSelected={isGirl == true ? true : false}
              onPress={() => onRadaioButtonPress(true)}

            />
            <Text style={{
              color: isGirl == true ? Colors.light : Colors.txtFieldPlaceHolder,
              alignSelf: 'center',
              fontFamily: Fonts.SemiBold, fontSize: 16,
              lineHeight: 18, marginHorizontal: wide * 0.025,
              fontWeight: '600'
            }}>Female</Text>
          </TouchableOpacity>

        </View>

      </View>

      <View style={{
        justifyContent: 'space-between',
        marginTop: wide * 0.1,
      }}>
        <TouchableOpacity
          onPress={() => Navigation.navigate("School")}
        >
          <DropDownSelect
            isIcon
            containerStyle={{
              width: wide * 0.8,
              borderBottomWidth: 1,
              borderBottomColor: Colors.borderColor,
              alignItems: "center",
              justifyContent: 'center',

            }}
            placeHolderContainerStyl={{
              flexDirection: 'row', width: '98%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: school == '' || school == undefined ? wide * 0.025 : wide * 0.008
            }}
            placeHolderLabelStyl={{
              fontFamily: Fonts.Bold,
              color: Colors.txtFieldPlaceHolder,
              fontSize: 16,
              lineHeight: 18,
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
              alignSelf: 'center',

            }}
            placeHolder={'SCHOOL'}
            selectedValue={school}
            onPress={() => Navigation.navigate("School")}
          />

        </TouchableOpacity>

        {/* Add picker here */}

        <TouchableOpacity onPress={() => Navigation.navigate("Year")}
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
              marginBottom: classof == '' || classof == undefined ? wide * 0.025 : wide * 0.008


            }}
            placeHolderLabelStyl={{
              fontFamily: Fonts.Bold,
              color: Colors.txtFieldPlaceHolder,
              fontSize: 16,
              lineHeight: 18,
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
              fontSize: 16,
              lineHeight: 18,
              fontWeight: '600',
              marginTop: wide * 0.02,
              marginBottom: wide * 0.03,
              alignSelf: 'center'
            }}
            placeHolder={'CLASS OF'}
            selectedValue={classof}
            onPress={() => Navigation.navigate("Year")}
          />

        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row', justifyContent: 'space-between',
        marginTop: wide * 0.11
      }}>
        <DropDownSelect
          containerStyle={{
            width: wide * 0.4,
            borderBottomWidth: 1,
            borderBottomColor: Colors.borderColor,
            alignItems: "center",
            justifyContent: 'center',

          }}
          placeHolderContainerStyl={{
            flexDirection: 'row', width: '98%',
            justifyContent: 'space-between',
            alignItems: 'center',
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
        />

        <DropDownSelect
          containerStyle={{
            width: wide * 0.4,
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
        />

      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: wide * 0.15
      }}>
        <AnimatedInput
          placeholder="HEIGHT (IN CM)"
          onChangeText={(e) => onHeightChange(e)}
          value={selected_height}
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
            width: wide * 0.4,
          }}
          keyboardType={'decimal-pad'}
          maxLength={3}
        />

        <AnimatedInput
          placeholder="WEIGHT (IN LBS)"
          onChangeText={(e) => onWeightChange(e)}
          value={weight}
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
            width: wide * 0.4,
          }}
          keyboardType={'decimal-pad'}
          maxLength={3}
        />

      </View>

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