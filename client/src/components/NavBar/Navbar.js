import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
    return (
    <div className="navbar">
        <Link to="/" >
            <img className="Logo" src="./photos/navbar/logo.png" alt="logo" />
        </Link>
        {!props.auth ? <div className="NavButtons">
            <Link to="/signup" >
                <button className="upNav button">Register</button>
            </Link>
            <Link to="/login" >
                <button className="inNav button">Sign In</button>
            </Link>
        </div> : 
            <div class="dropdown">
            <img className="humberger-img" src="./photos/navbar/humberger.jpg" alt="humberger" />
            <div class="dropdown-content">
                <ul>
                    <li>My Reservations</li>
                    <li className="noPadding">
                    <form className="outForm" action="/logout" method="POST">
                <button className="out"type="submit">Logout</button>
            </form></li>
                </ul>
            </div>
            </div>
        }
    </div>
)}

export default Navbar;