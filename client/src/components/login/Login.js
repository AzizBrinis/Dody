import "./Login.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";


const Login = () => {
    
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
                <h1>Sign in to your account</h1>
                <form action="/login" method="POST">
                    <input className="email inputLog" type="email" name="username" placeholder="Email" required/>
                    <input className="password inputLog" type="password" name="password" placeholder="Password" required/>
                    <button className="ins button-signin" type="submit">Sign in</button>
                    <Link to="/signup" >
                        <button className="ups button-signin">Register</button>
                    </Link>
                    
                    
                </form>
                <h2>OR LOGIN WITH</h2>
                <div className="loginMethods">
                    <img className="facebook" src="./photos/login/facebook1.png" alt="facebook" />
                    <img className="google" src="./photos/login/google.png" alt="google" />
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;