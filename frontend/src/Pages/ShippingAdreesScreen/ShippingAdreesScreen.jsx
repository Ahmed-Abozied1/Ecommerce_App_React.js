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

  if (!userInfo ||!shippingAddress) {
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
/*
             <label className=" Saved_address ">
                <div className="Payment_align">
                  <h5 className="mb-3">Edit address</h5>
                  <form
                    className="needs-validation was-validated"
                    novalidate=""
                    _lpchecked="1"
                  >
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder=""
                          value=""
                          required=""
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder=""
                          value=""
                          required=""
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="username">Username</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">@</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Username"
                          required=""
                        />
                        <div
                          className="invalid-feedback"
                          style={{ width: "100%" }}
                        >
                          Your username is required.
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="email">
                        Email <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="you@example.com"
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        required=""
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="address2">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Apartment or suite"
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <select
                          className="custom-select d-block w-100"
                          id="country"
                          required=""
                        >
                          <option value="">Choose...</option>
                          <option>United States</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label for="state">State</label>
                        <select
                          className="custom-select d-block w-100"
                          id="state"
                          required=""
                        >
                          <option value="">Choose...</option>
                          <option>California</option>
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label for="zip">Zip</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder=""
                          required=""
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>
                    <div className="Edit_address_buttons">
                      <button className="saved_address_deliver  saved_address_deliversize saved_address_bold">
                        Save and Deliver Here
                      </button>
                      <button className="Edit_address_cancel">CANCEL</button>
                    </div>
                  </form>
                </div>
              </label> */
