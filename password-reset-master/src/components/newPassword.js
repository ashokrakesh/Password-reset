import React, { useState } from "react";
import { Card, Input, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";
function NewPassword() {
  const { email } = useParams();
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passvalid, setPassvalid] = useState(false);

  const submitNow = () => {
    const data = {
      email: email,
      password: pass,
    };
    try {
      axios
        .put(`http://localhost:5000/new-password/:${email}`, data)
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
    setPass("");
    setConfirmPass("");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
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
        <h1>New Password setting!</h1>

        <TextField
          style={{ width: "300px" }}
          label="Password"
          variant="standard"
          value={pass}
          name="password"
          onChange={(e) => {
            setPass(e.target.value);
            if (confirmPass === e.target.value) setPassvalid(true);
            else setPassvalid(false);
          }}
        />
        <TextField
          style={{ width: "300px" }}
          label="Confirm Password"
          variant="standard"
          value={confirmPass}
          name="Confirm-password"
          onChange={(e) => {
            setConfirmPass(e.target.value);
            if (pass === e.target.value) setPassvalid(true);
            else setPassvalid(false);
          }}
        />
        {pass !== "" && confirmPass !== "" ? (
          passvalid ? (
            <></>
          ) : (
            <p style={{ color: "red" }}>Password Mismatch</p>
          )
        ) : (
          <></>
        )}
        <Button
          variant="contained"
          disabled={passvalid ? false : true}
          onClick={() => submitNow()}
        >
          <Link style={{ textDecoration: "none" }}>Submit</Link>
        </Button>
      </Card>
    </div>
  );
}

export default NewPassword;
