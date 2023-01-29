import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import MessageBox from "../../components/MessageBox/MessageBox";
import { addToCart, removeFromCart } from "../../Redux/actions/cartAction";
import styles from "./CartScreen.module.css";
function CartScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get id from url
  const { id } = useParams();
  //get value from url
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);
  //   delete item from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  //check out
  const checkoutHandler = () => {
    if ( !userInfo ) {
      navigate("/signin");
    }
   
    else {
      navigate("/shipping");

    }
    //  navigate("/signin?redirect=shipping");
  };
  return (
    <div className={styles.row}>
      <div className={styles.col_2}>
        {/* header and card */}
        <div className={styles.rowHeader}>
          <h1 className={styles.header}>Shooping Cart</h1>
          <div className={styles.col_1}>
            <div className="card card-body">
              <ul>
                <li>
                  <h2>
                    Total (
                    {cartItems.reduce(
                      (accumulator, currentItem) => accumulator + currentItem.quantity,
                      0
                    )}
                     ) <span></span> items : $
                    {cartItems.reduce(
                      (accumulator, currentItem) =>
                      accumulator + currentItem.price * currentItem.quantity,
                      0
                    )}
                  </h2>
                </li>
                <li>
                  {/* <Link to={`/signin?redirect=shipping`}> */}
                  <Button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    style={{ backgroundColor: "#f0c040", color: "black" }}
                  >
                    proceed to checkout
                  </Button>
                  {/* </Link> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* items */}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty <Link to="/">  Go Shooping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
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
                    <Link to={`/ptoduct/${item.product}`}>{item.name}</Link>
                  </div>
                  {/* quantity item in cartScreen */}
                  <div>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* show price */}
                  <div>$ {item.price}</div>
                  {/* delete Button */}
                  <Button
                    onClick={() => removeFromCartHandler(item.product)}
                    style={{ borderStyle:"none", backgroundColor: "#f0c040", color: "black" }}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CartScreen;
