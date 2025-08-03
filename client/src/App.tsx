import { Route, Routes } from "react-router";
import Home from "./routers/Home";

import Login from "./routers/Login";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Add from "./components/Add";

const App = () => {
  const initial = localStorage.getItem("token");

  const [token, setToken] = useState<string>("");
  useEffect(() => {
    if (!token && initial) {
      setToken(initial);
    }
  }, [token]);

  return (
    <div className={`${token ? "w-11/12 m-auto " : ""}`}>
      <div>
        <ToastContainer />
        {token && <NavBar setToken={setToken} />}
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} token={token} />}
          />
          <Route path="/" element={<Home token={token} />} />
          <Route path="/add" element={<Add token={token} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
