import { useEffect, useState } from "react";
import LoadingOverlay from "../../ui/LoadingOverlay/LoadingOverlay";
import { Link } from "react-router-dom";
import "./Sell.css";

const Sell = () => {
  const [year, setYear] = useState(2023);
  const [make, setMake] = useState("Commencal");
  const [model, setModel] = useState("Meta TR");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("Used");
  const [category, setCategory] = useState("Enduro");
  const [frameSize, setFrameSize] = useState("L");
  const [wheelSize, setWheelSize] = useState('29"');
  const [frontTravel, setFrontTravel] = useState(160);
  const [rearTravel, setRearTravel] = useState(140);
  const [modifications, setModifications] = useState("");
  const [shipping, setShipping] = useState("Local Only");
  const [trades, setTrades] = useState("No Trades");
  const [location, setLocation] = useState("Matthews, NC");
  const [negotiableStatus, setNegotiableStatus] = useState("Open To Reasonable Offers");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("7047708371");
  const [sellerName, setSellerName] = useState("Jacob Broughton");
  const [photos, setPhotos] = useState([]);
  const [sellError, setSellError] = useState("");
  const [listedBikeID, setListedBikeID] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }

      formData.append(
        "bikeInfo",
        JSON.stringify({
          year,
          make,
          model,
          condition,
          frameSize,
          wheelSize,
          category,
          frontTravel,
          rearTravel,
          modifications,
          price,
          shipping,
          trades,
          location,
          negotiableStatus,
        })
      );

      const response = await fetch("http://localhost:3001/sell", {
        method: "post",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body: formData,
      });

      if (!response.ok) throw "there was an error";

      const data = await response.json();

      setListedBikeID(data.listedBikeID);
    } catch (e) {
      if (typeof e === "string") {
        setSellError(e);
      } else if (e instanceof Error) {
        setSellError(e.message);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(listedBikeID);
  }, [listedBikeID]);

  const currentYear = new Date().getFullYear();
  const yearOptions = [];

  for (let i = currentYear + 2; i > currentYear + 2 - 100; i--) {
    yearOptions.push(i);
  }

  const categoryOptions = [
    "XC / Cross Country",
    "Trail / All Mountain",
    "Enduro",
    "Downhill",
    "Dirt Jump",
    "Kids",
    "Vintage",
    "Electric",
  ];

  const frameSizeOptions = [
    "XS",
    "S",
    "M",
    "M/L",
    "L",
    "XL",
    "XXL",
    "S1 (Specialized Only)",
    "S2 (Specialized Only)",
    "S3 (Specialized Only)",
    "S4 (Specialized Only)",
    "S5 (Specialized Only)",
    "S6 (Specialized Only)",
  ];

  const wheelSizeOptions = [
    "Other / Unspecified",
    '16" or less',
    '20"',
    '24"',
    '26"',
    '27.5" / 650b',
    '29"',
    "650C",
    "700C",
  ];

  const conditionOptions = [
    "Brand New, Never Used",
    "Like New",
    "Used",
    "Used, Needs Work",
    "Inoperable",
  ];

  const shippingOptions = [
    "Local Only",
    "Will Ship Within Country",
    "Will Ship Internationally",
  ];

  const tradingOptions = [
    "No Trades",
    "Will Trade For Bike Stuff",
    "Will Trade For Anything",
  ];

  const negotiableStatusOptions = ["Open To Reasonable Offers", "Firm"];

  return (
    <div className="sell">
      {sellError && <div className="sell-error">{sellError}</div>}
      <h1>Sell</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-block">
          <h2>Your Info</h2>
          <fieldset>
            <div className="form-group">
              <label>Full Name</label>
              <input
                onChange={(e) => setSellerName(e.target.value)}
                value={sellerName}
                placeholder="Seller's Name"
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Phone Number</label>
              <input
                onChange={(e) => setContactPhoneNumber(e.target.value)}
                value={contactPhoneNumber}
                placeholder="Contact Phone Number"
                required
              />
            </div>
          </fieldset>
          <div className="form-group">
            <label>Location</label>
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              placeholder="Location"
            />
          </div>
        </div>

        <div className="form-block">
          <h2>Bike Details</h2>
          <fieldset className="form-groups year-make-model">
            <div className="form-group year">
              <label>Year</label>
              <select
                onChange={(e) => setYear(e.target.value)}
                value={new Date().getFullYear()}
              >
                {yearOptions.map((year) => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Make (Brand)</label>
              <input
                onChange={(e) => setMake(e.target.value)}
                value={make}
                placeholder="Make"
                required
              />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input
                onChange={(e) => setModel(e.target.value)}
                value={model}
                placeholder="Model"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group price">
              <label>Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Price"
                required
              />
            </div>

            <div className="form-group">
              <label>Condition</label>
              <select onChange={(e) => setCondition(e.target.value)} value={condition}>
                {conditionOptions.map((condition) => (
                  <option value={condition}>{condition}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select onChange={(e) => setCategory(e.target.value)} value={category}>
                {categoryOptions.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>Frame Size</label>
              <select onChange={(e) => setFrameSize(e.target.value)} value={frameSize}>
                <option selected>Select One</option>
                {frameSizeOptions.map((sizeOption) => (
                  <option value={sizeOption}>{sizeOption}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Wheel Size </label>
              <select onChange={(e) => setWheelSize(e.target.value)} value={wheelSize}>
                <option selected>Select One</option>
                {wheelSizeOptions.map((sizeOption) => (
                  <option value={sizeOption}>{sizeOption}</option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>Front Travel (mm)</label>
              <input
                onChange={(e) => setFrontTravel(e.target.value)}
                value={frontTravel}
                placeholder="Front Travel"
                required
                type="number"
                min="0"
                max="1000"
              />
            </div>
            <div className="form-group">
              <label>Rear Travel (mm)</label>
              <input
                onChange={(e) => setRearTravel(e.target.value)}
                value={rearTravel}
                placeholder="Rear Travel"
                required
                type="number"
                min="0"
                max="1000"
              />
            </div>
          </fieldset>
          <div className="form-group">
            <label>Modifications</label>
            <textarea
              onChange={(e) => setModifications(e.target.value)}
              value={modifications}
              placeholder="Modifications"
            />
          </div>
          <div className="form-group">
            <label>Shipping</label>
            <select onChange={(e) => setShipping(e.target.value)} value={shipping}>
              {shippingOptions.map((shippingOption) => (
                <option value={shippingOption}>{shippingOption}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Negotiable?</label>
            <select
              onChange={(e) => setNegotiableStatus(e.target.value)}
              value={negotiableStatus}
            >
              {negotiableStatusOptions.map((negotiableStatusOption) => (
                <option value={negotiableStatusOption}>{negotiableStatusOption}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Trades</label>
            <select onChange={(e) => setTrades(e.target.value)} value={trades}>
              {tradingOptions.map((tradingOption) => (
                <option value={tradingOption}>{tradingOption}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Photos</label>
            <input
              onChange={(e) => setPhotos([...photos, ...e.target.files])}
              type="file"
              multiple
              accept=".jpg"
              name="photos"
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      {listedBikeID && (
        <>
          <div className="success-modal">
            <h2>Success</h2>
            <Link to={`/${listedBikeID}`}>Go To Listing</Link>
            <Link to="/">View All Listings</Link>
          </div>
          <div className="success-modal-overlay"></div>
        </>
      )}
      {loading && <LoadingOverlay message="Listing your bike for sale..." />}
    </div>
  );
};
export default Sell;
