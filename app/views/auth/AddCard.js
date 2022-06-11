import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardForm as PaymentCardForm } from '@stripe/stripe-react-native';

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publishableKey: 'pk_test_biO5q9coT8mt9z1At7yYdkYN00cJvVRpVe'
    }
  }

  render() {
    const { publishableKey } = this.state;
    return (
      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier="merchant.identifier"
      >
        <PaymentCardForm
          onFormComplete={(cardDetails) => {
          console.log('card details', cardDetails);
            setCard(cardDetails);
          }}
          style={{height: 200}}
        />
      </StripeProvider>
    )
  }
}

export default AddCard;