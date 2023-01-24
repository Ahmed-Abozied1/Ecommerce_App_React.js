import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./SigninScreen.module.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../Redux/actions/userActions";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
function SigninScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { userInfo,loading,error } = useSelector((state) => state.userSignin);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  };
  useEffect(() => {
    if (userInfo) {
        navigate(redirect)
    }
  
    
  }, [navigate, redirect, userInfo])
  
  return (
    <div>
      <form className={styles.form} onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <Loading></Loading> }
{error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password Address</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <Button
            onClick={submitHandler}
            style={{
              backgroundColor: "#F0C034",
              color: "black",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Sign In
          </Button>
        </div>
        <div>
          <label />
          <div>
            New Customer ?{" "}
            <Link className={styles.newAccount} to="/register">
              Create Now Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
