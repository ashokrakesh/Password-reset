import dataContext from "./Create.js";
import React, { useState, useEffect } from "react";

function Provide(props) {

  const [loggedin, setLoggedin] = useState(false);


  return (
    <dataContext.Provider
      value={{
       loggedin,
       setLoggedin
      }}
    >
      {props.children}
    </dataContext.Provider>
  );
}

export default Provide;
