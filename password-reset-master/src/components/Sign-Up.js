import React, { useEffect, useState } from "react";
import { Card, TextField, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [conpass, setConpass] = useState("");
  const [passvalid, setPassvalid] = useState(false);

  const submitNow = () => {
    let data = {
      email,
      password,
    };
    try {
      axios.post(`http://localhost:5000/adduser`, data).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setValid(false);
    setPassword("");
    setConpass("");
    setPassvalid(false);
    alert("Sign Up successfully!");
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
        <h1>Sign Up</h1>
        <TextField
          style={{ width: "300px" }}
          value={email}
          name="email"
          label="Mail"
          error={email == "" ? false : valid ? false : true}
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
        <TextField
          style={{ width: "300px" }}
          label="Password"
          value={password}
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value);
            if (conpass === e.target.value) setPassvalid(true);
            else setPassvalid(false);
          }}
        />
        <TextField
          style={{ width: "300px" }}
          label="Confirm Password"
          variant="standard"
          value={conpass}
          onChange={(e) => {
            setConpass(e.target.value);
            if (password === e.target.value) setPassvalid(true);
            else setPassvalid(false);
          }}
        />

        <Button
          variant="contained"
          disabled={passvalid ? false : true}
          onClick={() => submitNow()}
        >
          <NavLink style={{ textDecoration: "none" }} to="/">
            Submit
          </NavLink>
        </Button>   
        {password !== "" && conpass !== "" ? (
          passvalid ? (
            <></>
          ) : (
            <p>Password Mismatch</p>
          )
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default SignUp;
