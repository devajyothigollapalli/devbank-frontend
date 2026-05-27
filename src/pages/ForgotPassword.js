import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword(){

  const navigate = useNavigate();

  const [accountNo,setAccountNo] = useState("");
  const [mail,setMail] = useState("");
  const [otp,setOtp] = useState("");
  const [newPassword,setNewPassword] = useState("");

  const [step,setStep] = useState(1);

  const [msg,setMsg] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  /* ===== SEND OTP ===== */

  const sendOtp = async ()=>{

    setMsg("");
    setError("");

    if(!mail){
      setError("Enter email");
      return;
    }

    try{

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/fetch/sendOtp",
        { mail }
      );

      const data = res.data;
      setMsg(typeof data === "object" ? data.message : data);

      setStep(2);

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


  /* ===== RESET PASSWORD ===== */

  const resetPassword = async ()=>{

    setMsg("");
    setError("");

    if(!accountNo || !otp || !newPassword){
      setError("All fields required");
      return;
    }

    try{

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/forgotPassword",
        {
          accountNo:Number(accountNo),
          mail,
          otp,
          newPassword
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

        <h2>Forgot Password</h2>

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

            <button onClick={sendOtp} className="btn">
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
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
              placeholder="New Password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              className="input"
            />

            <button onClick={resetPassword} className="btn">
              Reset Password
            </button>
          </>
        )}

        {loading && <p className="loading">Processing...</p>}

        {msg && <p className="success">{msg}</p>}
        {error && <p className="error">{error}</p>}

      </div>

      {/* ===== CSS ===== */}

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

      .input{
        width:100%;
        padding:12px;
        margin:10px 0;
        border-radius:6px;
        border:1px solid #ccc;
        font-size:14px;
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
        left:15px;
        top:15px;
        background:none;
        border:none;
        font-weight:bold;
        cursor:pointer;
        color:#243b55;
      }

      .loading{
        margin-top:15px;
        color:#555;
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

  )

}

export default ForgotPassword;
