import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPin(){

  const navigate = useNavigate();

  const [accountNo,setAccountNo] = useState("");
  const [mail,setMail] = useState("");
  const [otp,setOtp] = useState("");
  const [newPin,setNewPin] = useState("");

  const [step,setStep] = useState(1);

  const [msg,setMsg] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [name,setName] = useState("");

  /* SEND OTP */

  const sendOtp = async () => {

  setMsg("");
  setError("");

  if(!mail){
    setError("Enter Email");
    return;
  }

  try{

    setLoading(true);

    const res = await axios.post(
      "http://localhost:8080/api/fetch/sendOtp",
      { mail }
    );

    const data = res.data;

    setMsg(data.message);
    setName(data.name);

    setStep(2);

  }catch(err){

    if(err.response){
      setError(err.response.data.message || "Error");
    }else{
      setError("Server Error");
    }

  }finally{
    setLoading(false);
  }
};

  /* RESET PIN */

  const resetPin = async () => {

    setMsg("");
    setError("");

    if(!accountNo || !otp || !newPin){
      setError("All fields required");
      return;
    }

    if(newPin.length !== 4){
      setError("PIN must be 4 digits");
      return;
    }

    try{

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/forgotPin",
        {
          accountNo:Number(accountNo),
          mail,
          otp,
          newPin:Number(newPin)
        }
      );

      const data = res.data;
      setMsg(typeof data === "object" ? data.message : data);

    }catch(err){

      if(err.response){
        const data = err.response.data;
        setError(typeof data === "object" ? data.message : data);
      }else{
        setError("Server Error");
      }

    }finally{
      setLoading(false);
    }

  };

  return(

    <div className="page">

      <div className="card">

        {/* BACK BUTTON */}
        <button className="backBtn" onClick={()=>navigate(-1)}>
          ← Back
        </button>

        <h2>Forgot PIN</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              value={mail}
              onChange={(e)=>setMail(e.target.value)}
              className="input"
            />

            <button className="btn" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="welcome">Hi {name}</p>

            <input
              type="number"
              placeholder="Account Number"
              value={accountNo}
              onChange={(e)=>setAccountNo(e.target.value)}
              className="input"
            />

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              className="input"
            />

            <input
              type="password"
              placeholder="New 4 Digit PIN"
              value={newPin}
              onChange={(e)=>setNewPin(e.target.value)}
              className="input"
            />

            <button className="btn" onClick={resetPin}>
              Reset PIN
            </button>
          </>
        )}

        {loading && (
          <div className="loaderBox">
            <div className="loader"></div>
            <p>Processing...</p>
          </div>
        )}

        {msg && <p className="success">{msg}</p>}
        {error && <p className="error">{error}</p>}

      </div>

      {/* CSS */}
      <style>{`

      .page{
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:100dvh;
        background:linear-gradient(to right,#141e30,#243b55);
        padding:15px;
      }

      .card{
        background:#fff;
        padding:35px;
        border-radius:12px;
        width:100%;
        max-width:380px;
        text-align:center;
        box-shadow:0 10px 25px rgba(0,0,0,0.3);
        position:relative;
      }

      h2{
        margin-bottom:20px;
      }

      .welcome{
        margin-bottom:10px;
        font-weight:bold;
        color:#243b55;
      }

      .input{
        width:100%;
        padding:12px;
        margin:10px 0;
        border-radius:6px;
        border:1px solid #ccc;
      }

      .btn{
        width:100%;
        padding:12px;
        background:#243b55;
        color:#fff;
        border:none;
        border-radius:6px;
        cursor:pointer;
        margin-top:10px;
        font-weight:600;
      }

      .btn:hover{
        background:#ff7e00;
      }

      .backBtn{
        position:absolute;
        top:15px;
        left:15px;
        background:none;
        border:none;
        font-weight:bold;
        cursor:pointer;
        color:#243b55;
      }

      .loaderBox{
        margin-top:15px;
      }

      .loader{
        border:5px solid #f3f3f3;
        border-top:5px solid #243b55;
        border-radius:50%;
        width:40px;
        height:40px;
        animation:spin 1s linear infinite;
        margin:auto;
      }

      @keyframes spin{
        0%{transform:rotate(0deg);}
        100%{transform:rotate(360deg);}
      }

      .success{
        color:green;
        margin-top:10px;
      }

      .error{
        color:red;
        margin-top:10px;
      }

      /* 📱 MOBILE */

      @media(max-width:480px){

        .card{
          padding:25px;
        }

        h2{
          font-size:20px;
        }

        .input{
          padding:10px;
        }

        .btn{
          padding:10px;
        }

      }

      `}</style>

    </div>
  );
}

export default ForgotPin;
