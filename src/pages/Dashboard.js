import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FaUserCircle,FaHistory,FaHome,FaServicestack} from "react-icons/fa";
import logo from "../assets/logo.png";
function Dashboard(){

const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

const [page,setPage] = useState("home");
const [menuOpen,setMenuOpen] = useState(false);

/* LOGIN CHECK */
useEffect(()=>{
if(!user){
navigate("/");
}
},[]);

/* LOGOUT */
const logout=()=>{
localStorage.removeItem("user");
navigate("/");
};

/* CARD */
const card={
background:"#fff",
color:"#ff7e00",
padding:"20px",
margin:"10px",
borderRadius:"15px",
width:"150px",
textAlign:"center",
cursor:"pointer",
boxShadow:"0 6px 20px rgba(0,0,0,0.2)",
fontWeight:"bold"
};

return(

<div style={styles.container}>

{/* ================= NAVBAR ================= */}

<div style={styles.navbar}>

<h2 style={{margin:0}}>🏦 DevBank</h2>

{/* DESKTOP MENU */}
<div style={styles.navlinks} className="desktopMenu">
<p onClick={()=>setPage("home")}>Home</p>
<p onClick={()=>setPage("services")}>Services</p>
<p onClick={()=>setPage("contact")}>Contact</p>
</div>

{/* RIGHT SIDE */}
<div style={styles.right}>

<FaUserCircle
size={26}
style={{cursor:"pointer"}}
onClick={()=>setPage("profile")}
/>

<button style={styles.logoutBtn} onClick={logout}>
Logout
</button>

{/* HAMBURGER */}
<div style={styles.hamburger} onClick={()=>setMenuOpen(!menuOpen)}>
☰
</div>

</div>

{/* MOBILE MENU */}
{menuOpen && (
<div style={styles.mobileMenu}>
<p onClick={()=>{setPage("home"); setMenuOpen(false);}}>Home</p>
<p onClick={()=>{setPage("services"); setMenuOpen(false);}}>Services</p>
<p onClick={()=>{setPage("contact"); setMenuOpen(false);}}>Contact</p>
</div>
)}

</div>

{/* ================= HOME ================= */}

{page==="home" && (

<div style={styles.home}>

<img
src={logo}
alt="logo"
style={styles.logo}
/>

<h1>Welcome {user.accountHolder}</h1>

<p style={{marginTop:"10px"}}>
Manage your banking services easily
</p>

<p style={styles.quote}>
"Bank smart. Live better. Your money, your control."
</p>

</div>

)}

{/* PROFILE */}

{page==="profile" && (

<div style={styles.profileBox}>
<h2>My Profile</h2>
<h3>👤 {user.accountHolder}</h3>
<h3>📧 {user.mail}</h3>
<h3>📱 {user.mobile}</h3>
<h3>🪪 {user.panNo || "Not Linked"}</h3>
<h3>🏦 {user.accountNo}</h3>
</div>

)}

{/* SERVICES */}

{page==="services" && (

<div style={styles.cards}>

<div style={card} onClick={()=>navigate(`/deposit/${user.accountNo}`)}>💰 Deposit</div>
<div style={card} onClick={()=>navigate(`/withdraw/${user.accountNo}`)}>💸 Withdraw</div>
<div style={card} onClick={()=>navigate(`/transfer/${user.accountNo}`)}>🔁 Transfer</div>
<div style={card} onClick={()=>navigate(`/balance/${user.accountNo}`)}>📊 Balance</div>
<div style={card} onClick={()=>navigate("/setpin")}>🔐 Set PIN</div>
<div style={card} onClick={()=>navigate("/credit-card")}>💳 Credit Card</div>
<div style={card} onClick={()=>navigate("/mini-statement")}>📄 Statement</div>
<div style={card} onClick={()=>navigate(`/edit/${user.accountNo}`)}>📝 Edit</div>
<div style={card} onClick={()=>navigate("/panlink")}>🪪 PAN</div>


{/* ✅ CIBIL SCORE ADD */}
<div style={card} onClick={()=>navigate(`/cibil/${user.accountNo}`)}>
📈 CIBIL Score
</div>



{["CEO","FOUNDER","MANAGER"].includes(user.role?.toUpperCase()) && (
<div style={card} onClick={()=>navigate("/allusers")}>👥 Users</div>
)}

</div>

)}

{/* CONTACT */}

{page==="contact" && (

<div style={styles.contact}>
<h2>Contact Us</h2>
<p>📞 +91 9876543210</p>
<p>📧 devbankhyd@gmail.com</p>
</div>

)}

{/* ================= FOOTER ================= */}

<div style={styles.footer}>

<div style={styles.footerItem} onClick={()=>setPage("home")}>
<FaHome/>
<p>Home</p>
</div>

<div style={styles.footerItem} onClick={()=>setPage("services")}>
<FaServicestack/>
<p>Services</p>
</div>

<div style={styles.footerItem} onClick={()=>navigate(`/history/${user.accountNo}`)}>
<FaHistory/>
<p>History</p>
</div>

</div>

{/* ================= RESPONSIVE ================= */}

<style>{`

@media(max-width:768px){

.desktopMenu{
display:none !important;
}

.hamburger{
display:block !important;
}

}

`}</style>

</div>

);

}

export default Dashboard;


/* ================= STYLES ================= */

const styles={

container:{
minHeight:"100dvh",
background:"linear-gradient(135deg,#ff7e00,#ffb347)",
color:"#fff",
display:"flex",
flexDirection:"column",
justifyContent:"space-between"
},

navbar:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"12px 20px",
background:"rgba(255,255,255,0.2)",
backdropFilter:"blur(10px)",
position:"relative"
},

navlinks:{
display:"flex",
gap:"20px",
fontWeight:"bold",
cursor:"pointer"
},

right:{
display:"flex",
alignItems:"center",
gap:"10px"
},

logoutBtn:{
background:"#fff",
color:"#ff7e00",
border:"none",
padding:"6px 12px",
borderRadius:"6px",
cursor:"pointer"
},

hamburger:{
display:"none",
fontSize:"24px",
cursor:"pointer"
},

mobileMenu:{
position:"absolute",
top:"60px",
right:"10px",
background:"#fff",
color:"#ff7e00",
padding:"15px",
borderRadius:"10px",
boxShadow:"0 5px 15px rgba(0,0,0,0.2)",
display:"flex",
flexDirection:"column",
gap:"10px"
},

home:{
textAlign:"center",
marginTop:"40px",
padding:"10px"
},

logo:{
width:"200px",
marginBottom:"5px"
},

quote:{
marginTop:"15px",
fontStyle:"italic",
fontSize:"14px"
},

profileBox:{
textAlign:"center",
marginTop:"40px"
},

cards:{
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
marginTop:"20px"
},

contact:{
textAlign:"center",
marginTop:"50px"
},

footer:{
display:"flex",
justifyContent:"space-around",
background:"#fff",
color:"#ff7e00",
padding:"10px",
borderTopLeftRadius:"20px",
borderTopRightRadius:"20px"
},

footerItem:{
display:"flex",
flexDirection:"column",
alignItems:"center",
cursor:"pointer",
fontWeight:"bold"
}

};
