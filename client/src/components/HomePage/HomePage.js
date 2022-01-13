import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Navbar from "../NavBar/Navbar";
import Calender from "../Calender/Calender";
import Footer from "../Footer/Footer";



const HomePage = (props) => {
    const [showCalender,setShowCalender] = useState(false);
    const [date1,setDate1] = useState("");
    const [date2,setDate2] = useState("");
    const [destination,setDestination] = useState("all")
    const sendHomeDates = (data1,data2) => {
        if(data1) {
        setDate1(data1)
        }else {
            setDate1("")
        }
        if (data2) {
            setDate2(data2)
        }else{
            setDate2("")
        
    }
    }
    const handleDestination = (e) => {
        setDestination(e.target.value);
        
        
    }
    if(destination == "") {
        setDestination("all")
    }


    

    return (
    <div>
        <Navbar noSticky={true} removeMargin={true} auth={props.auth} />
        <div className="HomeIMG">
            <img className="FirstImage" src={__dirname + "./photos/home/home1.jpg"} alt="home image"></img>
            <h1 className="ontopTitle">Let's Discover The World Together !</h1>
            <div className="ontop">
                <div className="locationSection">
                    <h3 className="inputLabels">Location</h3>
                    <input className="bookInputs" type="text" placeholder="Where Are You Going ?" onChange={handleDestination} />
                </div>
                <div className="bookingDates dropdown-home">
                    <h3 className="inputLabels" onClick={() => setShowCalender(!showCalender)}>Check In - Check Out</h3>
                    <h4 className="placeholderDates" onClick={() => setShowCalender(!showCalender)}>{(date1 || date2) ? `${date1} - ${date2}` : "Add Dates"}</h4>
                    <div class="dropdown-content-home" style={showCalender ? {display : "block"} : null}>
                        <Calender sendHomeDates={sendHomeDates} home={true} />
                    </div>
                </div>
                <Link to={`/search/destination=${destination}/checkin=${date1}/checkout=${date2}`} style={{ textDecoration: 'none'}}>
                        <img className="searchIcon" src="./photos/home/search.png" alt="searchicon"  />
                </Link>
            </div>
        </div>
        <div className="tripSuggestionsSection">
            <div className="tripSuggestions">
                <Link to="/search/destination=Nabeul/checkin=/checkout=" style={{ textDecoration: 'none', margin: "0 1.5%" }}>
                    <div className="beach"><h1 className="picComment">Beach Trip</h1></div>
                </Link>
                <div>
                <Link to="/search/destination=Tunis/checkin=/checkout=" style={{ textDecoration: 'none'}}>
                    <div className="hysto"><h1 className="picComment">Historical Places</h1></div>
                </Link>
                <Link to="/search/destination=Tozeur/checkin=/checkout=" style={{ textDecoration: 'none'}}>
                    <div className="desert"><h1 className="picComment">The Desert</h1></div>
                </Link>
                </div>
                <Link to="/search/destination=Jendouba/checkin=/checkout=" style={{ textDecoration: 'none',marginLeft: "1.5%"}}>
                    <div className="nature"><h1 className="picComment">Wonder Nature</h1></div>
                </Link>
            </div>
        </div>
        <div className="aboutTunisiaSection">
            <div className="aboutTunisia">
                <div className="descriptionText">
                    <h1 className="titleTunisia">Discover the Desert, sandy beaches and historical places, This Is Tunisia !</h1>
                    <p className="descriptionDetails">Tunisia still has surprises in store for you. You can enjoy the most beautiful sandy beaches, explore the ruins of an ancient Roman city, learn to ride a camel, then completely unwind in one of our superb thalassotherapy centres. Dive through a school of fish, learn to kite surf, taste one of the countless couscous recipes, play a round of golf… For MICE organisers, you can rely on excellent infrastructure and many well equipped conference centres. </p>
                </div>
                <div className="imageTunisia">
                    <img src={__dirname + "./photos/home/tunisia1.jpg"} alt="tunisia" />
                </div>
            </div>
            
        </div>
        <div className="discoverTunisia">
            <div className="coloredDiv">

            </div>
            <div className="region">
                <h1 className="bestDestinationtext">Explore Best Destination</h1>
                <div className="bestDestination">
                    <Link to="/search/destination=Tunis/checkin=/checkout=" style={{ textDecoration: 'none',marginLeft: "3%"}}>
                    <div className="tunis thetunis">
                        <h1 className="lastText">Tunis</h1>
                    </div>
                    </Link>
                    <Link to="/search/destination=Nabeul/checkin=/checkout=" style={{ textDecoration: 'none',marginLeft: "3%"}}>
                    <div className="tunis nabeul">
                        <h1 className="lastText">Nabeul</h1>
                    </div>
                    </Link>
                    <Link to="/search/destination=Djerba/checkin=/checkout=" style={{ textDecoration: 'none',marginLeft: "3%"}}>
                    <div className="tunis drahem">
                        <h1 className="lastText">Djerba</h1>
                    </div>
                    </Link>
                </div>
            </div>
            <img className="travelers" src={__dirname + "./photos/home/travelers.png"} alt="travelers" />
        </div>
        <Footer />
    </div>
    )
}

export default HomePage;