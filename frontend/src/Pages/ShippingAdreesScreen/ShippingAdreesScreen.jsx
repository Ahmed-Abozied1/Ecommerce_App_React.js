import { Button } from "@mui/material";
import React, { useState } from "react";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../Redux/actions/cartAction";
import { useNavigate } from "react-router-dom";

function ShippingAdreesScreen() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { shippingAddress } = useSelector((state) => state.cart);

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
    if (!userInfo ) {
      navigate("/signin");
    }
    else{
      navigate("/payment");

    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div>
        <label className=" Saved_address ">
          <div className="Payment_align">
            <form
              className="needs-validation was-validated"
              novalidate=""
              _lpchecked="1"
            >
              <div className="row">
                <div>
                  <label htmlFor="firstName">FullName</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter fullName"
                    value={fullName}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />

                  <div className="invalid-feedback">
                    Valid Full name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">Address</label>

                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  className="form-control"
                  id="Address"
                  placeholder=""
                />
              <div className="invalid-feedback">
                  Please enter a valid Address.
                </div>
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <input
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder=""
                  />
                  <div className="invalid-feedback">
                    Please Enter a valid country.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder=""
                  />
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="postalCode">postalCode</label>
                  <input
                    type="number"
                    className="form-control"
                    id="postalCode"
                    placeholder=""
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />

                  <div className="invalid-feedback">
                    postalCode code required.
                  </div>
                </div>
              </div>
              <div className="Edit_address_buttons">
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
        </label>
      </div>
    </div>
  );
}

export default ShippingAdreesScreen;
