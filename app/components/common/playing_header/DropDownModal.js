import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../../../constants';

{/* onPress={() => this.setState({ showFirstSeasonDrop: false })} */ }

const DropDownModal = ({
  list,
  visibility,
  preSelected,
  onPress,
  onPressOuter,
}) => {
  debugger
  return (

    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
    >
      <TouchableOpacity
        onPress={onPressOuter}

        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >

        <BlurView style={{
          // width: wide,
          // height: high,
          flex: 1,
          position: 'absolute',
        }}
          blurAmount={10}
          blurRadius={10}
        />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#32353E',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}>
            {list.map(item => {
              return (
                <TouchableOpacity
                  style={[
                    {
                      height: 40,
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                    },
                    // preSelected === item && {
                    //     backgroundColor: Colors.lightRed,
                    // },
                  ]}
                  key={item}
                  onPress={() => onPress(item)}>
                  <Text
                    style={[
                      {
                        fontFamily: Fonts.Regular,
                        color: Colors.light,
                      },
                      preSelected === item.value && { color: '#74C896' },
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>



        {/* </BlurView> */}
      </TouchableOpacity>
    </Modal>



    // <Modal animationType="fade" transparent={true} visible={true}>
    //   <TouchableOpacity
    //     activeOpacity={1}
    //     style={{
    //       flex: 1,
    //       alignItems: 'flex-end',
    //       paddingHorizontal: 16,
    //       backgroundColor: 'rgba(0,0,0,0.5)',
    //     }}
    //     onPress={onPressOuter}>
    //     <ScrollView
    //       contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}
    //       showsVerticalScrollIndicator={false}>
    //       <View
    //         style={{
    //           backgroundColor: '#32353E',
    //           shadowOffset: {
    //             width: 0,
    //             height: 2,
    //           },
    //           shadowOpacity: 0.23,
    //           shadowRadius: 2.62,
    //           elevation: 4,
    //         }}>
    //         {list.map(item => {
    //           return (
    //             <TouchableOpacity
    //               style={[
    //                 {
    //                   height: 40,
    //                   justifyContent: 'center',
    //                   paddingHorizontal: 20,
    //                 },
    //                 // preSelected === item && {
    //                 //     backgroundColor: Colors.lightRed,
    //                 // },
    //               ]}
    //               key={item}
    //               onPress={() => onPress(item)}>
    //               <Text
    //                 style={[
    //                   {
    //                     fontFamily: Fonts.Regular,
    //                     color: Colors.light,
    //                   },
    //                   preSelected === item.value && { color: '#74C896' },
    //                 ]}>
    //                 {item.name}
    //               </Text>
    //             </TouchableOpacity>
    //           );
    //         })}
    //       </View>
    //     </ScrollView>
    //   </TouchableOpacity>
    // </Modal>
  );
};

export default DropDownModal;
