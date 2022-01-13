import React, { Fragment, useEffect, useState } from "react";
import Register  from "./components/login/Register";
import Login from "./components/login/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import Hello from "./components/login/Hello";
import axios from "axios";
import Loading from "./components/Loading/Loading";
import PublicPage from "./components/PublicPage/PublicPage";
import Property from "./components/Property/Property";
import Payment from "./components/Payment/Payment";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Reservation from "./components/Reservation/Reservation";

function App() {
  const [auth,setAuth] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(async () => {
  setLoading(true);
  await axios
  .get("/test")
  .then((res) => { 
  if(res.data.msg == "auth") {
    setAuth(true)
  } else {
    setAuth(false)
  }
  setLoading(false)
  })
  .catch((err) => console.log(err))}, [])
  

  return (
    <Fragment>
    <Switch>
      <Route exact path="/">
        {
          loading && <Loading />
        }
        {
          !loading && <HomePage auth={auth} />
        }
      </Route>
      <Route exact path="/search/:des/:checkin/:checkout">
        {
          loading && <Loading />
        }
        {
          !loading && <SearchPage auth={auth} />
        }
      </Route>
      <Route exact path="/properties/:id/:pid">
        {
          loading && <Loading />
        }
        {
          !loading && <Property auth={auth}/>
        }
      </Route>
      <Route exact path="/signup">
        {
          loading && <Loading />
        }
        {
          !loading && (auth ?
           <Hello auth={auth} />
        : <Register /> )
        }
      </Route>
      <Route exact path="/signup=failed">
        {
          loading && <Loading />
        }
        {
          !loading && (auth ?
           <Hello auth={auth} />
        : <Register signupFailed={true} /> )
        }
      </Route>
      <Route exact path="/login">
      {
          loading && <Loading />
        }
        {
          !loading && (auth ?
           <Hello auth={auth} />
        : <Login /> )
        }
      </Route>
      <Route exact path="/login=failed">
      {
          loading && <Loading />
        }
        {
          !loading && (auth ?
           <Hello auth={auth} />
        : <Login loginFailed={true} /> )
        }
      </Route>
      <Route exact path="/reservation">
          <Reservation auth={auth} />
      </Route>
      <Route exact path="*">
          <PageNotFound auth={auth} />
      </Route>
    </Switch>
    </Fragment>
  );
}

export default App;
