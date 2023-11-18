import { useState } from "react";
import "./Register.css";
import LoadingOverlay from "../../ui/LoadingOverlay/LoadingOverlay";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/auth";

const Register = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3001/register`, {
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

      if (!data) throw "There was a problem parsing register response";

      dispatch(setUser(data.user))
    } catch (e) {
      if (typeof e === "string") {
        setRegisterError(e);
      } else if (e instanceof Error) {
        setRegisterError(e.message);
      }
      setLoading(false);
    }
  }

  return (
    <div>
      {registerError && <div className="register-error">{registerError}</div>}
      <h1>Register</h1>
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
export default Register;
