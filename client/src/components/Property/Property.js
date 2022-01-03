import Navbar from "../NavBar/Navbar";
import ImageGallery from 'react-image-gallery';
import "./Property.css";
import Calender from "../Calender/Calender";
import Map from "../Maps/Map";
import { useState } from "react";
import Footer from "../Footer/Footer";
import {Tazarka} from "../DefaultData/DefaultData";

const Property = (props) => {
  const [days,setDays] = useState(0);
  const photos = Tazarka.photos.map(link =>  ({ original : link  , thumbnail : link  }))
  const getDates = (data) => {
    setDays(data)
  }
    return (
    <div>
        <Navbar auth={props.auth}/>
        <div className="propertyInfo">
            <h1 className="propertyTitle">{Tazarka.title}</h1>
            <h2 className="propertyLocation">{Tazarka.address}</h2>
        </div>
        <div className="ImageGallery">
            <ImageGallery 
              className="ImageGallery"
              items={photos} 
              showBullets={true}
              showIndex={true}

            />
        </div>
        <div className="infoAndBook">
          <div className="details">
            <h1 className="space">About this space</h1>
            <p className="decription">{Tazarka.description}</p>
            <hr className="lineStyle"/>
            <div className="host">
            <div class="circular--landscape">
              <img className="photoStyling" src={Tazarka.hostPhoto} alt="aziz" />
            </div>
            <h1 className="hostInfo">{`Hello, My name is ${Tazarka.host} And I'm going to be your host !`}</h1>
            </div>
          </div>
          <div className="book">
            <h1 className="price">{`${Tazarka.price} TND`}</h1>
            <h2 className="nightTag">Per Night</h2>
            <div className="Calender">
              <Calender getDates={getDates} invalid={Tazarka.BookedDates} />
            </div>
            {days !== 0 && <div className="totalPrice">
              <div className="textFlex">
                <h2 className="startAll">{`${Tazarka.price} x ${days} nights`}</h2>
                <h2 className="endAll">{`${Math.trunc(Tazarka.price*days)} TND`}</h2>
              </div>
              <div className="textFlex">
                <h2 className="startAll">Service Fee</h2>
                <h2 className="endAll">{`${Math.trunc(Tazarka.price*days*0.08)} TND`}</h2>
              </div>
              <div className="textFlex">
                <h2 className="startAll">TVA</h2>
                <h2 className="endAll">{`${Math.trunc(Tazarka.price*days*0.01)} TND`}</h2>
              </div>
              <hr />
              <div className="textFlex">
                <h1 className="startAll sizeMe">Total</h1>
                <h1 className="endAll sizeMe">{`${Math.trunc(Tazarka.price*days)+Math.trunc(Tazarka.price*days*0.01)+Math.trunc(Tazarka.price*days*0.08)} TND`}</h1>
              </div>
              <button className="reservation">Book Now</button>
            </div>}
            
            
          </div>
          
        </div>
        <div className="addMaps">
          <Map center= {Tazarka.location} zoom={16} />
        </div>
        <Footer />
    </div> )
}

export default Property;