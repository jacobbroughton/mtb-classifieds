import { Link } from "react-router-dom";
import "./Listings.css";
import { useEffect, useState } from "react";

function Listings() {
  const [listings, setListings] = useState([]);
  async function getListings() {
    try {
      const response = await fetch("http://localhost:3001/bike/all");
      const data = await response.json();

      if (!response.ok) {
        throw "There was an error getting all bikes";
      }
      console.log(data);
      setListings(data.bikes);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div>
      <h1>Listings</h1>
      <div>
        {listings.map((listing) => (
          <Link to={`/${listing.ID}`}>
            <div>
              <p>{listing.NAME}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Listings;
