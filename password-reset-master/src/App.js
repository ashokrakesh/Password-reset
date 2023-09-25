import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasswordReset from "./components/Password-reset";
import SignUp from "./components/Sign-Up";
import Provide from "./context/Provide";
import Main from "./components/Main";
import NewPassword from "./components/newPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provide>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
            <Route path="/new-password/:email" element={<NewPassword />} />
          </Routes>
        </Provide>
      </BrowserRouter>
    </div>
  );
}

export default App;
