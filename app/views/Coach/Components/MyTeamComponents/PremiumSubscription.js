import React from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import { Title } from '../../../../components/common/titleLabel';
import { Colors, Fonts, Layout } from '../../../../constants';
import moment from 'moment';
import { getFontScaleSync } from 'react-native-device-info';
import Navigation from '../../../../lib/Navigation';
import { ScreenHeader } from '../../../../components/common/ScreenHeader';

let wide = Layout.width;

const PremiumSubscription = ({ }) => {

  return (
    <View>
      <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
        {/* <AppLoader visible={this.state.loading} /> */}
        <View>
          <ScreenHeader
            title={'Subscription'}
            backButtonAction={() => Navigation.back()}
          />
        </View>

        <TouchableOpacity
          key={isbtnEnable}
          activeOpacity={0.3}
          style={{
            width: wide * 0.8, height: 48,
            backgroundColor: Colors.btnBg,
            alignSelf: 'center', borderRadius: 24,
            justifyContent: 'center',
            opacity: isbtnEnable === false ? 0.3 : 1.0,
            // marginBottom: 50,
            // marginTop: 20,
          }} onPress={() => {
            if (isbtnEnable) {
              this.actionAddTeam()
            }
          }}>
          <Text style={{
            alignSelf: 'center', color: Colors.light,
            fontFamily: Fonts.Bold,
          }}>Done</Text>
        </TouchableOpacity>





      </SafeAreaView >

    </View>
  )
}