import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, { Component } from 'react';
import { Colors, Fonts, Layout } from '../../constants';
import Navigation from '../../lib/Navigation';

const wide = Layout.width;
export default class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: {
        "object": "list",
        "url": "/v1/customers/cus_LqPBs4oJAJaJBc/sources",
        "has_more": false,
        "data": [
          {
            "id": "card_1L8iMrEdiiuN6A9dyxkKk8vf",
            "object": "card",
            "address_city": null,
            "address_country": null,
            "address_line1": null,
            "address_line1_check": null,
            "address_line2": null,
            "address_state": null,
            "address_zip": null,
            "address_zip_check": null,
            "brand": "Visa",
            "country": "US",
            "customer": "cus_LqPBs4oJAJaJBc",
            "cvc_check": "pass",
            "dynamic_last4": null,
            "exp_month": 8,
            "exp_year": 2023,
            "fingerprint": "ympJe96dNvOrxd5v",
            "funding": "credit",
            "last4": "4242",
            "metadata": {},
            "name": null,
            "tokenization_method": null
          },
          {
            "id": "card_1L8iMrEdiiuN6A9dyxkKk8vf",
            "object": "card",
            "address_city": null,
            "address_country": null,
            "address_line1": null,
            "address_line1_check": null,
            "address_line2": null,
            "address_state": null,
            "address_zip": null,
            "address_zip_check": null,
            "brand": "American Express",
            "country": "US",
            "customer": "cus_LqPBs4oJAJaJBc",
            "cvc_check": "pass",
            "dynamic_last4": null,
            "exp_month": 8,
            "exp_year": 2023,
            "fingerprint": "ympJe96dNvOrxd5v",
            "funding": "credit",
            "last4": "4242",
            "metadata": {},
            "name": null,
            "tokenization_method": null
          },
          {
            "id": "card_1L8iMrEdiiuN6A9dyxkKk8vf",
            "object": "card",
            "address_city": null,
            "address_country": null,
            "address_line1": null,
            "address_line1_check": null,
            "address_line2": null,
            "address_state": null,
            "address_zip": null,
            "address_zip_check": null,
            "brand": "Diners Club",
            "country": "US",
            "customer": "cus_LqPBs4oJAJaJBc",
            "cvc_check": "pass",
            "dynamic_last4": null,
            "exp_month": 8,
            "exp_year": 2023,
            "fingerprint": "ympJe96dNvOrxd5v",
            "funding": "credit",
            "last4": "4242",
            "metadata": {},
            "name": null,
            "tokenization_method": null
          },
          {
            "id": "card_1L8iMrEdiiuN6A9dyxkKk8vf",
            "object": "card",
            "address_city": null,
            "address_country": null,
            "address_line1": null,
            "address_line1_check": null,
            "address_line2": null,
            "address_state": null,
            "address_zip": null,
            "address_zip_check": null,
            "brand": "JCB",
            "country": "US",
            "customer": "cus_LqPBs4oJAJaJBc",
            "cvc_check": "pass",
            "dynamic_last4": null,
            "exp_month": 8,
            "exp_year": 2023,
            "fingerprint": "ympJe96dNvOrxd5v",
            "funding": "credit",
            "last4": "4242",
            "metadata": {},
            "name": null,
            "tokenization_method": null
          },
          {
            "id": "card_1L8iMrEdiiuN6A9dyxkKk8vf",
            "object": "card",
            "address_city": null,
            "address_country": null,
            "address_line1": null,
            "address_line1_check": null,
            "address_line2": null,
            "address_state": null,
            "address_zip": null,
            "address_zip_check": null,
            "brand": "MasterCard",
            "country": "US",
            "customer": "cus_LqPBs4oJAJaJBc",
            "cvc_check": "pass",
            "dynamic_last4": null,
            "exp_month": 8,
            "exp_year": 2023,
            "fingerprint": "ympJe96dNvOrxd5v",
            "funding": "credit",
            "last4": "4242",
            "metadata": {},
            "name": null,
            "tokenization_method": null
          },
        ]
      }
    }
  }

  getCardLogo(card) {
    switch (card) {
      case 'Visa':
        return require('../../Images/visa.png');
      case 'MasterCard':
        return require('../../Images/mastercard.png');
      case 'Diners Club':
        return require('../../Images/diners-club.png');
      case 'JCB':
        return require('../../Images/jcb.png');
      case 'American Express':
        return require('../../Images/american_express.png');
      default:
        break;
    }
  }

  _renderCard(item) {
    return (
      <TouchableOpacity>
        <View style={styles.cardsListContainer}>
          <View style={styles.cardLogo}>
            <Image
              style={{ width: 50, height: 50 }}
              source={this.getCardLogo(item.brand)}
              resizeMode='contain'
            />
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.cardDigits}>{`**** ${item.last4}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  navigatePayment() {
    Navigation.navigate('AddCard');
  }

  render() {
    const { cards } = this.state;
    return (

      <SafeAreaView style={styles.container}>
        <View style={{ width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Payment Options</Text>
          </View>
          <View style={{ position: 'absolute', top: 20, right: 40 }}>
            <Image source={require('../../Images/cross_icon.png')} style={{ width: 20, height: 20 }} />
          </View>
        </View>
        <View style={styles.cardsListSection}>
          <Text style={[
            styles.headingText,
            {
              fontSize: 18
            }
          ]}>Payment method</Text>
          <FlatList
            data={cards.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => this._renderCard(item)}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.navigatePayment()}
          style={styles.btn}>
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base,
    paddingHorizontal: 20,
    width: '100%'
  },
  headingText: {
    fontSize: 24,
    color: Colors.white_08
  },
  heading: {
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 40
  },
  cardsListSection: {
    marginTop: 25,
  },
  cardsListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 20,
    paddingRight: 20
  },
  cardLogo: {
    marginRight: 20
  },
  cardDetails: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white_08,
    width: '100%',
    paddingBottom: 10,
    opacity: 0.5
  },
  cardDigits: {
    color: Colors.white_08
  },
  btn: {
    width: wide * 0.8,
    height: 48,
    backgroundColor: Colors.btnBg,
    alignSelf: 'center',
    borderRadius: 24,
    justifyContent: 'center',
    bottom: Platform.OS == 'android' ? 50 : 60, position: 'absolute'
  },
  btnText: {
    alignSelf: 'center',
    color: Colors.light,
    fontFamily: Fonts.Bold,
  }
})