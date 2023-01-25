import { Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./ShippingAdreesScreen.module.css";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../Redux/actions/cartAction";
import { useNavigate } from "react-router-dom";

function ShippingAdreesScreen() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSignin);
const {shippingAddress}= useSelector((state) => state.cart);

  if (!userInfo) {
    navigate("/signin");
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div>
        <form className={styles.form} onSubmit={submitHandler}>
          <div>
            <h1>Shipping Address</h1>
          </div>

          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter Full Name"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Adddress">Address</label>
            <input
              type="text"
              id="Address"
              placeholder="Enter Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="postalCode">postalCode</label>
            <input
              type="number"
              id="postalCode"
              placeholder="Enter postalCode"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="City">City</label>
            <input
              type="text"
              id="City"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Country">Country</label>
            <input
              type="text"
              id="Country"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label />
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
    </div>
  );
}

export default ShippingAdreesScreen;
