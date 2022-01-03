import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";


const Register = () => {
    const handleImgClick = () => {
        console.log("googleclick")
        axios.get("/auth/google")
    }
    
    return (
        <div>
        <div style={{padding : "1% 10%"}}>
        <Link to="/" >
            <img className="Logo" src="./photos/navbar/logo.png" alt="logo" />
        </Link>
        </div>
        <div className="loginBody">
            <img className="login" src="./photos/login/login.jpg" alt="login" />
            <div className="infoSpace">
                <img className="avatar" src="./photos/login/avatar.jpg" alt="avatar" />
                <h1>Create A New Account</h1>
                <form action="/signup" method="POST">
                    <input className="clientInfo" type="text" name="firstName" placeholder="First Name" required/>
                    <input className="clientInfo" type="text" name="lastName" placeholder="Last Name" required/>
                    <input className="email" type="email" name="username" placeholder="Email" required/>
                    <input className="phone" type="number" name="phone" placeholder="Phone Number" required/>
                    <input className="password" type="password" name="password" placeholder="Password" required/>
                    {/* <input className="password" type="password" name="confirmPass" placeholder="Confirm Password" required/> */}
                    <Link to="/login" >
                        <button className="in">Sign in</button>
                    </Link>
                    <button className="up" type="submit">Register</button>
                </form>
                <h2>OR SIGNUP WITH</h2>
                <div className="loginMethods">
                    <img className="facebook" src="./photos/login/facebook1.png" alt="facebook" />
                    <img className="google" src="./photos/login/google.png" alt="google" onClick={handleImgClick} />
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register;