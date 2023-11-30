import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/auth";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  async function handleLogout(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/logout/`, {
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      });

      if (response.status !== 200) throw response.statusText;

      const data = await response.json();

      if (!data) throw "There was a problem parsing logout response";

      dispatch(setUser(null));
      navigate("/login");
    } catch (e) {
      if (typeof e === "string") {
        alert(e);
      } else if (e instanceof Error) {
        alert("ERROR: " + e.message);
      }
    }
  }

  return (
    <nav>
      <Link to="/">Local Bike Market</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {auth.user && <Link to="/sell">Sell</Link>}
        {!auth.user && <Link to="/login">Login</Link>}
        {!auth.user && <Link to="/register">Register</Link>}
        {auth.user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
