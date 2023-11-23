import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../ui/LoadingOverlay/LoadingOverlay";

const Bike = () => {
  const { bikeID } = useParams();
  const [bike, setBike] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    async function getBike() {
      try {
        const response = await fetch(`http://localhost:3001/bike/${bikeID}`);

        if (!response.ok) {
          throw "There was a problem fetching this bike";
        }

        const data = await response.json();
        setBike(data.bike);
      } catch (error) {
        setError(error);
      }
    }

    getBike();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {bike && (
        <div>
          {bike.info.YEAR} {bike.info.MAKE} {bike.info.MODEL}
          {bike.photos.map((photo) => (
            <img src={`http://localhost:3001/${photo.PATH}`} />
          ))}
        </div>
      )}
      {!bike && <LoadingOverlay message="Fetching bike..." />}
    </div>
  );
};
export default Bike;
