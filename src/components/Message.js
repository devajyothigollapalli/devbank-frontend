import React from "react";

export default function PageMessage({ type, text }) {

  return (
    <>
      <div className={`msg-box ${type}`}>
        {text}
      </div>

      <style>{`

        .msg-box{
          padding:12px;
          margin:15px 0;
          border-radius:6px;
          font-weight:600;
          text-align:center;
          color:#fff;
          word-wrap:break-word;
          width:100%;
          max-width:100%;
          box-sizing:border-box;
          animation:fadeIn 0.4s ease;
        }

        .msg-box.error{
          background:#ff4d4f;
        }

        .msg-box.success{
          background:#28a745;
        }

        /* 📱 MOBILE RESPONSIVE */
        @media (max-width:480px){
          .msg-box{
            padding:10px;
            font-size:14px;
            margin:10px 0;
          }
        }

        /* 💻 TABLET */
        @media (max-width:768px){
          .msg-box{
            font-size:15px;
          }
        }

        /* ✨ ANIMATION */
        @keyframes fadeIn{
          from{
            opacity:0;
            transform:translateY(-8px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

      `}</style>
    </>
  );
}
