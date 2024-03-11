import airplane from '../../assets/airplane.jpg';
import Flight_Search from '../Flight_Search/Flight_Search';
// import './footer.scss'
import './Flight_Main.scss'

function Flight_Main() {
    return (
        <div className="home flex container">

            <div className="mainText">
                <h1>Create Ever-lasting Memories With Us </h1>
            </div>

            <div className="homeImages flex">
                <div className="videoDiv">
                    <video src="video" autoPlay muted loop className="video"></video>
                </div>

                <img src={airplane} className="plane" alt="" />
            </div>

            <Flight_Search />
        </div>
    );
}

export default Flight_Main;