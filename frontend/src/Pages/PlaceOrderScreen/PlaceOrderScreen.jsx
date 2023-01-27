import React from "react";
import { useSelector } from "react-redux";
import styles from "./PlaceOrderScreen.module.css";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { Button } from "@mui/material";

function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  if (!cart.paymentMethod) {
    navigate("/payment");
  }
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
const placeorderHandler=()=>{
    //TODO: dispatch action
}
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className={styles.row}>
        <div className={styles.col_2}>
          <ul>
            <li>
              <div className="card card_body">
                <h1>Shipping</h1>
                <p>
                  <strong>Name :</strong>
                  {cart.shippingAddress.fullName} <br />,
                  <strong>Address :</strong>
                  {cart.shippingAddress.address},{cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card_body">
                <h1>Payment</h1>
                <p>
                  <strong>Method :</strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card_body">
                <h1>Order Items</h1>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className={styles.row}>
                        {/* image */}
                        <div>
                          <img
                            src={item.img}
                            alt={item.name}
                            className={styles.small}
                          ></img>
                        </div>
                        {/* productName */}
                        <div className={styles.showName}>
                          <Link to={`/ptoduct/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        {/* show price */}
                        <div>
                          {" "}
                          {item.quantity} x $ {item.price} = $
                          {item.quantity * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col_1">
          <div className="card card_body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className={styles.row}>
                  <div>Items</div>
                  <div>$ {cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={styles.row}>
                  <div>Shipping</div>
                  <div>$ {cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={styles.row}>
                  <div>Tax</div>
                  <div>$ {cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={styles.row}>
                  <div>
                    {" "}
                    <strong>Total</strong>
                  </div>
                  <div>
                    {" "}
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <Button
                  className="block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeorderHandler}
                >
                  place Older
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
