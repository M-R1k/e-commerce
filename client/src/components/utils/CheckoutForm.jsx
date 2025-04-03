import React, { useCallback, useEffect, useState } from "react";
import localhost from "../../config";
import { useCart } from "../../CartContext";
import { useLocation } from "react-router-dom";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const { state: cart, dispatch } = useCart([]);
  const [stripeData, setStripeData] = useState([]);
  const [clientSecret, setClientSecret] = useState("");

  const params = useLocation();
  // console.log(params);
  const adress = params.state.adress;
  const shipping_amount = params.state.shipping_amount;
  const shipping_name = params.state.shipping_name;
  const shipping_estimatedDays = params.state.shipping_estimatedDays;
  const tracking_num = params.state.tracking_num;

  // console.log(`adress => ${params.state.adress} | shipping => ${params.state.shipping}`)
  useEffect(() => {
    const newStripeData = cart.map((item) => {
      return {
        price: item.product.keyStripe,
        quantity: item.itemQty,
        adress: adress,
        shipping_amount: shipping_amount,
        shipping_name: shipping_name,
        shipping_estimatedDays: shipping_estimatedDays,
        tracking_num: tracking_num,
      };
    });
    setStripeData(newStripeData);
  }, [cart]);

  const fetchClientSecret = useCallback(async () => {
    if (stripeData.length === 0) return;
    const res = await fetch(`${localhost}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stripeData),
    });

    const data = await res.json();

    if (data.clientSecret) {
      setClientSecret(data.clientSecret);
    }
  }, [stripeData]);

  useEffect(() => {
    fetchClientSecret();
  }, [stripeData, fetchClientSecret]);

  const options = { clientSecret };

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={props.stripe} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
