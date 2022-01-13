import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import Map from "../Maps/Map";
import Navbar from "../NavBar/Navbar";
import SearchItem from "../SearchItem/SearchItem";
import "./SearchPage.css";
import axios from "axios";
import Loading from "../Loading/Loading";



const SearchPage = (props) => {
    const params = useParams();
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState([])
    let cords = []
 

    let des = params.des;
    let checkin = params.checkin;
    let checkout = params.checkout;





    useEffect(async() => {
        await axios.get(`/search/${des}/${checkin}/${checkout}`)
                   .then((res) => {
                     setData(res.data);
                   })
                   .catch((err)=> {
                       console.log(err)
                   });

        setLoading(false)
    },[loading])

    if(!loading) {
        data.map(el => cords.push(el.location))
    }

    return (
    <div>
    {!loading && <div className="masterDiv">
        <Navbar auth={props.auth} removeMargin={true} />
        <div className="SearchPageContent">
            <div className="InfoSection">
                {data.map(el => {return(<div className="SingleItem" >
                <Link to={`/properties/${el._id}/${el.id}`} style={{ textDecoration: 'none' }} >
                    <SearchItem details={el} />
                </Link>
                </div>)})}
            </div>
            <div className="LocationsFound">
                <Map center= {{lat : 33.8869,lng : 9.5375}} zoom={7} cords={cords} />
            </div>
        </div>
        
        
    </div>}
    {loading && <Loading /> }
    </div>
    )
}

export default SearchPage;



{/* <Link to="/properties/61d862ee4fa2552997f236ed/41">
                    <h1>Light Bath</h1>
                </Link>
                <Link to="/properties/61d862cf4fa2552997f236e5/986">
                    <h1>Tazarka</h1>
                </Link>  */}