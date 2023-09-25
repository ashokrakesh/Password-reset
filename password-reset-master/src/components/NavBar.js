import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import dataContext from "../context/Create";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [icon, setIcon] = useState(false);
  const data1 = useContext(dataContext);
  const [data, setData] = useState({});
  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleClick1 = () => {
    setIcon(!icon);
  };

  useEffect(() => {
    fetch("http://localhost:5000/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <nav>
        <a
          href="/"
          style={{
            color: "#fff",
            marginBottom: "10px",
            textDecoration: "none",
          }}
        >
          {data1.loggedin ? (
            <NavLink
              to="/main"
              style={{ textDecoration: "none", color: "white" }}
            >
              <h1 onClick={() => handleClick1()}>DashBoard</h1>
            </NavLink>
          ) : (
            <></>
          )}
        </a>

        <Drawer anchor={"left"} open={icon}>
          <ul
            id="navbar"
            className={clicked ? "#navbar active" : "#navbar"}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "230px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <li>
              <NavLink style={{ color: "black" }} to="/main">
                <CloseIcon
                  style={{ background: "grey" }}
                  onClick={() => handleClick1()}
                />
              </NavLink>
            </li>
            <li>
              <NavLink style={{ color: "black" }} to="/item01">
                <h4 onClick={() => handleClick1()}>Nav Item 01</h4>
              </NavLink>
            </li>
            <li>
              <NavLink style={{ color: "black" }} to="/item02">
                <h4 onClick={() => handleClick1()}>Nav item 02</h4>
              </NavLink>
            </li>
            <li>
              <NavLink style={{ color: "black" }} to="/item03">
                <h4 onClick={() => handleClick1()}>Nav item 03</h4>
              </NavLink>
            </li>
          </ul>
        </Drawer>

        <div id="mobile">
          <i
            id="bar"
            onClick={() => handleClick()}
            className={clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
