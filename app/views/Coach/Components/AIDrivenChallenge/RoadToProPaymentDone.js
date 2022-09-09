import { View, Text, Image, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Layout, Colors, Fonts, CommonStyles } from '../../../../constants'
import { getListOFChallenges } from '../../../../actions/home'
import AppLoader from '../../../../utils/Apploader';
import { connect } from 'react-redux';
import SubscriptionChallengeBriefInfos from './SubscriptionChallengeBriefInfos';
import { TouchableOpacity } from 'react-native-gesture-handler';
const RoadToProPaymentDone = (props) => {
    const [loading, setLoading] = useState(false)
    const [teamId, setTeamId] = useState()
    const [roadToProData, setRoadToProData] = useState()
    const [selectedLevel, setSelectedLevel] = useState(0)



    let wide = Layout.width;
    useEffect(() => {


        props.dispatch(getListOFChallenges(props.teamId, '0', (result, response) => {

            if (result) {
                setRoadToProData(response.subscriptionLevelResponseArrayList);
                console.log("eydata", response.subscriptionLevelResponseArrayList)
            } else {
                //console.log("eysadata",props.teamId)
            }
        }))
    }, [props.teamId])

    return (

        <View  >
            <AppLoader visible={loading} />
            <FlatList

                data={roadToProData}

                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled={true}

                legacyImplementation={false}

                keyExtractor={item => item.index}
                renderItem={(item, index) =>

                    <View style={{ height: wide * 0.5 }}>
                      <TouchableOpacity onPress={()=>{setSelectedLevel(item.index)}}>
                        <View style={{
                            width: wide * 0.23, height: wide * 0.32,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 3,
                            borderColor: Colors.borderColor,


                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: item.index === 0 ? 0 : wide * 0.05


                        }}>
                            {item.item.levelImageUrl==""?
                            <Image style={{
                                width: '60%', height: '60%', tintColor: item.index === 0 ? Colors.stars :
                                    item.index === 1 ?
                                        Colors.light : Colors.overlayWhite
                            }} resizeMode={'contain'}
                            source={    require('../../../../Images/level_gold.png')} />
                            :
                            <Image style={{
                                width: '60%', height: '60%', tintColor: item.index === 0 ? Colors.stars :
                                    item.index === 1 ?
                                        Colors.light : Colors.overlayWhite
                            }} resizeMode={'contain'}

                            source={{ uri: item.item.levelImageUrl }}
                                />
                            }

                            <Text style={{
                                color: item.index === 1 || item.index === 0 ? Colors.light : Colors.overlayWhite, fontSize: 12, fontFamily: Fonts.Bold,
                                marginLeft: 5, marginTop: wide * 0.03
                            }}>
                                Level {item.index + 1}
                            </Text>

                        </View>
                        </TouchableOpacity>
                        <View style={{
                            height: wide * 0.1, width: '100%',
                            justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0
                        }}>
                            <View style={{
                                width: '100%', height: wide * 0.02,
                                backgroundColor: Colors.borderColor,
                                justifyContent: 'center', alignItems: 'center',
                                borderTopLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
                                borderBottomLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
                                left: item.index === 0 ? wide * 0.1 / 9 : 0,
                                borderTopRightRadius: roadToProData.length > 0 ? item.index === roadToProData.length - 1 ? wide * 0.02 / 2 : 0 : 0,
                                borderBottomRightRadius: roadToProData.length > 0 ? item.index === roadToProData.length - 1 ? wide * 0.02 / 2 : 0 : 0,
                                Right: roadToProData.length > 0 ? item.index === roadToProData.length - 1 ? wide * 0.1 / 2 : 0 : 0,
                            }}>


                            </View>
                            <Image style={{
                                width: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07,
                                height: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07,
                                position: 'absolute',
                                left: wide * 0.14,
                                left: item.index === 0 ? wide * 0.1 : wide * 0.14,
                                tintColor: item.index === 0 ? Colors.stars : item.index === 1 ? Colors.shade : null
                            }} resizeMode={'contain'}
                                source={item.index === 0 || item.index === 1 ? require('../../../../Images/tick_selected.png') : require('../../../../Images/lock_circle.png')} />
                        </View>
                    </View>
          
                }
            />

{roadToProData!=undefined?
<SubscriptionChallengeBriefInfos  data={roadToProData} selectedLevel={selectedLevel}   />
:
null
}

        </View >

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
export default connect(mapStateToProps)(RoadToProPaymentDone);
