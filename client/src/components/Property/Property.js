import Navbar from "../NavBar/Navbar";
import ImageGallery from 'react-image-gallery';
import "./Property.css";
import Calender from "../Calender/Calender";
// import Map from "../Maps/Map";
import React, { useEffect, useState, useRef } from "react";
import Footer from "../Footer/Footer";
// import {Tazarka} from "../DefaultData/DefaultData";
import Payment from "../Payment/Payment";
import Login from "../login/Login";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
// import React, { useRef, useEffect } from 'react';
import axios from "axios";



const Property = (props) => {

  const params = useParams();

  const id = params.id;
  const pid = params.pid;

  let photos;

  const [loading,setLoading] = useState(true);
  const [Tazarka,setTazarka] = useState();
  const [days,setDays] = useState(0);
  const [date1,setDate1] = useState(0);
  const [date2,setDate2] = useState(0);
  const [payment,setPayment] = useState(false);
  
  

  const mapRef = useRef();
  

  const myMap = async (loc)=> {
    const map =await  new window.google.maps.Map(mapRef.current, {
      center: loc,
      zoom: 16
    });
  
    new window.google.maps.Marker({ position: loc, map: map,icon:__dirname + "./photos/search/markerbigger.png" });
  }

  useEffect(async() => {
    await axios.get("/properties/"+id+"/"+pid)
               .then((res) => { 
                if(res.data) {
                    setTazarka(res.data)
                    myMap(res.data.location)
                } 
                })
                .catch((err) => console.log(err))
                
                setLoading(false);
},[loading,payment]);

  if(!loading) {
    photos = Tazarka.photos.map(link =>  ({ original : __dirname+link  , thumbnail : __dirname+link  }))
    
  }

  const getDates = (data,date1,date2) => {
    setDays(data)
    setDate1(date1)
    setDate2(date2)
    }
    const goback = () => {
    setPayment(false);
    setDays(0);
  }

    return (
    <div>
      {!loading && <div>
      {!payment && <div>
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
              <img className="photoStyling" src={__dirname + Tazarka.hostPhoto} alt="aziz" />
            </div>
            <h1 className="hostInfo">{`Hello, My name is ${Tazarka.host} And I'm going to be your host !`}</h1>
            </div>
          </div>
          <div className="book">
            <h1 className="price">{`${Tazarka.price} TND`}</h1>
            <h2 className="nightTag">Per Night</h2>
            <div className="Calender">
              <Calender getDates={getDates} invalid={Tazarka.BookedDates.map((el,i) => i % 2 == 0 && ({ start : el , end : Tazarka.BookedDates[i+1] }))} />
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
              <button className="reservation" onClick={() => setPayment(true)}>Book Now</button>
            </div>}
            
            
          </div>
          
        </div>
        <div className="addMaps">
          <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
          ></div>
          {/* <Map center= {Tazarka.location} zoom={16} /> */}
        </div>
        <Footer />
    </div>}
    {payment && props.auth && <Payment info={Tazarka} date1={date1} date2={date2} days={days} auth={props.auth} goback={goback} id={id} pid={pid} />}
    {payment && !props.auth && <Login pay={id + " " + pid} /> }
    </div>}
    {loading && <Loading />}
  </div> )
}

export default Property;