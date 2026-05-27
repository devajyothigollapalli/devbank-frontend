import React from "react";

export default function Preloader(){

  return(
    <div className="overlay">

      <div className="loader"></div>

      <h2 className="text">DevBank Processing...</h2>

      <style>{`

      .overlay{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.85);
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        color:#fff;
        z-index:999;
        padding:20px;
        text-align:center;
      }

      .loader{
        width:70px;
        height:70px;
        border:8px solid #ddd;
        border-top:8px solid #00ffcc;
        border-radius:50%;
        animation:spin 1s linear infinite;
      }

      .text{
        margin-top:20px;
        font-weight:600;
        letter-spacing:0.5px;
      }

      /* 📱 MOBILE */
      @media (max-width:480px){

        .loader{
          width:50px;
          height:50px;
          border-width:6px;
        }

        .text{
          font-size:16px;
          margin-top:15px;
        }

      }

      /* 📱 TABLET */
      @media (max-width:768px){

        .loader{
          width:60px;
          height:60px;
        }

        .text{
          font-size:18px;
        }

      }

      @keyframes spin{
        0%{transform:rotate(0deg);}
        100%{transform:rotate(360deg);}
      }

      `}</style>

    </div>
  );
}
