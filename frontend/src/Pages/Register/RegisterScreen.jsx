import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./RegisterScreen.module.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/actions/userActions";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { userInfo,loading,error } = useSelector((state) => state.userRegister);


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(error);

    if (password !== confirmPassword || null) {

       alert("password and confirmPassword not match")
    }
    else{
      dispatch(register(name,email, password));

    }

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
          <h1>Sign Up</h1>
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="confirmPassword">confirmPassword</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </Button>
        </div>
        <div>
          <label />
          <div>
           Already have an account?{" "}
            <Link className={styles.newAccount} to="/signin">
            Sign-In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
