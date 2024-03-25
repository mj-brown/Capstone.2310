import { useState } from 'react'
import './App.css'

import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Components/LandingPage/LandingPage'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Booking from './Pages/Booking/Booking'
import BookingDetails from './Pages/BookingDetails/BookingDetails'
import Confirmation from './Pages/Confirmation/Confirmation'

import Profile from './Pages/Profile/Profile'
//import Flight_Main from './Components/Flight/Flight_Main'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Flights from './Components/Flight_Search/Flights'
import Hotels from './Components/Hotel/hotels'
import Airport from './Components/Flight/airport'


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
        <Navbar />
      <BrowserRouter>
        {/* <Flight_Main /> */}
        {/* <Home />
        <Main /> */}
        {/* <Flight_Main /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/main" element={<Main />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingdetails" element={<BookingDetails />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/hotel" element={<Hotels /> } />
          <Route path='/airport' element={<Airport />} />
          <Route path='/flights' element={<Flights />} />
        </Routes>

        {/* <Footer /> */}
      </BrowserRouter>

    </>
  )
}

export default App