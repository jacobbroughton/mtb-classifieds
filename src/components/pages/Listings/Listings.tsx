import { useSelector } from "react-redux";
import "./Listings.css";

function Listings() {
  const auth = useSelector(state => state.auth)
  return (
    <div>
      <h1>Listings</h1>
      {auth.user && <p>Found a user!</p>}
    </div>
  );
}

export default Listings;
