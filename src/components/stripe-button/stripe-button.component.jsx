import React from "react";
import StripeCheckout  from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  //String API Key
  const publishableKey = 'pk_test_51KFTpuFmdQ2lAYmwFba9QKruQbw66eUbIXbgKb84gv1u14lSEPbi11UOwhgfS0MrbK1tCTH9QwMXUa6Vc1hgWWuJ00qwZWbUBP';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  }

  return (
    <StripeCheckout
      label = 'Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price }`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;