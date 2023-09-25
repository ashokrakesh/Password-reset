import React, { useState } from "react";
import { Card, Input, TextField, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import axios from "axios";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [dbvalue, setDbvalue] = useState(false);
  const [checked, setChecked] = useState(false);
  console.log(email);
  const SendNow1 = () => {
    try {
      axios.get(`http://localhost:5000/mail-check`, email).then((res) => {
        let mail = [];
        mail = res.data.filter((ele) => ele.email === email);
        console.log(mail);
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
  const SendNow = () => {
    let data = { email: email };
    try {
      axios.post(`http://localhost:5000/password-reset`, data);
      alert("Password reset link sent successfully");
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
        <h1>Enter Email</h1>
        <TextField
          style={{ width: "300px" }}
          value={email}
          name="email"
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
        />
        <Button
          variant="contained"
          disabled={valid ? false : true}
          onClick={() => SendNow1()}
        >
          Verify mail
        </Button>
        {dbvalue ? (
          <div>
            Mail verified.
            <CloudDoneIcon />
          </div>
        ) : checked ? (
          <p style={{ color: "red" }}>
            Sorry! Entered email was not registered,Please Register new account
            at Login page If you are new to this site
          </p>
        ) : (
          <></>
        )}
        <Button
          variant="contained"
          disabled={dbvalue ? false : true}
          onClick={() => SendNow()}
        >
          <NavLink to="/" style={{ textDecoration: "none" }}>
            Send Link
          </NavLink>
        </Button>
        {!dbvalue ? <></> : <p>Click Button to send password reset Link</p>}
      </Card>
    </div>
  );
}

export default PasswordReset;
