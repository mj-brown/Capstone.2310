import HotelOfferCard from "./HotelOfferCard";
import './HotelOffer.css';
import { useState,useEffect} from 'react'


const HotelOffer = ({ onClose, departDate, returnsDate, adult, destinationCode, selectedHotelId, selectedHotelName, selectedFlightDeparture, selectedFlightReturn, originCode, cityDesName, cityOriginName}) => {
    const [hotelId, setHotelId] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [adults, setAdults] = useState('');
    const [cityCode, setCityCode] = useState('');
    const [hotelOffers, setHotelOffers] = useState([]);
    const [ flightDeparture, setFlightDeparture] = useState([]);
    const [ flightReturn, setFlightReturn] = useState([]);
    const [originalCode, setOriginalCode] = useState('')


    //TODO: Need logic to render as many room offers as there are for the hotel for the given date.
     useEffect(() => {
           const params = {
               cityCode: destinationCode,
               checkInDate: departDate,
               checkOutDate: returnsDate,
               hotelIds: selectedHotelId,
            adults: adult,
           }
           console.log("respnosne Params", params)
         const hotelData = async () => {
           try {
            const responseHotelOffer = await fetch(`http://localhost:3000/api/hotels`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        });
        if (!responseHotelOffer.ok) {
          throw new Error('Unsuccessful');
        }
        const resHotel = await responseHotelOffer.json();
        setHotelOffers(resHotel);

        console.log("Hotels Offer:", resHotel)
      } catch (error){
        console.error("error ", error);
      }
      setFlightDeparture(selectedFlightDeparture);
      setFlightReturn(selectedFlightReturn);
      setOriginalCode(originCode);
    }
    hotelData();
     },[]);
    console.log("original code", originCode);
    console.log("departure in hotelOffer ", selectedFlightDeparture);
    console.log("return in hotelOffer ", selectedFlightReturn);
    console.log("departure flightstate in hotelOffer ", flightDeparture);
    console.log("return flightstate in hotelOffer ", flightReturn);
    console.log("originNameCity", cityOriginName);
    console.log("desNameCity", cityDesName);


    return (
        <div className="hotel-offer-container">
            <div className="offer-popup"> 
                <div className="popup-header">
                    <span className="close" onClick={onClose}>X</span>
                    <h3 className="popup-heading">Select Your Room</h3>
                </div>
                <div className="stay-summary">
                    <p className="offer-dates">Check In: {departDate} </p>
                    <p className="offer-dates">Check Out: {returnsDate} </p>
                
                </div>
                <div className="room-card-container">
              
                        <HotelOfferCard 
                        flightDeparture={flightDeparture}
                        flightReturn={flightReturn}
                        hotelOffers={hotelOffers} 
                        originalCode={originalCode}
                        cityDesName={cityDesName}
                        cityOriginName={cityOriginName}
                    
                        />
                  
                </div>
            </div>
        </div>
    );
};

export default HotelOffer;