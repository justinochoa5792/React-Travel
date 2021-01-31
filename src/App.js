import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
var qs = require("qs");

function App() {
  var data = qs.stringify({
    client_id: "PILd968OtZporhszsYAdKXn7qq4HyvPd",
    client_secret: "2PylKVUccPn6prRs",
    grant_type: "client_credentials",
  });
  var config = {
    method: "post",
    url: "https://test.api.amadeus.com/v1/security/oauth2/token",
    headers: {},
    data: data,
  };

  Axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

  const [trip, setTrip] = useState([]);

  const renderTrip = async () => {
    const response = await Axios.get(
      "https://test.api.amadeus.com/v1/shopping/activities?longitude=-0.118092&latitude=51.509865&radius=1",
      {
        headers: {
          Authorization: "Bearer Gj8fVHBW5nL6HjfO7rv3GBnjfwwG",
        },
      }
    );
    console.log(response.data.data);
    setTrip(response.data.data);
  };

  useEffect(() => {
    renderTrip();
  }, []);

  const printTrip = () => {
    return trip.map((trips) => {
      return (
        <ul>
          <img src={trips.pictures[0]} alt={trips.name} />
          <li>{trips.name}</li>
          <li>{trips.price.amount} Eur</li>
          <li>{trips.shortDescription}</li>
        </ul>
      );
    });
  };

  return (
    <div className="App">
      <h1>Things to do in London,England</h1>
      {printTrip()}
    </div>
  );
}

export default App;
