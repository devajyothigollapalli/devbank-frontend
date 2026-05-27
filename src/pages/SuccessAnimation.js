import React,{useEffect,useState} from "react";
import Confetti from "react-confetti";
import {useNavigate,useLocation} from "react-router-dom";

function SuccessAnimation(){

  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message || "Transaction Successful";

  const [show,setShow] = useState(true);

  useEffect(()=>{

    const timer = setTimeout(()=>{
      setShow(false);
      navigate("/dashboard");
    },5000); // 5 seconds

    return ()=>clearTimeout(timer);

  },[navigate]);

  return(

    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      background:"linear-gradient(135deg,#ff7e00,#ffb347)"
    }}>

      {/* CONFETTI BLAST */}

      {show && (
        <Confetti
          numberOfPieces={500}
          recycle={false}
        />
      )}

      <div style={{
        background:"#fff",
        padding:"40px",
        borderRadius:"20px",
        textAlign:"center",
        boxShadow:"0 10px 30px rgba(0,0,0,0.2)"
      }}>

        <div style={{
          fontSize:"80px",
          color:"#2e7d32"
        }}>
          ✓
        </div>

        <h2 style={{color:"#2e7d32"}}>
          {message}
        </h2>

      </div>

    </div>

  )
}

export default SuccessAnimation;
