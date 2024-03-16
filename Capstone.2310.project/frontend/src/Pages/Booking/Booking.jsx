import "./Booking.css";

const Booking = () => {
  return (
    <div className="booking-container">
      <div className="review-container">
        <div className="title-container">
          <h1 className="review-heading">Review your trip</h1>
        </div>
        <div className="flight-card">
          <div className="column-heading">
            <h3 className="column-title">Flights</h3>
          </div>
          <div className="trip-card">
            <div className="flight-container">
              <h4 className="flight-summary">Seattle to New York City</h4>
              <p>11:59pm-8:06am (5h 7m)</p>
              <p>Wed, Apr 10</p>
              <p>2 Adults, 1 Child</p>
              <p className="flight-name">11:59pm Seattle</p>
              <p>Seattle-Tacoma International Airport</p>
              <p>5h 7m flight</p>
              <p>Jet Blue</p>
              <p>Airbus A320-200</p>
              <p>Economy</p>
              <p>8:06am New York City</p>
              <p>John F. Kennedy International Airport</p>
            </div>
            <div className="flight-container">
              <h4 className="flight-summary">
                New York City to Denver to Seattle
              </h4>
              <p>6:00am-9:19pm (15h 19m)</p>
              <p>Wed, Apr 18</p>
              <p>2 Adults, 1 Child</p>
              <p className="flight-name">6:00am New York City</p>
              <p>LaGuardia Airport</p>
              <p>7h 6m flight</p>
              <p>Frontier</p>
              <p>Airbus A321-200 Neo</p>
              <p>Economy</p>
              <p>11:06am Denver</p>
              <p>Denver International Airport</p>
              <p>7:10pm Denver</p>
              <p className="flight-name">Denver International Airport</p>
              <p>3h 9m flight</p>
              <p>Frontier</p>
              <p>Airbus A320-200 Neo</p>
              <p>Economy</p>
              <p>9:19pm Seattle</p>
              <p>Seattle-Tacoma International Airport</p>
            </div>
          </div>
          <div className="button-container">
            <button className="booking-button">Change Flight</button>
          </div>
        </div>
        <div className="hotel-card">
            <div className="column-heading">
              <h3 className="column-title">Stay</h3>
            </div>
            <div className="hotel-container">
              <p className="hotel-name">Aloft New York Brooklyn</p>
              <p>Brooklyn, NY</p>
              <p>Check In: April 11, 2024</p>
              <p>Check Out: April 18, 2024</p>
            </div>
            <div className="button-container">
              <button className="booking-button">Change Stay</button>
            </div>
        </div>
      </div>
      <div className="cost-container">
        <div className="cost-title-container">
          <h3 className="cost-heading">Cost Details</h3>
        </div>
        <div className="cost-detail-container">
          <table className="cost-table">
            <tbody className="cost-table-body">
              <tr className="cost-table-row">
                <td className="item-data">Flights</td>
                <td className="cost-data">$1,200</td>
              </tr>
              <tr className="cost-table-row">
                <td className="item-data">Stay</td>
                <td className="cost-data">$2,100</td>
              </tr>
              <tr className="cost-table-row">
                <td className="item-data">Savings</td>
                <td className="savings-data">-$320</td>
              </tr>
              <tr className="cost-table-row">
                <td className="total-name">Total</td>
                <td className="total-data">$2,880</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button-container">
          <button className="booking-button">Booking Details</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
