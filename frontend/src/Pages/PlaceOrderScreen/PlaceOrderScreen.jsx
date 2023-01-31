import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PlaceOrderScreen.css";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { Button } from "@mui/material";
import { createOrder } from "../../Redux/actions/orderAcion";
import { ORDER_CREATE_RESET } from "../../Redux/constants/orderConstants";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";

function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  if (!cart.paymentMethod) {
    navigate("/payment");
  }
  const { loading, success, error, order } = useSelector(
    (state) => state.orderCreate
  );

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeorderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, navigate, order, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      {loading && <Loading></Loading>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <div className="checkoutpage">
        <div className="container">
          <div className="row">
            <div className="col-md-8 order-md-1">
              <div className="checkout_sections">
                <h4
                  className="Delivery_Address"
                  style={{
                    backgroundColor: "#F5FAFF",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <span className="_1_m52b">Delivery Address</span>
                </h4>

                <label className=" Saved_address " />
                <div className=""></div>
                <div className="Payment_align">
                  <div className="">
                    <div className=" saved_address1 " />
                    <p>
                      <strong>Name : </strong>
                      {cart.shippingAddress.fullName} <br />
                      <strong>Address : </strong>
                      {cart.shippingAddress.address} /
                      {cart.shippingAddress.city} /
                      {cart.shippingAddress.postalCode} /
                      {cart.shippingAddress.country} <br />
                      <strong>PaymentMethod : </strong>
                      {cart.paymentMethod} <br />
                    </p>
                  </div>
                  <div className="saved_address_edit "></div>
                </div>
              </div>
            </div>

            <div className="checkout_sections">
              <h4
                className="Delivery_Address"
                style={{
                  backgroundColor: "#F5FAFF",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <span className="_1_m52b">Order summery</span>
              </h4>
              <label className=" Saved_address ">
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">Items</h6>
                    </div>
                    <span className="text-muted">
                      ${cart.itemsPrice.toFixed(2)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">shipping</h6>
                    </div>
                    <span className="text-muted">
                      ${cart.shippingPrice.toFixed(2)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">tax</h6>
                    </div>
                    <span className="text-muted">
                      $ {cart.taxPrice.toFixed(2)}
                    </span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </li>
                </ul>
                <Button
                  disabled={cart.cartItems.length === 0}
                  onClick={placeorderHandler}
                  style={{
                    backgroundColor: "#F0C034",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                >
                  place Order
                </Button>
              </label>
            </div>

            <div className="checkout_sections">
              <h4
                className="Delivery_Address"
                style={{
                  backgroundColor: "#F5FAFF",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <span className="_1_m52b">Order Items</span>
              </h4>
              <label className=" Saved_address">
                <ul className="list-group mb-3">
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div
                        className=" d-flex m-4"
                        style={{ justifyContent: "space-between" }}
                      >
                        {/* image */}
                        <div className="small row">
                          <img src={item.img} alt={item.name}></img>
                        </div>
                        {/* productName */}
                        <div>
                          <Link to={`/ptoduct/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        {/* show price */}
                        <div>
                          {item.quantity} x $ {item.price} = $
                          {item.quantity * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
