import React from "react";
import { useNavigate } from "react-router-dom";
import {
FaUniversity,
FaUserPlus,
FaExchangeAlt,
FaWallet,
FaHistory,
FaPhone,
FaMoneyBillWave,
FaHandHoldingUsd,
FaFileInvoiceDollar,
FaShieldAlt,
FaCreditCard,
FaKey,
FaUserEdit
} from "react-icons/fa";

function Home(){

const navigate = useNavigate();

const scrollServices = () => {
document.getElementById("services").scrollIntoView({behavior:"smooth"});
};

const scrollContact = () => {
document.getElementById("contact").scrollIntoView({behavior:"smooth"});
};

return(

<div style={styles.container}>

{/* NAVBAR */}

<div style={styles.navbar}>

<h2 style={styles.logo}>
<FaUniversity/> DevBank
</h2>

<div style={styles.menu}>

<button style={styles.navBtn} onClick={scrollServices}>
Services
</button>

<button style={styles.navBtn} onClick={()=>navigate("/login")}>
Login
</button>

<button style={styles.openBtn} onClick={()=>navigate("/register")}>
Open Account
</button>

<button style={styles.navBtn} onClick={scrollContact}>
Contact Us
</button>

</div>

</div>


 

<div style={styles.hero}>

<h1 style={styles.heroTitle}>
Smart Banking For Everyone
</h1>

<p style={styles.heroText}>
Secure • Fast • Modern Digital Banking
</p>

<button
style={styles.startBtn}
onClick={()=>navigate("/register")}
>
Open Your Account
</button>

</div>




<div style={styles.slider}>

<div style={styles.slideTrack}>

<p>✔ Trusted Banking Platform</p>
<p>✔ Instant Money Transfer</p>
<p>✔ Secure OTP Transactions</p>
<p>✔ Track Your Transactions</p>
<p>✔ Credit Card Facility</p>
<p>✔ PAN Linked Accounts</p>
<p>✔ Safe Digital Banking</p>

</div>

</div>


{/* SERVICES */}

<div id="services" style={styles.services}>

<h2 style={styles.serviceTitle}>Our Banking Services</h2>

<div style={styles.cards}>

{serviceData.map((item,index)=>(
<div key={index} style={styles.card}>
{item.icon}
<h3>{item.title}</h3>
<p>{item.desc}</p>
</div>
))}

</div>

</div>



<div id="contact" style={styles.contact}>

<h2>Contact Us</h2>

<p>Need help with banking services?</p>

<p>
<FaPhone/> +91 9876543210
</p>

<p>
devbankhyd@gmail.com
</p>

</div>



<div style={styles.footer}>
<p>&nbsp; 2026 DevBank | Secure Digital Banking</p>
</div>


<style>
{`
@keyframes slide{
0%{transform:translateX(100%);}
100%{transform:translateX(-100%);}
}

button:hover{
transform:scale(1.05);
}

`}
</style>

</div>

);

}

export default Home;


const serviceData=[

{
icon:<FaUserPlus size={40} color="#ff6a00"/>,
title:"Open Account",
desc:"Create your bank account instantly."
},

{
icon:<FaMoneyBillWave size={40} color="#ff6a00"/>,
title:"Deposit Money",
desc:"Deposit money into your account securely."
},

{
icon:<FaHandHoldingUsd size={40} color="#ff6a00"/>,
title:"Withdraw Money",
desc:"Withdraw money anytime from your account."
},

{
icon:<FaExchangeAlt size={40} color="#ff6a00"/>,
title:"Money Transfer",
desc:"Transfer funds instantly between accounts."
},

{
icon:<FaWallet size={40} color="#ff6a00"/>,
title:"Check Balance",
desc:"View your account balance anytime."
},

{
icon:<FaFileInvoiceDollar size={40} color="#ff6a00"/>,
title:"Mini Statement",
desc:"View your recent transactions."
},

{
icon:<FaHistory size={40} color="#ff6a00"/>,
title:"Transaction History",
desc:"Track all your transactions."
},

{
icon:<FaShieldAlt size={40} color="#ff6a00"/>,
title:"Secure Authentication",
desc:"OTP verification for secure banking."
},

{
icon:<FaCreditCard size={40} color="#ff6a00"/>,
title:"Credit Card",
desc:"Apply and manage credit cards."
},

{
icon:<FaKey size={40} color="#ff6a00"/>,
title:"Set PIN",
desc:"Create or update secure banking PIN."
},

{
icon:<FaUserEdit size={40} color="#ff6a00"/>,
title:"Update Profile",
desc:"Update personal information easily."
}

];


/* ================= STYLES ================= */

const styles={

container:{
minHeight:"100vh",
background:"linear-gradient(135deg,#ff7e00,#ffb347)",
color:"#333",
fontFamily:"Arial"
},

navbar:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"18px 50px",
position:"sticky",
top:0,
zIndex:1000,
background:"rgba(255,255,255,0.15)",
backdropFilter:"blur(8px)"
},

logo:{
display:"flex",
alignItems:"center",
gap:"10px",
color:"#fff"
},

menu:{
display:"flex",
gap:"15px"
},

navBtn:{
padding:"8px 15px",
background:"transparent",
border:"1px solid white",
color:"#fff",
cursor:"pointer",
borderRadius:"5px"
},

openBtn:{
padding:"8px 15px",
background:"#fff",
border:"none",
color:"#ff6a00",
cursor:"pointer",
borderRadius:"5px",
fontWeight:"bold"
},

hero:{
textAlign:"center",
marginTop:"120px",
color:"#fff"
},

heroTitle:{
fontSize:"42px"
},

heroText:{
fontSize:"18px",
opacity:"0.9"
},

startBtn:{
padding:"12px 30px",
marginTop:"20px",
background:"#fff",
border:"none",
color:"#ff6a00",
fontSize:"16px",
cursor:"pointer",
borderRadius:"6px",
fontWeight:"bold"
},

slider:{
marginTop:"80px",
overflow:"hidden",
background:"rgba(255,255,255,0.3)",
padding:"10px 0"
},

slideTrack:{
display:"flex",
gap:"60px",
whiteSpace:"nowrap",
animation:"slide 25s linear infinite",
fontWeight:"bold"
},

services:{
marginTop:"80px",
padding:"40px",
textAlign:"center"
},

serviceTitle:{
color:"#fff",
fontSize:"32px"
},

cards:{
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
gap:"30px",
marginTop:"30px"
},

card:{
background:"#fff",
color:"#333",
padding:"30px",
borderRadius:"10px",
boxShadow:"0 6px 20px rgba(0,0,0,0.2)",
transition:"0.3s",
cursor:"pointer",
width:"230px",
textAlign:"center"
},

contact:{
marginTop:"80px",
padding:"40px",
textAlign:"center",
background:"rgba(255,255,255,0.2)",
color:"#fff"
},

footer:{
padding:"20px",
textAlign:"center",

bottom:0,
background:"rgba(255,255,255,0.15)",
backdropFilter:"blur(8px)",
color:"#fff"
}

};
