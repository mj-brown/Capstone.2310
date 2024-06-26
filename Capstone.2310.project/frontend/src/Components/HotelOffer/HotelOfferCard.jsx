/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HotelOfferCard.css";

const HotelOfferCard = ({
  hotelOffers,
  flightDeparture,
  flightReturn,
  originCode,
  cityDesName,
  cityOriginName,
  adult,
  departDate,
  returnsDate,
}) => {
  const [bookingVisible, setBookingVisible] = useState(false);

  const navigate = useNavigate();
  const handleBookButtonClick = () => {
    navigate("/booking", {
      state: {
        flightDeparture,
        flightReturn,
        hotelOffers,
        originCode,
        cityDesName,
        cityOriginName,
        adult,
        departDate,
        returnsDate,
      },
    });
  };

  useEffect(() => {
    setBookingVisible(true);
  }, [
    flightDeparture,
    flightReturn,
    hotelOffers,
    originCode,
    cityDesName,
    cityOriginName,
  ]);

  if (!hotelOffers || !hotelOffers.data || !Array.isArray(hotelOffers.data)) {
    return null;
  }
  return (
    <div className="offer-card">
      {hotelOffers.data.map((offerData, index) => (
        <div key={index}>
          <div className="price-section">
            <div className="offer-name">
              <h3 className="offer-heading">{offerData.hotel.name} </h3>
            </div>
            <div className="offer-price">
              <h3 className="offer-heading">
                ${offerData.offers[0].price.total}{" "}
              </h3>
              <p className="small-text">
                per night/ {offerData.offers[0].price.variations.average.base}{" "}
              </p>
            </div>
          </div>
          <div className="room-section">
            <div className="room-type">
              <h3 className="offer-heading">Standard</h3>
              <h5 className="offer-heading">Bed</h5>
              <p className="offer-text">
                {offerData.offers[0].room.typeEstimated.bedType}{" "}
                {offerData.offers[0].room.typeEstimated.beds}
              </p>
            </div>
            <div className="room-description">
              <h5 className="offer-heading">Description</h5>
              <p className="offer-text">
                {offerData.offers[0].room.description.text}.
              </p>
            </div>
            <div className="room-policy">
              <h3 className="offer-heading">Cancellations</h3>
              <p className="offer-text">
                Cancel before:{" "}
                {offerData.offers[0].policies.cancellations[0].deadline}
              </p>
              <h5 className="offer-heading">Cancellation Fee</h5>
              <p className="offer-text">
                {" "}
                {offerData.offers[0].policies.cancellations[0].amount}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="card-button">
        <button className="booking-button" onClick={handleBookButtonClick}>
          Book It!
        </button>
      </div>
    </div>
  );
};

export default HotelOfferCard;
