import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import apiRequest from "../../utils/apiRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutform/CheckoutForm"



const stripePromise = loadStripe(
  "pk_test_51PlBSTFpw1LJ19HXsZhxOFI3Y8oVBb6aMlHVdLC53MtWXYYm7yof3eUzPMR6Qk56xuWVqf2ht4k4kAuzaxKHBg1O00O5RthK2l"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  
  const { id } = useParams();
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await apiRequest.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);
  
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return <div className="pay">
     {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;
