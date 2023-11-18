import { useState } from "react";
import "./Login.css";
import LoadingOverlay from "../../ui/LoadingOverlay/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3001/login`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response || response.status !== 200) {
        throw "ERROR: " + response?.statusText || "Something happened";
      }

      const data = await response.json();

      if (!data) throw "There was a problem parsing login response";

      console.log('login ->', data)
      dispatch(setUser(data.user))
      navigate('/')
    } catch (e) {
      if (typeof e === "string") {
        setLoginError(e);
      } else if (e instanceof Error) {
        setLoginError(e.message);
      }
      setLoading(false);
    }
  }

  return (
    <div>
      {loginError && <div className="login-error">{loginError}</div>}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"></label>
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {loading && <LoadingOverlay message="Logging you in..." />}
    </div>
  );
};
export default Login;
