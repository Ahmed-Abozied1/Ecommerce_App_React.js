import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Redux/actions/userActions";
function NavBar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className={styles.sticky}>
        <Container className={styles.items}>
          <LinkContainer to="/">
            <Navbar.Brand className={styles.logo}> Shoopy </Navbar.Brand>

            {/* <img style={{width:"50px",height:"50px"}}
              src="/https://media.istockphoto.com/id/1266252971/vector/online-shop-logo-design.jpg?s=612x612&w=0&k=20&c=UtXBlVqaijOagZXPDiEZNlDoBRfE8o7RW8Sb1VUdUeg="
              alt="logo"
            /> */}
          </LinkContainer>
          <div className={styles.cart}>
            <Link style={{ color: "#fff" ,margin:"1rem"}} to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className={styles.dropdown}>
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className={styles.dropdown_content}>
                  <Link style={{color:"#fff" ,}}  to="#signout" onClick={signOutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className={styles.signIn}>
                Sign In
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
