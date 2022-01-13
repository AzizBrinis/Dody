import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Login from "./Login";


const Register = (props) => {
    const handleImgClick = () => {
        console.log("googleclick")
        axios.get("/auth/google")
    }
    const [Verif, setVerif] = useState(false);
    return (
        <div>
        {!Verif && <div>
        <div style={{padding : "1% 10%"}}>
        <Link to="/" >
            <img className="Logo" src={__dirname + "./photos/navbar/logo.png"} alt="logo" />
        </Link>
        </div>
        <div className="loginBody">
            <img className="login" src={__dirname + "./photos/login/login.jpg"} alt="login" />
            <div className="infoSpace">
                <img className="avatar" src={__dirname + "./photos/login/avatar.jpg"} alt="avatar" />
                <h1>Create A New Account</h1>
                {props.signupFailed && <h2 style={{color : "red",margin : "2% 0"}}>Email Already Exists</h2>}
                <form action="/signup" method="POST">
                    <input className="clientInfo" type="text" name="firstName" placeholder="First Name" required/>
                    <input className="clientInfo" type="text" name="lastName" placeholder="Last Name" required/>
                    <input className="email" type="email" name="username" placeholder="Email" required/>
                    <input className="phone" type="number" name="phone" placeholder="Phone Number" required/>
                    <input className="password" type="password" name="password" placeholder="Password" required/>
                    <input className="hidden" type="hidden" name="hidden" value={props.pay} />
                    {/* <input className="password" type="password" name="confirmPass" placeholder="Confirm Password" required/> */}
                    {!props.pay 
                    ?
                    <Link to="/login" >
                        <button className="in">Sign in</button>
                    </Link>
                    :
                    <button className="in" onClick={() => setVerif(true)}>Sign in</button>}
                    <button className="up" type="submit">Register</button>
                </form>
                <h2>OR SIGNUP WITH</h2>
                <div className="loginMethods">
                    <form action="/auth/facebook" method="POST" className="formgoogle">
                        <button type="submit" className="googlebutton"><img className="facebook" src={__dirname + "./photos/login/facebook1.png"} alt="facebook" /></button>
                    </form>
                    <form action="/auth/google" method="POST" className="formgoogle">
                        <button type="submit" className="googlebutton"><img className="google" src={__dirname + "./photos/login/google.png"} alt="google" onClick={handleImgClick} /></button>
                    </form>
                </div>
            </div>
            </div>
            <Footer />
        </div>}
        {Verif && <Login pay={props.pay} />}
        </div>
    )
}

export default Register;