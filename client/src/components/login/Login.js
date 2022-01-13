import "./Login.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Register from "./Register";
import axios from "axios";


const Login = (props) => {
    const [Verif, setVerif] = useState(false);

    const googleauth = () => {
        axios.get("/auth/google")
             .catch((err) => console.log(err))
    }
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
                <h1>Sign in to your account</h1>
                {props.loginFailed && <h2 style={{color : "red",margin : "2% 0"}}>Email or Password is incorrect</h2>}
                <form action="/login" method="POST">
                    <input className="email inputLog" type="email" name="username" placeholder="Email" required/>
                    <input className="password inputLog" type="password" name="password" placeholder="Password" required/>
                    <input className="hidden" type="hidden" name="hidden" value={props.pay} />
                    <button className="ins button-signin" type="submit">Sign in</button>
                    {!props.pay 
                    ?
                    <Link to="/signup" >
                        <button className="ups button-signin">Register</button>
                    </Link>
                    :
                    <button className="ups button-signin" onClick={() => setVerif(true)}>Register</button>}

                    
                    
                </form>
                <h2>OR LOGIN WITH</h2>
                <div className="loginMethods">
                    <form action="/auth/facebook" method="POST" className="formgoogle">
                    <button type="submit" className="googlebutton"><img className="facebook" src={__dirname + "./photos/login/facebook1.png"} alt="facebook" /></button>
                    </form>
                    <form action="/auth/google" method="POST" className="formgoogle">
                        <button type="submit" className="googlebutton"><img className="google" src={__dirname + "./photos/login/google.png"} onClick={googleauth} alt="google" /></button>
                    </form>
                </div>
            </div>
            </div>
            <Footer />
        </div>}
            {Verif && <Register pay={props.pay} />}
        </div>
    )
}

export default Login;