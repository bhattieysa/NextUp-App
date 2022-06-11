import React, { Component } from "react";
import { Text, View, TouchableOpacity, Modal, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Colors } from '../../constants';

export default class StatesListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateCodes: [
        {
          abbr: 'AK',
        },
        {
          abbr: 'AZ',
        },
        {
          abbr: 'AR',
        },
        {
          abbr: 'CA',
        },
        {
          abbr: 'CO',
        },
        {
          abbr: 'CT',
        },
        {
          abbr: 'DE',
        },
        {
          abbr: 'FL',
        },
        {
          abbr: 'GA',
        },
        {
          abbr: 'HI',
        },
        {
          abbr: 'ID',
        },
        {
          abbr: 'IL',
        },
        {
          abbr: 'IN',
        },
        {
          abbr: 'IA',
        },
        {
          abbr: 'KS',
        },
        {
          abbr: 'KY',
        },
        {
          abbr: 'LA',
        },
        {
          abbr: 'ME',
        },
        {
          abbr: 'MD',
        },
        {
          abbr: 'MA',
        },
        {
          abbr: 'MI',
        },
        {
          abbr: 'MN',
        },
        {
          abbr: 'MS',
        },
        {
          abbr: 'MO',
        },
        {
          abbr: 'MT',
        },
        {
          abbr: 'NE',
        },
        {
          abbr: 'NV',
        },
        {
          abbr: 'NH',
        },
        {
          abbr: 'NJ',
        },
        {
          abbr: 'NM',
        },
        {
          abbr: 'NY',
        },
        {
          abbr: 'NC',
        },
        {
          abbr: 'ND',
        },
        {
          abbr: 'OH',
        },
        {
          abbr: 'OK',
        },
        {
          abbr: 'OR',
        },
        {
          abbr: 'PA',
        },
        {
          abbr: 'RI',
        },
        {
          abbr: 'SC',
        },
        {
          abbr: 'SD',
        },
        {
          abbr: 'TN',
        },
        {
          abbr: 'TX',
        },
        {
          abbr: 'UT',
        },
        {
          abbr: 'VT',
        },
        {
          abbr: 'VA',
        },
        {
          abbr: 'WA',
        },
        {
          abbr: 'WV',
        },
        {
          abbr: 'WI',
        },
        {
          abbr: 'WY',
        },
      ]
    }
  }

  render() {
    const { openModal, onStateChoose, onClose } = this.props;
    return (
      <Modal
        visible={openModal}
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
              onPress={() => onClose()}
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
          <View
            style={{
              height: '98%',
              width: '100%',
            }}
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  width: '100%',
                  padding: 20,
                }}
              >
                {this.state.stateCodes.map(el => (
                  <TouchableOpacity onPress={() => onStateChoose(el.abbr)}>
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderBottomColor: Colors.white_08
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.white_08
                        }}
                      >{el.abbr}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}