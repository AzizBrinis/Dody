import Footer from "../Footer/Footer"
import Navbar from "../NavBar/Navbar"
import "./Reservation.css"

const Reservation = (props) => {
    return (
        <div className="ChangeBackColor">
            <Navbar auth={props.auth}/>
            <div className="page404div">
                <img className="resphoto" src="./photos/404/reservation.png" alt="reservation" />
            </div>
            <Footer />
        </div>
    )
}
export default Reservation;