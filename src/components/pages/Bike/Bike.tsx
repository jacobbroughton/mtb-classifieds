import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../ui/LoadingOverlay/LoadingOverlay";
import "./Bike.css";

const Bike = () => {
  const { bikeID } = useParams();
  const [bike, setBike] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(true);

  useEffect(() => {
    async function getBike() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/bike/${bikeID}`);

        if (!response.ok) {
          throw "There was a problem fetching this bike";
        }

        const data = await response.json();
        setSelectedPhoto(data.bike.photos[0]);
        setBike(data.bike);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }

    getBike();
  }, []);

  // "bike": {
  //     "info": {
  //         "YEAR": 2023,
  //         "MAKE": "Commencal",
  //         "MODEL": "Meta TR",
  //         "PRICE": 0,
  //         "ORIG_PRICE": 0,
  //         "CATEGORY": "Enduro",
  //         "CONDITION": "Used",
  //         "FRAME_SIZE": "L",
  //         "WHEEL_SIZE": "29\"",
  //         "FRONT_TRAVEL_MM": 160,
  //         "REAR_TRAVEL_MM": 140,
  //         "MODIFICATIONS": "",
  //         "SHIPPING": "Local Only",
  //         "TRADES": "No Trades",
  //         "STATUS": "Available",
  //         "LOCATION": "Matthews, NC",
  //         "CREATED_BY_ID": 34,
  //         "CREATED_DTTM": "2023-11-23T19:59:05.000Z",
  //         "MODIFIED_BY_ID": null,
  //         "MODIFIED_DTTM": null,
  //         "NEGOTIABLE_STATUS": "Open To Reasonable Offers"

  if (!bike && loading) return <LoadingOverlay message="Fetching bike..." />;
  if (!bike) return <p>Bike not found</p>;
  if (error) return <p>There was an error - {error}</p>;
  return (
    <div className="bike">
      <h1>
        {bike.info.YEAR} {bike.info.MAKE} {bike.info.MODEL}
      </h1>
      <div className="bike-images">
        <div className="main-image-parent">
          {selectedPhoto ? <img
            className="bike-main-image"
            src={`http://localhost:3001/${selectedPhoto?.PATH}`}
          /> : <div className="main-image-placeholder"></div>}
        </div>
        <div className="bike-thumbnails">
          {bike.photos.map((photo) => (
            <img
              className={`bike-thumbnail-image ${
                photo.ID === selectedPhoto?.ID ? "selected" : ""
              }`}
              onClick={() => setSelectedPhoto(photo)}
              src={`http://localhost:3001/${photo.PATH}`}
            />
          ))}
        </div>
      </div>
      <div className="quick-facts">
        <dl>
          <dt>Category</dt>
          <dd>{bike.info.CATEGORY || "-"}</dd>
          <dt>Condition</dt>
          <dd>{bike.info.CONDITION || "-"}</dd>
          <dt>Category</dt>
          <dd>{bike.info.CATEGORY || "-"}</dd>
          <dt>Condition</dt>
          <dd>{bike.info.CONDITION || "-"}</dd>
          <dt>Frame Size</dt>
          <dd>{bike.info.FRAME_SIZE || "-"}</dd>
          <dt>Wheel Size</dt>
          <dd>{bike.info.WHEEL_SIZE || "-"}</dd>
        </dl>
        <dl>
          <dt>Material</dt>
          <dd>{bike.info.MATERIAL || "-"}</dd>
          <dt>Front Travel</dt>
          <dd>{`${bike.info.FRONT_TRAVEL_MM}mm` || "-"}</dd>
          <dt>Rear Travel</dt>
          <dd>{`${bike.info.REAR_TRAVEL_MM}mm` || "-"}</dd>
          <dt>Originally Posted Date</dt>
          <dd>{`${new Date(bike.info.CREATED_DTTM).toLocaleString()}` || "-"}</dd>
        </dl>
      </div>
    </div>
  );
};
export default Bike;
