/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./Departure_Table.css";

const Departure_Table = ({
  onBookClick,
  flightData,
  onFlightSelect,
  setSelectedFlightDeparture,
}) => {
  const [input, setInput] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchData = (value) => {
    fetch(`city-and-airport-search/${input}`)
      .then((response) => response.json())
      .then((json) => {
        const result = json;
        console.log(result);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleRowClick = (index, flight) => {
    setSelectedRow(selectedRow === index ? null : index);
    setSelectedFlightDeparture(flight);

    onBookClick();
  };

  const flightsOffer =
    flightData && flightData.data
      ? flightData.data.reduce((obj, flight) => {
          if (flight.itineraries) {
            return { ...flight.itineraries };
          }
        }, {})
      : {};

  return (
    <div className="table-container">
      <h2 className="table-header">Departing Flights</h2>
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th className="table-heading">Airline</th>
              <th className="table-heading">Departure</th>
              <th className="table-heading">Arrival</th>
              <th className="table-heading">Duration</th>
              <th className="table-heading">Price</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {flightData &&
              flightData.data &&
              flightData.data.length > 0 &&
              flightData.data.map((flight, index) => (
                <tr
                  key={index}
                  className={
                    selectedRow === index ? "table-row selected" : "table-row"
                  }
                  onClick={() => handleRowClick(index, flight)}
                >
                  <td className="table-info">
                    {flight.itineraries[0].segments[0].carrierCode}
                  </td>
                  <td className="table-info">
                    {flight.itineraries[0].segments[0].departure.at}
                    <br />
                    {flight.itineraries[0].segments[0].departure.iataCode}
                  </td>
                  <td className="table-info">
                    {flight.itineraries[0].segments[0].arrival.at}
                    <br />
                    {flight.itineraries[0].segments[0].arrival.iataCode}
                  </td>
                  <td className="table-info">
                    {flight.itineraries[0].duration}
                  </td>
                  <td className="table-info">{flight.price.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departure_Table;
