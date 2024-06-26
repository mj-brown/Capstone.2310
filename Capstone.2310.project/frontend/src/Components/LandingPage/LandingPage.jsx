import Home from "../Home/Home";
import Main from "../Main/Main";
import { FiSend } from "react-icons/fi";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Logo from "../../assets/BookItLogo.png";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <Home />
      <Main />
      <section className="footer">
        <div className="secContent container">
          <div className="contactDiv flex">
            <div data-aos="fade-up" className="text">
              <small>KEEP IN TOUCH</small>
              <h2>Travel with us</h2>
            </div>

            <div className="inputDiv flex">
              <input
                data-aos="fade-up"
                type="text"
                placeholder="Enter Email Address"
                className="emailInput"
              />
              <button data-aos="fade-up" className="btn flex" type="submit">
                SEND <FiSend className="icon" />
              </button>
            </div>
          </div>

          <div className="footerCard flex">
            <div className="footerIntro flex">
              <div className="logoDiv">
                <a href="#" className="logo flex">
                  <img src={Logo} className="footer-icon" />
                </a>
              </div>

              <div data-aos="fade-up" className="footerParagraph">
                <p>
                  Inspiring journeys await with our travel application, your
                  trusted companion for seamless exploration. Start your next
                  adventure today and unlock a world of wonders at your
                  fingertips.
                </p>
              </div>

              <div data-aos="fade-up" className="footerSocials flex">
                <AiOutlineTwitter className="icon" />
                <AiFillYoutube className="icon" />
                <AiFillInstagram className="icon" />
                <FaTripadvisor className="icon" />
              </div>
            </div>

            <div className="footerLinks grid">
              {/* Group one*/}
              <div
                data-aos="fade-up"
                data-aos-duration="3000"
                className="linkGroup"
              >
                <span className="groupTitle">OUR AGENCY</span>

                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Services
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Insurance
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Agency
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Tourism
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Payment
                </li>
              </div>

              {/* Group two*/}
              <div
                data-aos="fade-up"
                data-aos-duration="4000"
                className="linkGroup"
              >
                <span className="groupTitle">PARTNERS</span>

                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Bookings
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Rentcars
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  HostelWorld
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Trivago
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  TripAdvisor
                </li>
              </div>

              {/* Group three*/}
              <div
                data-aos="fade-up"
                data-aos-duration="5000"
                className="linkGroup"
              >
                <span className="groupTitle">LAST MINUTE</span>

                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  London
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Caliofornia
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Indonesia
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Europe
                </li>
                <li className="footerList flex">
                  <FiChevronRight className="icon" />
                  Oceania
                </li>
              </div>
            </div>

            <div className="footerDiv">
              <small>BEST TRAVEL WEBSITE THEME COPYRIGHTS RESERVED</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
