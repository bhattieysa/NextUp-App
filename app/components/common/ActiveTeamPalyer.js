import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Fonts, CommonStyles } from "../../constants";
import TextInCircle from "./TextInCircle";

const ScoreActiveTeamPlayer = ({ heading, list, activePlayer, isBlueTeam,
  onPress, itemStyle, containerStyle, isOtherShow }) => {
  const [numberList, setNumberList] = useState([]);
  const [bgColor, setBgColor] = useState(Colors.lightBlue);
  const { width, height } = useDimensions().window;

  useEffect(() => {
    setNumberList(list);
    debugger
    setBgColor(isBlueTeam == false ? Colors.lightBlue : Colors.lightRed)
  }, [list]);

  const listContainer = {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  }

  const headingTxt = {
    marginLeft: 10,
    color: Colors.fontColorGray,
    fontFamily: Fonts.SemiBold,
  }

  return <View style={{ width: '100%', alignSelf: 'center' }}>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{
      ...listContainer, ...containerStyle,
      justifyContent: 'space-around',
      // backgroundColor: 'red',
    }}>
      {numberList.map((e, index) => <View style={{
        justifyContent: 'center', alignItems: 'center',
      }}>
        {e.playerProfilePictureUrl !== null && e.playerProfilePictureUrl !== undefined ?
          <TouchableOpacity style={{
            width: 90, height: 90, borderRadius: 90 / 2,
            backgroundColor: Colors.newGrayFontColor,
            alignItems: 'center', justifyContent: 'center',
            marginTop: 30,
          }}
            onPress={() => onPress(e)}
          >
            <FastImage
              source={{ uri: e.playerProfilePictureUrl }}
              // source={require('../../Images/dummyImage.png')}
              style={{ width: '98%', height: '98%', borderRadius: 90 / 2 }}
            />
          </TouchableOpacity>
          :
          <TextInCircle
            key={index}
            text={e.number}
            onPress={() => onPress(e)}
            style={{
              ...{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                // borderWidth: 1,
                // borderColor: e.id === activePlayer ? Colors.darkYellow : bgColor,
                backgroundColor: e.playerId === activePlayer ? Colors.lightGreen : bgColor
              }, ...itemStyle,
            }}
            txtStyle={{ color: Colors.base, }} />
        }
        <Text style={{
          fontSize: 14, fontFamily: Fonts.Bold,
          lineHeight: 24, color: Colors.light
        }}>{e.playerName}</Text>
      </View>

      )
      }
      {isOtherShow != false ?
        <View style={{
          justifyContent: 'center', alignItems: 'center',

        }}>
          <TextInCircle
            text={'Other Team'}
            onPress={() => onPress('other team')}
            style={{
              ...{
                // width: 45,
                // height: 45,
                // borderRadius: 45 / 2,
                width: width / 9.5,
                height: width / 9.5,
                marginTop: 35,
                borderRadius: (width / 9.5) / 2,

                // borderWidth: 1,
                // borderColor: activePlayer == 'other team' ? Colors.darkYellow : bgColor,
                backgroundColor: bgColor
              }, ...itemStyle
            }}
            txtStyle={{ color: Colors.base, }} />
          <Text style={{
            fontSize: 14, fontFamily: Fonts.Bold,
            lineHeight: 24, color: Colors.base
          }}> </Text>
        </View>
        : <></>
      }
    </View>
  </View>
}


// new active team player
const ActiveTeamPlayer = ({ heading, list, activePlayer, isBlueTeam, onPress, itemStyle, containerStyle }) => {
  const [numberList, setNumberList] = useState([]);
  const [bgColor, setBgColor] = useState(Colors.lightBlue);
  useEffect(() => {
    console.log("user listtt", list)
    setNumberList(list);
    setBgColor(isBlueTeam == false ? Colors.lightBlue : Colors.lightRed)
  }, [list]);

  const listContainer = {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    width: '100%',
    // backgroundColor: 'green',
    // marginLeft: 10,
    // alignItems: 'center',
    // justifyContent: 'center',

  }

  const headingTxt = {
    marginLeft: 8,
    color: Colors.fontColorGray,
    fontFamily: Fonts.SemiBold,
  }

  return <View style={{ ...containerStyle, }}>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{ ...listContainer, }}>
      <View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <View style={{ width: '30%', }}>
            <Text style={{
              color: Colors.overlayWhite, fontSize: 14,
              lineHeight: 16, fontFamily: Fonts.Bold
            }}>Player</Text>

          </View>
          <View style={{
            flexDirection: 'row', width: '65%',
            justifyContent: 'space-between', alignItems: "center",
            marginRight: 4

            // backgroundColor: 'red'
          }}>
            <Text style={{
              color: Colors.overlayWhite, fontSize: 12,
              lineHeight: 16, fontFamily: Fonts.Bold,
            }}>PTS</Text>
            <Text style={{
              color: Colors.overlayWhite, fontSize: 12,
              lineHeight: 16, fontFamily: Fonts.Bold,
            }}>AST</Text>
            <Text style={{
              color: Colors.overlayWhite, fontSize: 12,
              lineHeight: 16, fontFamily: Fonts.Bold,
            }}>REB</Text>
            <Text style={{
              color: Colors.overlayWhite, fontSize: 12,
              lineHeight: 16, fontFamily: Fonts.Bold,
            }}>FL</Text>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          {numberList.map((e, index) => {
            return (
              <View style={{
                flexDirection: 'row', marginVertical: 2,
                backgroundColor: e.fl >= 5 ? Colors.lightRed : null
              }}>
                <View style={{ width: '35%' }}>

                  {e.playerProfilePictureUrl !== null && e.playerProfilePictureUrl !== undefined ?
                    <View style={{
                      width: 25, height: 25, borderRadius: 12,
                      // backgroundColor: bgColor,
                      alignItems: 'center', justifyContent: 'center'
                    }}>
                      <FastImage
                        source={{ uri: e.playerProfilePictureUrl }}
                        // source={require('../../Images/dummyImage.png')}
                        style={{ width: '95%', height: '95%', borderRadius: 12 }}
                      />
                    </View>
                    :
                    <View style={{
                      width: 22, height: 22, borderRadius: 11, backgroundColor: bgColor,
                      alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Text style={{
                        color: Colors.light, fontSize: 12,
                        lineHeight: 18, fontFamily: Fonts.Regular
                      }}>{e.jerseyNumber}</Text>
                    </View>
                  }
                </View>
                <View style={{
                  flexDirection: 'row', width: '62%',
                  justifyContent: 'space-between',
                  alignItems: 'center',

                }}>
                  <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 18, fontFamily: Fonts.Regular,
                    // marginLeft: 4
                  }}>{e.pts}</Text>
                  <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 18, fontFamily: Fonts.Regular,
                    //  marginRight: 4
                  }}>{e.ast}</Text>
                  <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 18, fontFamily: Fonts.Regular,
                    //  marginRight: 4
                  }}>{e.reb}</Text>
                  <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 18, fontFamily: Fonts.Regular,
                    //  marginRight: 4
                  }}>{e.fl}</Text>
                </View>
              </View>
            )
          })}

        </View>

      </View>



      {/* {
        numberList.map((e, index) => <TextInCircle
          key={index}
          text={e.number}
          onPress={() => onPress(e)}
          style={{
            ...{
              width: 55,
              height: 55,
              marginTop: 10,
              borderRadius: 55 / 2,
              borderWidth: 1,
              borderColor: e.id === activePlayer ? Colors.darkYellow : bgColor,
              backgroundColor: e.id === activePlayer ? Colors.lightGreen : bgColor
            }, ...itemStyle
          }}
          txtStyle={{ color: Colors.base, }} />)
      } */}
    </View>
  </View>
}


const AssistTeamPlayer = ({ heading, list, activePlayer, isBlueTeam,
  onPress, itemStyle, containerStyle }) => {
  const [numberList, setNumberList] = useState([]);
  const [bgColor, setBgColor] = useState(Colors.lightBlue);
  const { width, height } = useDimensions().window;

  useEffect(() => {
    setNumberList(list);
    debugger
    setBgColor(isBlueTeam == false ? Colors.lightBlue : Colors.lightRed)
  }, [list]);

  const listContainer = {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  }

  const headingTxt = {
    marginLeft: 10,
    color: Colors.fontColorGray,
    fontFamily: Fonts.SemiBold,
  }

  return <View style={{ width: '100%', }}>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{
      ...listContainer, ...containerStyle,
      justifyContent: 'space-around',
    }}>
      {
        numberList.map((e, index) => <View style={{
          justifyContent: 'center', alignItems: 'center',

        }}>

          {e.playerProfilePictureUrl !== null && e.playerProfilePictureUrl !== undefined ?
            <TouchableOpacity style={{
              width: 90, height: 90, borderRadius: 90 / 2,
              backgroundColor: Colors.newGrayFontColor,
              alignItems: 'center', justifyContent: 'center',
              marginTop: 30,
            }}
              onPress={() => onPress(e)}
            >
              <FastImage
                source={{ uri: e.playerProfilePictureUrl }}
                // source={require('../../Images/dummyImage.png')}
                style={{ width: '98%', height: '98%', borderRadius: 90 / 2 }}
              />
            </TouchableOpacity>
            :
            <TextInCircle
              key={index}
              text={e.number}
              onPress={() => onPress(e)}
              style={{
                ...{
                  width: 55,
                  height: 55,
                  marginTop: 10,
                  borderRadius: 55 / 2,
                  borderWidth: 1,
                  borderColor: e.id === activePlayer ? Colors.darkYellow : bgColor,
                  backgroundColor: e.id === activePlayer ? Colors.lightGreen : bgColor
                }, ...itemStyle
              }}
              txtStyle={{ color: Colors.base, }} />
          }
          <Text style={{
            fontSize: 14, fontFamily: Fonts.Bold,
            lineHeight: 24, color: Colors.light
          }}>{e.playerName}</Text>
        </View>
        )
      }

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TextInCircle
          text={'Other Team'}
          onPress={() => onPress('other team')}
          style={{
            ...{
              // width: 45,
              // height: 45,
              // borderRadius: 45 / 2,
              width: width / 9.5,
              height: width / 9.5,
              marginTop: 6,
              borderRadius: (width / 9.5) / 2,

              // borderWidth: 1,
              // borderColor: activePlayer == 'other team' ? Colors.darkYellow : bgColor,
              backgroundColor: bgColor
            }, ...itemStyle,
          }}
          txtStyle={{ color: Colors.base, }} />
        <Text style={{
          fontSize: 14, fontFamily: Fonts.Bold,
          lineHeight: 24, color: Colors.base
        }}></Text>
      </View>

    </View>
  </View>
}


const SubActiveTeamPlayer = ({ heading, list, activePlayer, isBlueTeam,
  onPress, itemStyle, containerStyle, isOtherShow }) => {
  const [numberList, setNumberList] = useState([]);
  const [bgColor, setBgColor] = useState(Colors.lightBlue);
  const { width, height } = useDimensions().window;

  useEffect(() => {
    setNumberList(list);
    debugger
    setBgColor(isBlueTeam == false ? Colors.lightBlue : Colors.lightRed)
  }, [list]);

  const listContainer = {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  }

  const headingTxt = {
    marginLeft: 10,
    color: Colors.fontColorGray,
    fontFamily: Fonts.SemiBold,
  }

  return <View style={{ width: '100%', alignSelf: 'center' }}>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{
      ...listContainer,
      ...containerStyle,
      justifyContent: 'space-around',
      // backgroundColor: 'red',
      flexWrap: 'wrap', flexDirection: 'row'
    }}
    >
      <FlatList
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        data={numberList}
        // horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(item, index) => <View style={{
          justifyContent: 'center', alignItems: 'center',
          marginHorizontal: 5, marginVertical: 4
        }}>
          {item?.item.playerProfilePictureUrl !== null && item?.item.playerProfilePictureUrl !== undefined ?
            <TouchableOpacity style={{
              width: 50, height: 50, borderRadius: 50 / 2,
              backgroundColor: Colors.newGrayFontColor,
              alignItems: 'center', justifyContent: 'center',
              // marginTop: 30,
            }}
              onPress={() => onPress(item.item)}
            >
              <FastImage
                source={{ uri: item?.item.playerProfilePictureUrl }}
                // source={require('../../Images/dummyImage.png')}
                style={{ width: '98%', height: '98%', borderRadius: 50 / 2 }}
              />
            </TouchableOpacity>
            :
            <TextInCircle
              key={index}
              text={item?.item.number}
              onPress={() => onPress(item.item)}
              style={{
                ...{
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                  // borderWidth: 1,
                  // borderColor: e.id === activePlayer ? Colors.darkYellow : bgColor,
                  backgroundColor: item?.item.playerId === activePlayer ? Colors.lightGreen : bgColor
                }, ...itemStyle,
              }}
              txtStyle={{ color: Colors.base, }} />
          }
          <Text style={{
            fontSize: 12, fontFamily: Fonts.Bold,
            lineHeight: 18, color: Colors.light
          }}>{item?.item.playerName}</Text>
        </View>
        }

      />

      {isOtherShow != false ?
        <View style={{
          justifyContent: 'center', alignItems: 'center',

        }}>
          <TextInCircle
            text={'Other Team'}
            onPress={() => onPress('other team')}
            style={{
              ...{
                // width: 45,
                // height: 45,
                // borderRadius: 45 / 2,
                width: width / 9.5,
                height: width / 9.5,
                marginTop: 35,
                borderRadius: (width / 9.5) / 2,

                // borderWidth: 1,
                // borderColor: activePlayer == 'other team' ? Colors.darkYellow : bgColor,
                backgroundColor: bgColor
              }, ...itemStyle
            }}
            txtStyle={{ color: Colors.base, }} />
          <Text style={{
            fontSize: 14, fontFamily: Fonts.Bold,
            lineHeight: 24, color: Colors.base
          }}> </Text>
        </View>
        : <></>
      }
    </View>
  </View>
}

const SubNonActiveTeamPlayer = ({ heading, list, activePlayer, isBlueTeam,
  onPress, itemStyle, containerStyle, isOtherShow }) => {
  const [numberList, setNumberList] = useState([]);
  const [bgColor, setBgColor] = useState(Colors.lightBlue);
  const { width, height } = useDimensions().window;

  useEffect(() => {
    setNumberList(list);
    debugger
    setBgColor(isBlueTeam == false ? Colors.lightBlue : Colors.lightRed)
  }, [list]);

  const listContainer = {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  }

  const headingTxt = {
    marginLeft: 10,
    color: Colors.fontColorGray,
    fontFamily: Fonts.SemiBold,
  }

  return <View style={{ width: '100%', alignSelf: 'center' }}>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{
      ...listContainer,
      ...containerStyle,
      justifyContent: 'space-around',
      // backgroundColor: 'red',
    }}
    >
      <FlatList
        numColumns={6}
        keyExtractor={(item, index) => index.toString()}
        data={numberList}
        // horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(item, index) => <View style={{
          justifyContent: 'center', alignItems: 'center',
          marginHorizontal: 8, marginVertical: 4
        }}>
          {item?.item.playerProfilePictureUrl !== null && item?.item.playerProfilePictureUrl !== undefined ?
            <TouchableOpacity style={{
              width: 50, height: 50, borderRadius: 50 / 2,
              backgroundColor: Colors.newGrayFontColor,
              alignItems: 'center', justifyContent: 'center',
              // marginTop: 30,
            }}
              onPress={() => onPress(item.item)}
            >
              <FastImage
                source={{ uri: item?.item.playerProfilePictureUrl }}
                // source={require('../../Images/dummyImage.png')}
                style={{ width: '98%', height: '98%', borderRadius: 50 / 2 }}
              />
            </TouchableOpacity>
            :
            <TextInCircle
              key={index}
              text={item?.item.number}
              onPress={() => onPress(item.item)}
              style={{
                ...{
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                  // borderWidth: 1,
                  // borderColor: e.id === activePlayer ? Colors.darkYellow : bgColor,
                  backgroundColor: item?.item.playerId === activePlayer ? Colors.lightGreen : bgColor
                }, ...itemStyle,
              }}
              txtStyle={{ color: Colors.base, }} />
          }
          <Text style={{
            fontSize: 12, fontFamily: Fonts.Bold,
            lineHeight: 18, color: Colors.light
          }}>{item?.item.playerName}</Text>
        </View>
        }

      />

      {isOtherShow != false ?
        <View style={{
          justifyContent: 'center', alignItems: 'center',

        }}>
          <TextInCircle
            text={'Other Team'}
            onPress={() => onPress('other team')}
            style={{
              ...{
                // width: 45,
                // height: 45,
                // borderRadius: 45 / 2,
                width: width / 9.5,
                height: width / 9.5,
                marginTop: 35,
                borderRadius: (width / 9.5) / 2,

                // borderWidth: 1,
                // borderColor: activePlayer == 'other team' ? Colors.darkYellow : bgColor,
                backgroundColor: bgColor
              }, ...itemStyle
            }}
            txtStyle={{ color: Colors.base, }} />
          <Text style={{
            fontSize: 14, fontFamily: Fonts.Bold,
            lineHeight: 24, color: Colors.base
          }}> </Text>
        </View>
        : <></>
      }
    </View>
  </View>
}


export {
  ActiveTeamPlayer, ScoreActiveTeamPlayer,
  AssistTeamPlayer, SubActiveTeamPlayer, SubNonActiveTeamPlayer
};
