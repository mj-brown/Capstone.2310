import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./BookingDetails.css";

const BookingDetails = () => {
  const location = useLocation();
  const {
    totalAfterSavings,
    numberofTravelers,
  } = location.state;

  const amount = totalAfterSavings.toFixed(2);
  // State variables to hold form data
  const [formData, setFormData] = useState({
    primaryTraveler: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
    },
    additionalTravelers: [],
    agreeToTerms: false,
  });
  const [formValid, setFormValid] = useState(false);
  const [numberOfEnteredTravelers, setNumberOfEnteredTravelers] = useState(1);

  // Handler for form input changes
  const handleInputChange = (e, travelerIndex = null) => {
    const { name, value } = e.target;
    if (travelerIndex !== null) {
      // Additional traveler
      setFormData((prevState) => ({
        ...prevState,
        additionalTravelers: prevState.additionalTravelers.map((traveler, index) =>
          index === travelerIndex ? { ...traveler, [name]: value } : traveler
        ),
      }));
    } else {
      // Primary Traveler
      setFormData((prevState) => ({
        ...prevState,
        primaryTraveler: {
          ...prevState.primaryTraveler,
          [name]: value,
        },
      }));
    }
  };
  
  // Handler for checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(formData);

    if (checkFormValidity()) {
      try {
        const url = await fetchClientSecret();
        console.log(`Redirecting user to: ${url}`);
        window.location.assign(url);
      } catch (error) {
        console.log("Error while fetching client secret", error);
      }
    } else {
      console.log("Form data is not valid");
    }
  };

  // Handler for adding additional traveler
  const handleAddTraveler = () => {
    // Increment the number of entered travelers
    setNumberOfEnteredTravelers(prevCount => prevCount + 1);
    setFormData((prevState) => ({
      ...prevState,
      additionalTravelers: [
        ...prevState.additionalTravelers,
        {
          firstName: "",
          middleName: "",
          lastName: "",
          gender: "",
          birthMonth: "",
          birthDay: "",
          birthYear: "",
        },
      ],
    }));
  };

  // Function to check form validity
  const checkFormValidity = () => {
    const inputs = [
      formData.primaryTraveler.firstName,
      formData.primaryTraveler.middleName,
      formData.primaryTraveler.lastName,
      formData.primaryTraveler.gender,
      formData.primaryTraveler.birthMonth,
      formData.primaryTraveler.birthDay,
      formData.primaryTraveler.birthYear,
      formData.agreeToTerms,
    ];

    return inputs.every((input) => {
      // Check if input is a string before calling trim()
      if (typeof input === 'string') {
        return input.trim() !== '';
      } else {
        return input !== '';
      }
    });
  };

  // Fetch client secret function
  const fetchClientSecret = useCallback(async () => {
    try {
      // Create a Checkout Session
      const res = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount: amount * 100})
      });

      if (!res.ok) {
        throw new Error("Failed to fetch client secret");
      }

      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching client secret:", error);
      throw error;
    }
  }, []);

  // Update form validity state whenever form data changes
  useEffect(() => {
    setFormValid(checkFormValidity());
  }, [formData]);

  return (
    <div className="bookingDetails-main">
      <div className="bookingDetails-container">
        <div className="bookingDetails-title-container">
          <h1 className="details-heading">Booking Details</h1>
        </div>
        <div className="custom-details-container">
          <div className="booking-summary">
            <h2 className="summary-heading">Trip Summary</h2>
            <div className="card-container">
              <div className="flight-summary-card">
                <h3 className="card-heading">Flights</h3>
                <p>Seattle to New York City</p>
                <p>Departure Date: April 10, 2024</p>
                <p>New York City to Seattle</p>
                <p>Return Date Date: April 18, 2024</p>
              </div>
              <div className="hotel-summary-card">
                <h3 className="card-heading">Stay</h3>
                <p>Aloft New York Brooklyn</p>
                <p>Check In Date: April 11, 2024</p>
                <p>Check Out Date: April 18, 2024</p>
              </div>
            </div>
            <div className="cost-summary">
              <h3 className="card-heading">Cost</h3>
              <div className="cost-card">
                <p className="cost-info">Total</p>
                <p className="cost-info">$2,880</p>
              </div>
            </div>
          </div>
          <div className="form-container">
            <h2 className="summary-heading">Traveler Information</h2>
            <form onSubmit={handleSubmit} autoComplete="false">
              <div className="name-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  className="booking-name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.primaryTraveler.firstName}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                <label htmlFor="middleName">Middle Name</label>
                <input
                  className="booking-name"
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.primaryTraveler.middleName}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="booking-name"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.primaryTraveler.lastName}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <label className="gender-heading">Gender</label>
              <div className="gender-container">
                <input
                  className="gender"
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.primaryTraveler.gender === "male"}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="male">Male</label>
                <input
                  className="gender"
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.primaryTraveler.gender === "female"}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="female">Female</label>
              </div>
              <label className="dob-heading">Date of Birth</label>
              <div className="dob-container">
                <select
                  className="dob"
                  name="birthMonth"
                  value={formData.primaryTraveler.birthMonth}
                  onChange={(e) => handleInputChange(e)}
                  required
                >
                  <option value="/">Month</option>
                  {Array.from({ length: 12 }, (_, index) => {
                    const month = index + 1;
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="dob"
                  name="birthDay"
                  value={formData.primaryTraveler.birthDay}
                  onChange={(e) => handleInputChange(e)}
                  required
                >
                  <option value="/">Day</option>
                  {Array.from({ length: 31 }, (_, index) => {
                    const day = index + 1;
                    return (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="dob"
                  name="birthYear"
                  value={formData.primaryTraveler.birthYear}
                  onChange={(e) => handleInputChange(e)}
                  required
                >
                  <option value="/">Year</option>
                  {Array.from({ length: 100 }, (_, index) => {
                    const year = 1924 + index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Additional traveler form */}
              {formData.additionalTravelers.map((additionalTraveler, index) => (
                <div key={index} className="additional-traveler-form">
                  <legend>
                    <h3 className="form-heading">
                      Additional Traveler {index + 1}
                    </h3>
                  </legend>
                  <div className="name-container">
                    <label htmlFor={`additionalFirstName-${index}`}>
                      First Name
                    </label>
                    <input
                      className="booking-name"
                      type="text"
                      id={`additionalFirstName-${index}`}
                      name={`additionalFirstName-${index}`}
                      value={formData.additionalTravelers.firstName}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                    <label htmlFor={`additionalMiddleName-${index}`}>
                      Middle Name
                    </label>
                    <input
                      className="booking-name"
                      type="text"
                      id={`additionalMiddleName-${index}`}
                      name={`additionalMiddleName-${index}`}
                      value={formData.additionalTravelers.middleName}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor={`additionalLastName-${index}`}>
                      Last Name
                    </label>
                    <input
                      className="booking-name"
                      type="text"
                      id={`additionalLastName-${index}`}
                      name={`additionalLastName-${index}`}
                      value={formData.additionalTravelers.lastName}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  {/* Gender radio buttons */}
                  <label className="gender-heading">Gender</label>
                  <div className="gender-container">
                    <input
                      className="gender"
                      type="radio"
                      id={`additionalMale-${index}`}
                      name={`additionalGender-${index}`}
                      value="male"
                      checked={formData.additionalTravelers.gender === "male"}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor={`additionalFemale-${index}`}>Male</label>
                    <input
                      className="gender"
                      type="radio"
                      id={`additionalfemale-${index}`}
                      name={`additionalGender-${index}`}
                      value="female"
                      checked={formData.additionalTravelers.gender === "female"}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  {/* Date of birth selects */}
                  <div className="dob-container">
                    <select
                      className="dob"
                      name="birthMonth"
                      value={formData.additionalTravelers.birthMonth}
                      onChange={(e) => handleInputChange(e)}
                      required
                    >
                      <option value="/">Month</option>
                      {Array.from({ length: 12 }, (_, index) => {
                        const month = index + 1;
                        return (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="dob"
                      name="birthDay"
                      value={formData.additionalTravelers.birthDay}
                      onChange={(e) => handleInputChange(e)}
                      required
                    >
                      <option value="/">Day</option>
                      {Array.from({ length: 31 }, (_, index) => {
                        const day = index + 1;
                        return (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        );
                      })}
                    </select>

                    <select
                      className="dob"
                      name="birthYear"
                      value={formData.additionalTravelers.birthYear}
                      onChange={(e) => handleInputChange(e)}
                      required
                    >
                      <option value="/">Year</option>
                      {Array.from({ length: 100 }, (_, index) => {
                        const year = 1924 + index;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              ))}
              <div className="button-container">
                <button className="booking-button" onClick={handleAddTraveler}>
                  Add Traveler
                </button>
              </div>
              <legend>
                <h3 className="form-heading">Terms and Conditions Agreement</h3>
              </legend>
              <div className="tc-container">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange}
                  required
                />
                <label htmlFor="agreeToTerms">
                  I agree to the terms and conditions of booking.
                </label>
              </div>
              <legend>
                <h3 className="form-heading">Cancellation Policy</h3>
              </legend>
              <div className="policy-container">
                <p>The cancellation policy for this booking is as follows:</p>
                <ol>
                  <li>
                    <strong>Free Cancellation:</strong> We offer free
                    cancellation within a specified timeframe. Check your
                    booking confirmation for details.
                  </li>
                  <li>
                    <strong>Non-Refundable Bookings:</strong> Some bookings are
                    non-refundable and will be charged in full upon reservation.
                  </li>
                  <li>
                    <strong>Refundable Bookings:</strong> Cancellations within a
                    specified period are eligible for a refund, subject to
                    cancellation fees.
                  </li>
                  <li>
                    <strong>Cancellation Fees:</strong> Fees may apply based on
                    timing and booking type. Refer to your confirmation for
                    details.
                  </li>
                  <li>
                    <strong>Last-Minute Cancellations:</strong> Cancellations
                    within 24-48 hours may incur additional fees.
                  </li>
                  <li>
                    <strong>Modifications:</strong> Changes to bookings may be
                    subject to availability and charges.
                  </li>
                  <li>
                    <strong>Force Majeure:</strong> We accommodate cancellations
                    due to unforeseen events, subject to partner policies.
                  </li>
                  <li>
                    <strong>Refund Processing:</strong> Refunds are processed
                    within 7-14 business days.
                  </li>
                  <li>
                    <strong>Contact Us:</strong> For assistance, reach out to
                    our customer support team.
                  </li>
                </ol>
                <p>Refer to your booking terms for specific details.</p>
              </div>
              <div className="button-container">
                <button
                  onClick={handleSubmit}
                  className="booking-button"
                  type="click"
                  disabled={numberOfEnteredTravelers !== numberofTravelers}
                >
                  Book It
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
