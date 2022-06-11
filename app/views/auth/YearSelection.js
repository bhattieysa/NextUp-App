import React, { Component } from "react";
import { Text, View, TouchableOpacity, Modal, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../../constants';

export default class YearSelectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: []
    }
  }

  componentDidMount() {
    const years = []

    for (let i = 1901; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    this.setState({
      ...this.state,
      years: [...years].reverse()
    })
  }

  render() {
    const { openModal, onYearChoose, onClose } = this.props;
    const { years } = this.state;
    return (
      <Modal
        visible={openModal}
      >
        <SafeAreaView style={{
          backgroundColor: Colors.base
        }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}
          >
            <Text style={{ color: Colors.white_08, fontSize: 20 }}>Choose Year</Text>
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
              height: '95%',
              width: '100%'
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
                {console.log(years)}
                {years.map(el => (
                  <TouchableOpacity onPress={() => onYearChoose(el)}>
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
                      >{el}</Text>
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