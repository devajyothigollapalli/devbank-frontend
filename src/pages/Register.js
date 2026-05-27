import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

function Register() {

const nav = useNavigate();

const [user,setUser] = useState({
accountHolder:"",
mail:"",
mobile:"",
password:"",
age:"",
role:"",
});

const [otp,setOtp] = useState("");
const [sent,setSent] = useState(false);
const [loading,setLoading] = useState(false);
const [msg,setMsg] = useState("");
const [type,setType] = useState(""); // ✅ NEW (for styling)

const [showConfetti,setShowConfetti] = useState(false);
const [accountType,setAccountType] = useState("");

/* SEND OTP */
const sendOtp = async () => {

if(!user.accountHolder || !user.mail){
setType("error");
setMsg("Name and Email are required");
return;
}

try{
setLoading(true);
setMsg("Sending OTP...");

await api.post("/fetch/sendOtp",{
mail:user.mail,
accountHolder:user.accountHolder
});

setSent(true);
setType("success");
setMsg("OTP Sent Successfully");

}catch(e){

setType("error");

// ✅ FIX HERE
if(e.response){
setMsg(e.response.data.message || "Failed to send OTP");
}else{
setMsg("Server Error");
}

}
finally{
setLoading(false);
}

};

/* REGISTER */
const register = async () => {

if(!otp){
setType("error");
setMsg("Enter OTP");
return;
}

try{
setLoading(true);
setMsg("Registering...");

await api.post("/fetch",{user,otp});

const birthYear = new Date(user.age).getFullYear();
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

if(age < 16){
setAccountType("🎉 Zero Account Created Successfully!");
}else{
setAccountType("🎉 Savings Account Created Successfully!");
}

setType("success");
setShowConfetti(true);

setTimeout(()=>{
setShowConfetti(false);
nav("/");
},4000);

}catch(e){

setType("error");

// ✅ FIX HERE
if(e.response){
setMsg(e.response.data.message || e.response.data);
}else{
setMsg("Registration Failed");
}

}
finally{
setLoading(false);
}

};

return(

<div className="registerContainer">

{showConfetti && <Confetti/>}

<div className="registerCard">

{/* LEFT IMAGE */}
<div className="leftSide">
<img
src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
alt="bank"
/>
</div>

{/* RIGHT FORM */}
<div className="rightSide">

<h2>Create Account</h2>

{accountType && (
<h3 className="success">{accountType}</h3>
)}

{/* ✅ MESSAGE BOX */}
{msg && (
<p className={`msg ${type}`}>
{msg}
</p>
)}

<input
className="input"
placeholder="Name"
onChange={(e)=>setUser({...user,accountHolder:e.target.value})}
/>

<input
className="input"
placeholder="Email"
onChange={(e)=>setUser({...user,mail:e.target.value})}
/>

<input
className="input"
placeholder="Mobile"
onChange={(e)=>setUser({...user,mobile:e.target.value})}
/>

<input
className="input"
type="password"
placeholder="Password"
onChange={(e)=>setUser({...user,password:e.target.value})}
/>

<input
className="input"
type="date"
onChange={(e)=>setUser({...user,age:e.target.value})}
/>

<select
className="input"
onChange={(e)=>setUser({...user,role:e.target.value})}
>
<option value="">Select Role</option>
<option>User</option>
</select>

{!sent ? (

<button className="btn" onClick={sendOtp}>
Send OTP
</button>

) : (

<>
<input
className="input"
placeholder="Enter OTP"
onChange={(e)=>setOtp(e.target.value)}
/>

<button className="btn" onClick={register}>
Verify & Register
</button>
</>

)}

</div>

</div>

<style>{`

.registerContainer{
min-height:100vh;
background:linear-gradient(135deg,#ff7e00,#ffb347);
display:flex;
align-items:center;
justify-content:center;
padding:20px;
}

/* CARD */
.registerCard{
display:flex;
width:900px;
max-width:100%;
background:#fff;
border-radius:12px;
overflow:hidden;
box-shadow:0 6px 20px rgba(0,0,0,0.2);
}

/* LEFT */
.leftSide{
flex:1;
display:flex;
align-items:center;
justify-content:center;
background:#fff3e6;
padding:20px;
}

.leftSide img{
width:180px;
max-width:100%;
}

/* RIGHT */
.rightSide{
flex:1;
padding:30px;
display:flex;
flex-direction:column;
justify-content:center;
}

/* INPUT */
.input{
width:100%;
padding:10px;
margin:8px 0;
border:1px solid #ddd;
border-radius:6px;
outline:none;
}

/* BUTTON */
.btn{
width:100%;
padding:12px;
margin-top:10px;
background:#ff7a00;
color:#fff;
border:none;
border-radius:6px;
cursor:pointer;
font-weight:bold;
}

/* MESSAGE */
.msg{
margin-top:8px;
padding:10px;
border-radius:6px;
text-align:center;
font-weight:500;
}

.msg.error{
background:#ffdede;
color:#c62828;
}

.msg.success{
background:#d4edda;
color:#155724;
}

.success{
color:green;
}

/* MOBILE */
@media(max-width:768px){

.registerCard{
flex-direction:column;
}

.leftSide{
display:none;
}

.rightSide{
padding:20px;
}

}

`}</style>

</div>

);

}

export default Register;
