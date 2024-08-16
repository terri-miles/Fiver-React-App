import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";

const Success = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await apiRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);
  return (
    <div>
      Payment successful. Ypu are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;
