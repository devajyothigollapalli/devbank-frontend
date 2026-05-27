import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar(){

  const navigate = useNavigate();
  const [menuOpen,setMenuOpen] = useState(false);

  return(

    <nav className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={()=>navigate("/")}>
        <img src={logo} alt="DevBank" />
      </div>

      {/* HAMBURGER */}
      <div 
        className="hamburger"
        onClick={()=>setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* MENU */}
      <div className={`menu ${menuOpen ? "open" : ""}`}>

        <button className="nav-btn" onClick={()=>navigate("/dashboard")}>
          Home
        </button>

        <button className="nav-btn logout" onClick={()=>navigate("/")}>
          Logout
        </button>

      </div>

     <style>{`

/* NAVBAR */
.navbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:10px 20px;
  background:#ffb347;
  color:#000;
  position:sticky;
  top:0;
  z-index:1000;
}

/* LOGO */
.logo img{
  height:65px;
  object-fit:contain;
  cursor:pointer;
}

/* MENU (DESKTOP) */
.menu{
  display:flex;
  gap:15px;
  align-items:center;
}

/* BUTTON */
.nav-btn{
  padding:10px 20px;
  border:none;
  border-radius:25px;
  cursor:pointer;
  font-weight:600;
  font-size:14px;
  color:#fff;
  background:linear-gradient(135deg,#ff7e00,#ff3d00);
  box-shadow:0 4px 12px rgba(0,0,0,0.2);
  transition:all 0.3s ease;
}

.nav-btn:hover{
  transform:translateY(-2px) scale(1.05);
  box-shadow:0 6px 18px rgba(0,0,0,0.3);
}

/* LOGOUT */
.logout{
  background:linear-gradient(135deg,#ff4d4f,#c62828);
}

/* HAMBURGER */
.hamburger{
  display:none;
  font-size:24px;
  cursor:pointer;
}

/* 📱 MOBILE FIX */
@media(max-width:768px){

  .logo img{
    height:50px;
  }

  .hamburger{
    display:block;
  }

  /* 🔥 MAIN FIX HERE */
  .menu{
    position:fixed;            /* ✅ changed */
    top:70px;
    right:0;
    height:auto;
    width:200px;
    max-width:80%;             /* ✅ prevent overflow */
    background:#ffb347;
    flex-direction:column;
    padding:15px;
    transform:translateX(100%);
    transition:0.3s ease;
    box-shadow:-4px 0 10px rgba(0,0,0,0.2);
    border-top-left-radius:10px;
    border-bottom-left-radius:10px;
  }

  .menu.open{
    transform:translateX(0);
  }

  .nav-btn{
    width:100%;
    text-align:center;
  }

}

/* 🔥 GLOBAL FIX (VERY IMPORTANT) */
body{
  overflow-x:hidden;
}

`}</style>

    </nav>
  );
}

export default Navbar;
