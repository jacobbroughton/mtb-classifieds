import { Route, Routes, useNavigate } from "react-router-dom";
import Listings from "./components/pages/Listings/Listings";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Navbar from "./components/ui/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/auth";
import Sell from "./components/pages/Sell/Sell";
import Bike from "./components/pages/Bike/Bike";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  async function getUser() {
    // setLoading(true)
    const response = await fetch(`http://localhost:3001/`, {
      method: "GET",
      credentials: "include",
      headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
    });

    const data = await response.json();

    if (!data.user) {
      navigate("/login");
      return;
    }

    dispatch(setUser(data.user))
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route element={<Listings />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<Sell />} path="/sell" />
          <Route element={<Bike />} path="/:bikeID" />
        </Routes>
      </main>
    </>
  );
}

export default App;
