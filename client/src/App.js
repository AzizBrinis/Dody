import React, { Fragment, useEffect, useState } from "react";
import Register  from "./components/login/Register";
import Login from "./components/login/Login";
import { Redirect, Route } from "react-router-dom";
import Hello from "./components/login/Hello";
import axios from "axios";
import Loading from "./components/Loading/Loading";
import PublicPage from "./components/PublicPage/PublicPage";
import Property from "./components/Property/Property";

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
      <Route exact path="/">
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
      <Route exact path="/hello">
        {
          loading && <Loading />
        }
        {
          !loading && (auth ?
           <Hello auth={auth} />
        : <Login /> )
        }
      </Route>
    </Fragment>
  );
}

export default App;
