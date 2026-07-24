import React,{useState,useEffect} from "react";
import {FaUser,FaLock,FaSignInAlt,FaUserPlus,FaUniversity,FaPhone} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Preloader from "../components/Preloader";
import axios from "axios";

const api = axios.create({
  baseURL:"https://devbank-backend-production.up.railway.app/api"
});

function Login(){

const [page,setPage] = useState("home");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [pageLoader,setPageLoader] = useState(true);

const [message,setMessage] = useState("");
const [type,setType] = useState("");
const [loading,setLoading] = useState(false);

const [menuOpen,setMenuOpen] = useState(false);

const navigate = useNavigate();

useEffect(()=>{
setTimeout(()=>{
setPageLoader(false);
},2000);
},[]);

/* LOGIN */
const handleLogin = async () => {

setMessage("");

if(!email || !password){
setType("error");
setMessage("Please enter Email and Password");
return;
}

try{
setLoading(true);

const res = await api.post("/login",{
email:email,
password:password
});

localStorage.setItem("user",JSON.stringify(res.data));

setType("success");
setMessage("Login Successful");

setTimeout(()=>{
navigate("/dashboard");
},1000);

}catch(e){

setType("error");

if(e.response){
setMessage(e.response.data.message || "Invalid Login Details");
}else{
setMessage("Server Error");
}

}
finally{
setLoading(false);
}

};

if(pageLoader){
return <Preloader/>
}

return(

<div style={styles.container}>

{loading && <Preloader/>}

{/* NAVBAR */}
<div style={styles.navbar}>

<h2 style={styles.logo}><FaUniversity/> DevBank</h2>

{/* DESKTOP MENU */}
<div className="navlinks">
<p onClick={()=>setPage("home")}>Home</p>
<p onClick={()=>setPage("services")}>Services</p>
<p onClick={()=>setPage("contact")}>Contact Us</p>
</div>

{/* HAMBURGER */}
<div className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
☰
</div>

{/* MOBILE MENU */}
{menuOpen && (
<div className="mobileMenu">
<p onClick={()=>{setPage("home");setMenuOpen(false)}}>Home</p>
<p onClick={()=>{setPage("services");setMenuOpen(false)}}>Services</p>
<p onClick={()=>{setPage("contact");setMenuOpen(false)}}>Contact</p>
</div>
)}

</div>

{/* MAIN CARD */}
<div className="mainCard">

{/* IMAGE */}
<div className="imageBox">
<img
src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc"
alt="bank"
/>
</div>

{/* CONTENT */}
<div className="content">

{page==="home" && (
<div>

<h2>DevBank Login</h2>

{message && (
<div className={`msg ${type}`}>
{message}
</div>
)}

<div className="inputBox">
<FaUser/>
<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
</div>

<div className="inputBox">
<FaLock/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
</div>

<button onClick={handleLogin} className="loginBtn">
{loading ? "Logging..." : <><FaSignInAlt/> Login</>}
</button>

<button
className="registerBtn"
onClick={()=>navigate("/register")}
>
<FaUserPlus/> Create Account
</button>

<p
onClick={()=>navigate("/forgotpassword")}
className="forgot"
>
Forgot Password ?
</p>

</div>
)}

{page==="services" && (
<div>
<h2>Banking Services</h2>
<ul>
<li>Open Account</li>
<li>Deposit</li>
<li>Withdraw</li>
<li>Transfer</li>
<li>Balance</li>
</ul>
</div>
)}

{page==="contact" && (
<div>
<h2>Contact Us</h2>
<p><FaPhone/> +91 9876543210</p>
<p>devbank@gmail.com</p>
</div>
)}

</div>
</div>

<style>{`

/* RESET FIX */
body{
margin:0;
overflow-x:hidden;
}

/* NAVBAR */
.navlinks{
display:flex;
gap:25px;
font-weight:bold;
cursor:pointer;
}

.hamburger{
display:none;
font-size:24px;
cursor:pointer;
}

/* MOBILE MENU (DEFAULT HIDE) */
.mobileMenu{
display:none;
}

/* CARD */
.mainCard{
display:flex;
width:850px;
max-width:95%;
margin:30px auto;
background:#fff;
border-radius:12px;
overflow:hidden;
}

/* IMAGE */
.imageBox{
flex:1;
}
.imageBox img{
width:100%;
height:100%;
object-fit:cover;
}

/* CONTENT */
.content{
flex:1;
padding:30px;
}

/* INPUT */
.inputBox{
display:flex;
gap:10px;
border:1px solid #ddd;
padding:10px;
margin-bottom:15px;
border-radius:6px;
}
.inputBox input{
border:none;
outline:none;
width:100%;
}

/* BUTTONS */
.loginBtn{
width:100%;
padding:10px;
background:#ff7e00;
color:#fff;
border:none;
margin-top:10px;
border-radius:5px;
cursor:pointer;
}
.registerBtn{
width:100%;
padding:10px;
background:#fff;
color:#ff7e00;
border:2px solid #ff7e00;
margin-top:10px;
border-radius:5px;
cursor:pointer;
}
.forgot{
margin-top:10px;
cursor:pointer;
color:#1976d2;
}

/* MESSAGE */
.msg{
padding:10px;
margin-bottom:10px;
border-radius:5px;
}
.msg.error{
background:#ffebee;
color:#c62828;
}
.msg.success{
background:#e8f5e9;
color:#2e7d32;
}

/* MOBILE VIEW */
@media(max-width:768px){

.navlinks{
display:none;
}

.hamburger{
display:block;
}

/* MOBILE DROPDOWN */
.mobileMenu{
display:flex;
position:absolute;
top:60px;
right:10px;
background:#ff7e00;
padding:15px;
border-radius:10px;
flex-direction:column;
gap:10px;
color:#fff;
}

/* CARD */
.mainCard{
flex-direction:column;
width:95%;
}

.imageBox{
display:none;
}

.content{
padding:20px;
}

}

`}</style>

</div>

);

}

export default Login;


/* BASE STYLES */
const styles={

container:{
minHeight:"100vh",
background:"linear-gradient(135deg,#ff7e00,#ffb347)",
display:"flex",
flexDirection:"column",
alignItems:"center"
},

navbar:{
width:"90%",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px 20px",
color:"#fff",
position:"relative",

},

logo:{
display:"flex",
alignItems:"center",
gap:"10px"
}

};
