import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      authorization: token,
    },
  });
  const aunthentication = async () => {
    const res = await axiosInstance.get("http://localhost:5000/user/auth");
    if (res.status === 200) {
      alert("User Logged In Successfully!");
    } else {
      navigate("/login");
    }
    console.log(res);
  };
  useEffect(() => {
    aunthentication();
  }, []);

  return (
    <div>
      <h1>This a main page after a login</h1>
    </div>
  );
}

export default Main;
