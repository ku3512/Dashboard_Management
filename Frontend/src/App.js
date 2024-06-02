import ChangePassword from "./Components/Pages/ChangePassword/ChangePassword";
import CreateUser from "./Components/Pages/CreateUser/CreateUser";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Navbar from "./Components/Pages/Navbar/Navbar";
import Registration from "./Components/Pages/Registration/Registration";
import Footer from "../src/Components/Pages/Footer/Footer";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import EditUser from "./Components/Pages/EditUser/EditUser";
import Login from "./Components/Pages/Login/Login";

// import { CheckLoggedIn, IsNotLoggedIn } from "./Components/CheckLogin";

import React, { useEffect } from "react";
// const loggedIn = true;
function App() {
  // const [loggedIn, setLoggedIn] = React.useState(false);
 var loggedIn =localStorage.getItem('loggedIn')
// var loggedIn= ''
//  useEffect(()=>{
//   var loggedIn =localStorage.getItem('loggedIn')
// loggedIn=loggedIn
//  },[])
  return (
    <>
      <div>
        <Navbar loggedIn={loggedIn} />

        <Routes>
          <Route element={<CheckLoggedIn loggedIn={loggedIn} />}>
            <Route
              path="/registration"
              element={
                <Registration loggedIn={loggedIn} />
              }
            />

            <Route
              path="/login"
              element={<Login  loggedIn={loggedIn} />}
            />
          </Route>

          {/* user loggedin then show pages */}

          <Route element={<IsNotLoggedIn loggedIn={loggedIn} />}>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/edituser/:id"
              element={<EditUser  />}
            />
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </>
  )
}

export default App

const CheckLoggedIn = ({loggedIn}) => {
  if (loggedIn) {
    return <Navigate to="/" />
  }
  return (
    <>
      <Outlet />
    </>
  )
}

const IsNotLoggedIn = ({loggedIn}) => {
  if (!loggedIn) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
