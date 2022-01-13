import Footer from "../Footer/Footer"
import Navbar from "../NavBar/Navbar"
import "./PageNotFound.css";

const PageNotFound = (props) => {
    return (
        <div>
            <Navbar auth={props.auth}/>
                <div className="page404div">
                    <img className="page404" src={__dirname+"./photos/404/404.jpg"} alt="404" />
                </div>
            <Footer />
        </div>
    )
}

export default PageNotFound;