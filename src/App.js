import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Balance from "./pages/Balance";
import ForgotPin from "./pages/ForgotPin";
import ForgotPassword from "./pages/ForgotPassword";
import SetPin from "./pages/SetPin";
import SuccessAnimation from "./pages/SuccessAnimation";
import CreditCard from "./pages/CreditCard";
import MiniStatement from "./pages/MiniStatement";

import EditProfile from "./pages/EditProfile";

import AllUsers from "./pages/AllUsers";

import PanLink from "./pages/PanLink";
import History from "./pages/History";
import TransactionDetails from "./pages/TransactionDetails";
import CibilScore from "./pages/CibilScore";
function App(){

  return(

    <Router>

      <Routes>

         <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/register" element={<Register/>} />

        <Route path="/dashboard" element={<Dashboard/>} />

        <Route path="/deposit/:id" element={<Deposit/>} />

        <Route path="/withdraw/:id" element={<Withdraw/>} />

        <Route path="/transfer/:id" element={<Transfer/>} />

        <Route path="/balance/:id" element={<Balance/>} />
<Route path="/forgot-pin/:id" element={<ForgotPin/>}/>
<Route path="/credit-card" element={<CreditCard/>}/>
<Route path="/success" element={<SuccessAnimation/>}/>
<Route path="/forgotpassword" element={<ForgotPassword/>} />
<Route path="/setpin" element={<SetPin/>} />
<Route path="/mini-statement" element={<MiniStatement/>}/>

        <Route path="/creditcard" element={<CreditCard />} />
           <Route path="/edit/:id" element={<EditProfile />} />
              <Route path="/allusers" element={<AllUsers/>}/>
              <Route path="/panlink" element={<PanLink/>}/>
            

<Route path="/history/:accountNo" element={<History/>}/>
<Route path="/txn/:id" element={<TransactionDetails/>}/>
        <Route path="/cibil/:accountNo" element={<CibilScore />} />
      </Routes>

    </Router>

  )
}

export default App
// import logo from './logo.svg';
// import './App.css';
// import BankingApp from './ZenBanking Application/BankingApp';

// function App() {
//   return (
//     <div className="App">
//      <BankingApp/>
//     </div>
//   );
// }

// export default App;
