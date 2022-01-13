import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import Navbar from "../NavBar/Navbar";
import "./Payment.css";
import axios from "axios";

const ValidCreditCards = [
    {
        validnumber : "5300432011472031",
        validmonth : "09",
        validyear : "24",
        validcvv : "112", 
    },
    {
        validnumber : "4338000152253652",
        validmonth : "11",
        validyear : "22",
        validcvv : "586", 
    }
]



const Payment = (props) => {
    let digit = "";
    const [processPayment,setProcessPayment] = useState(false);
    const [name,setName] = useState("")
    const [cardNumber,setCardNumber] = useState("")
    const [cvv,setCvv] = useState("");
    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [error,setError] = useState("");
    const [card,setCard] = useState("");
    const [success,setSuccess] = useState(false);
    const verifCardNum = (data) => {
        if ((""+data).length<16) {
            setError("Inavlid Card Number")
        } else {
            setError("")
        }
    }
    const verifMonth = (data) => {
        if (data > 12 || data < 1) {
            setError("Invalid Expiration Date")
        }else {
            setError("")
        }
    }
    const verif = (data) => {
            if (data < 22 || data > 35) {
                setError("Invalid Expiration Date")
            } else {
                setError("")
            }
    }
    const CardNumFun = (data) => {
        setCardNumber(data);
        digit = (""+data)[0];
        if (digit == 5) {
            setCard("./photos/pay/mastercardLogo.png")
            setError("")
        } else if (digit == 4) {
            setCard("./photos/pay/visaLogo.png")
            setError("")
        } else {
            setCard("")
            setError("Inavlid Card Number")
        }
    }
    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }
        const goaway = async() => {
            await axios.post("/addbookeddates/"+props.id+"/"+props.pid,{
                BookedDates : props.date1 + " " + props.date2
            })
            .then(function (response) {
                console.log(response);
              })
            .catch(function (error) {
                console.log(error);
              });
        }

    const payNow = () => {
        if (name && cardNumber && cvv && month && year) {
        setProcessPayment(true);
        setTimeout(() => {
        let toVerify = ValidCreditCards.find(el => el.validnumber == cardNumber)
        if(toVerify && toVerify.validmonth == month && toVerify.validyear == year && toVerify.validcvv == cvv) {
            setSuccess(true);
            goaway();
        } else {
            setError("An Error Occured : Please Verify Your Card Informations")
        }
        setProcessPayment(false)
        } , 3000)
        } else {
            setError("Please Fill All The Inputs")
        }
    }

    return (
    <div>
        {!processPayment && !success && <div>
            <div style={{padding : "1% 10%"}}>
                <Link to="/" >
                    <img className="Logo" src={__dirname + "./photos/navbar/logo.png"} alt="logo" />
                </Link>
            </div>
            <div className="Payment">
                <div className="paySection payInputs">
                    <div>
                    <div className="payTitle">
                        <img className="backButton" src={__dirname + "./photos/pay/goback.png"} alt="goback" onClick={() => props.goback()} />
                        <img className="paylogo" src={__dirname + "./photos/pay/paylogo.jpg"} alt="payLogo" />
                        <h1 className="h1">Payment</h1>
                    </div>
                    <div>
                        <h2 className="tripInfo">About Your Trip</h2>
                    </div>
                    <div className="houseInfo">
                        <img src={__dirname + props.info.photos[0]} alt="house" className="housePhoto" />
                        <h2 className="tripTitle">{props.info.title}</h2>
                        <div className="dates">
                            <div>
                                <h2 className="datesTitle">Dates</h2><br/>
                                <h3 className="datesReceived">{props.date1}<br/> - <br/>{props.date2}</h3>
                            </div>
                        </div>
                    </div>
                    <hr className="hrSpace"/>
                    <div className="cardInfo">
                        <h2 style={{color : "red"}}>{error}</h2>
                        <div className="cardNumberFiled">
                            <div>
                                <h1 className="cardTitle">Full Name</h1>
                                <p className="cardP">Enter the name on the card</p>
                            </div>
                            
                            <input className="sizeMeRight" type="text" placeholder="Foulen Ben Foulen" maxLength={26} onChange={(e) => setName(e.target.value)} value={name} required  />
                        </div>
                        <div className="cardNumberFiled">
                            <div>
                                <h1 className="cardTitle">Card Number</h1>
                                <p className="cardP">Enter the 16-digit card number on the card</p>
                            </div>
                            <input className="sizeMeRight" type="number" placeholder="1234 - 5678 - 9101 - 1123" style={error == "Inavlid Card Number" ? {borderColor : "red"} : null} maxLength = "16" onInput={(e) => maxLengthCheck(e)} onChange={(e) => CardNumFun(e.target.value)} onBlur={(e) => verifCardNum(e.target.value)} value={cardNumber} required />
                        </div>
                        <div className="cardNumberFiled EXDate">
                            <div>
                                <h1 className="cardTitle">Expiry Date</h1>
                                <p className="cardP">Enter the expiration date on the card</p>
                            </div>
                            <div className="cardDate">
                                <input className="sizeMeRightDate" type="number" placeholder="09" maxLength = "2" min="1" max="12" style={error == "Invalid Expiration Date" ? {borderColor : "red"} : null} onBlur={(e) => verifMonth(e.target.value)} onInput={(e) => maxLengthCheck(e)} onChange={(e) => setMonth(e.target.value) } value={month} required />
                                <h5>/</h5>
                                <input className="sizeMeRightDate" type="number" placeholder="25" maxLength = "2" min="22" style={error == "Invalid Expiration Date" ? {borderColor : "red"} : null} onInput={(e) => maxLengthCheck(e)} onBlur={(e) => verif(e.target.value)} onChange={(e) => setYear(e.target.value)} value={year} required />
                            </div>
                        </div>
                        <div className="cardNumberFiled">
                            <div>
                                <h1 className="cardTitle">CVV Number</h1>
                                <p className="cardP">Enter the 3 or 4 digit number on the card</p>
                            </div>
                            <input className="sizeMeRight" type="number" maxLength="4" placeholder="123" maxLength = "4" onInput={(e) => maxLengthCheck(e)} onChange={(e) => setCvv(e.target.value)} value={cvv} required />
                        </div>
                    </div>
                    </div>
                        

                </div>
                <div className="paySection payIllution">
                    <div className="payPhoto">
                        <div className="FullInfo">
                            <div className="virtualCard">
                    
                                <h2 className="NameOnCard fixFirstIssueName">{name}</h2>
                                {cardNumber < 999999999999999 && <h2 className="NameOnCard"  style={{height : "97px"}}></h2>}
                                {cardNumber > 999999999999999 && <h2 className="NameOnCard"  style={{height : "97px"}}><span className="pointsCard">....</span> {cardNumber%10000}</h2>}
                                <div className="LogoAndDate">
                                    {month && year ? <h2 className="NameOnCard dataStyling">{`${month} / ${year}`}</h2> : <h2 className="NameOnCard dataStyling"></h2>}
                                    {card ? <img src={__dirname + card} alt="Master Card" className="masterCard" /> : <img src={__dirname + "./photos/pay/default.png"} alt="Master Card" className="masterCard" /> }
                                </div>
                                <div className="totalPrice">
                                    <div className="textFlex adjustment">
                                        <h2 className="startAll settingColorLight">{`${props.info.price} x ${props.days} nights`}</h2>
                                        <h2 className="endAll settingColor">{`${Math.trunc(props.info.price*props.days)} TND`}</h2>
                                    </div>
                                    <div className="textFlex adjustment">
                                        <h2 className="startAll settingColorLight">Service Fee</h2>
                                        <h2 className="endAll settingColor">{`${Math.trunc(props.info.price*props.days*0.08)} TND`}</h2>
                                    </div>
                                    <div className="textFlex adjustment">
                                        <h2 className="startAll settingColorLight">TVA</h2>
                                        <h2 className="endAll settingColor">{`${Math.trunc(props.info.price*props.days*0.01)} TND`}</h2>
                                    </div>
                                    
                                    <div className="NewTotal">
                                        <h1 className="startAll sizeMe settingColorLight andSizeToo">Total</h1>
                                        <h1 className="endAll sizeMe NewToPay settingColor">{`${Math.trunc(props.info.price*props.days)+Math.trunc(props.info.price*props.days*0.01)+Math.trunc(props.info.price*props.days*0.08)} TND`}</h1>
                                    </div>
                                    <button onClick={() => payNow()} className="reservation payAdjustment">Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>}
        {processPayment && !success && <div className="processing">
            <div className="centerLoading">
            <div className="loadern"></div>
            <h1 style={{ lineHeight : "1.5"}}>Please wait while we are processing<br />your payment</h1>
            </div>
        </div>}
        {success && 
        <div className="SuccPage">
            <Navbar auth={props.auth}/>
            <img src={__dirname + "./photos/pay/Succ.gif"} alt="Succ" />
            <h1 style={{color : "#7CD1B8", marginBottom : "1%"}}>Reservation Confirmed !</h1>
            <h2>we are pleased to inform you that we have received your payment and your reservation is confirmed !<br />We look forward to your visit and hope you will enjoy your experience with Dody<br /><br />Thank You For Choosing Dody</h2>
            <Link to="/reservation" style={{ textDecoration: 'none'}} >
                <button className="myReservations">My Reservations</button>
            </Link>
            <Footer />
        </div>}
    </div>
    )
}

export default Payment;