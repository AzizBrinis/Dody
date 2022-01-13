import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
    return (
    <div className="navbar" style={props.removeMargin ? props.noSticky ? {position : "relative", marginBottom: "0"} : {marginBottom: "0"} : null}>
        <Link to="/" >
            <img className="Logo" src={__dirname + "./photos/navbar/logo.png"} alt="logo" />
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
            <img className="humberger-img" src={__dirname + "./photos/navbar/humberger.jpg"} alt="humberger" />
            <div class="dropdown-content">
                <ul>
                    <Link to="/reservation" style={{ textDecoration: 'none',color: "black"}} >
                        <li>My Reservations</li>
                    </Link>
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