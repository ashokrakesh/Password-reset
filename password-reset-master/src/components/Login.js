import React, { useState } from "react";
import { Card, Input, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { useContext } from "react";
import axios from "axios";

import dataContext from "../context/Create";
function Login() {
  const data = useContext(dataContext);
  const [dbvalue, setDbvalue] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const submitNow = () => {
    let data = {
      email: email,
      password: pass,
    };
    try {
      axios.post(`http://localhost:5000/login`, data).then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          window.localStorage.setItem("token", res.data.token);
          navigate("/main");
        } else {
          alert(res.data.message);
        }
      });
    } catch (err) {
      alert(err.message);
    }
    setEmail("");
    setValid(false);
    setPass("");
  };
  const onBlurHandle = () => {
    try {
      axios.get(`http://localhost:5000/mail-check`, email).then((res) => {
        let mail = [];
        mail = res.data.filter((ele) => ele.email === email);
        if (mail.length === 0) {
          setDbvalue(false);
        } else {
          setDbvalue(true);
        }
        setChecked(true);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "80px",
      }}
    >
      <Card
        style={{
          width: 400,
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <h1>Login</h1>
        <TextField
          style={{ width: "300px" }}
          label="Mail"
          error={email === "" ? false : valid ? false : true}
          variant="standard"
          onChange={(e) => {
            setEmail(e.target.value);
            setValid(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                e.target.value
              )
            );
          }}
          onBlur={() => onBlurHandle()}
        />
        <TextField
          style={{ width: "300px" }}
          label="Password"
          variant="standard"
          value={pass}
          name="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <div>
          <a style={{ textDecoration: "none", margin: "25px" }} href="/sign-up">
            <Link to="/sign-up"> newUser? Register</Link>
          </a>
          <a
            style={{ textDecoration: "none", margin: "25px" }}
            href="/password-reset"
          >
            <Link to="/password-reset">Forgot Password</Link>
          </a>
        </div>
        <Button variant="contained" onClick={() => submitNow()}>
          Login
        </Button>
        {email === "" ? (
          <></>
        ) : dbvalue ? (
          <div>
            Mail verified.
            <CloudDoneIcon />
          </div>
        ) : checked ? (
          <p style={{ color: "red" }}>
            Sorry! Entered email was not registered,Please Register new account.
          </p>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default Login;
