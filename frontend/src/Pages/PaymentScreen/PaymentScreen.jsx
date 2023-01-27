import React, { useState } from "react";
import styles from "./PaymentScreen.module.css";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../Redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
function PaymentScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeolder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className={styles.form} onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="Paypal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            />
            <label htmlFor="paypal">Paypal</label>
          </div>
          <div>
            <input
              type="radio"
              id="stripe"
              name="paymentMethod"
              value="Stripe"
              required
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <Button
            type="submit"
            onClick={submitHandler}
            style={{
              backgroundColor: "#F0C034",
              color: "black",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PaymentScreen;
