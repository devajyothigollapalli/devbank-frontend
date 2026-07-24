import React,{useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const api = axios.create({
  baseURL:"https://devbank-backend-production.up.railway.app/api"
});

function Withdraw(){

const {id} = useParams();
const navigate = useNavigate();

const [amount,setAmount] = useState("");
const [pin,setPin] = useState("");
const [loading,setLoading] = useState(false);

const [message,setMessage] = useState("");
const [type,setType] = useState("");

const submit = async ()=>{

setMessage("");

if(!amount || !pin){
setType("error");
setMessage("All fields required");
return;
}

try{

setLoading(true);

await api.put(`/withdrawCash/${id}`,{
balance:Number(amount),
pinNo:Number(pin)
});

setType("success");
setMessage("Withdraw Successful");

setTimeout(()=>{
navigate("/success",{state:{message:"Withdraw Successful"}});
},1200);

}catch(e){

setType("error");

if(e.response){
setMessage(e.response.data.message || e.response.data);
}else{
setMessage("Transaction Failed");
}

}
finally{
setLoading(false);
}

};

return(

<div style={styles.page}>

<Navbar/>

{/* LOADER */}
{loading && (
<div style={styles.loaderOverlay}>
<div style={styles.loader}></div>
</div>
)}

<div style={styles.container}>

{/* IMAGE */}
<div style={styles.image}></div>

{/* FORM */}
<div style={styles.form}>

<h2 style={{marginBottom:"20px"}}>Withdraw Money</h2>

{/* ✅ MESSAGE BOX */}
{message && (
<div className={`msgBox ${type}`}>
{message}
</div>
)}

<input
type="number"
placeholder="Enter Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
style={styles.input}
/>

<input
type="password"
placeholder="Enter PIN"
value={pin}
onChange={(e)=>setPin(e.target.value)}
style={styles.input}
/>

<button onClick={submit} style={styles.primaryBtn}>
Withdraw
</button>

<button
onClick={()=>navigate(`/forgot-pin/${id}`)}
style={styles.secondaryBtn}
>
Forgot PIN
</button>

<button
onClick={()=>navigate("/dashboard")}
style={styles.backBtn}
>
Back
</button>

</div>

</div>

<style>
{`

.msgBox{
padding:12px;
margin-bottom:15px;
border-radius:6px;
font-weight:500;
text-align:center;
animation:fadeIn 0.4s ease, shake 0.4s ease;
}

.msgBox.error{
background:#ffdede;
color:#c62828;
}

.msgBox.success{
background:#d4edda;
color:#155724;
}

@keyframes fadeIn{
from{opacity:0; transform:translateY(-10px);}
to{opacity:1; transform:translateY(0);}
}

@keyframes shake{
0%{transform:translateX(0)}
25%{transform:translateX(-5px)}
50%{transform:translateX(5px)}
75%{transform:translateX(-5px)}
100%{transform:translateX(0)}
}

@keyframes spin{
0%{transform:rotate(0deg)}
100%{transform:rotate(360deg)}
}

`}
</style>

</div>

);

}

export default Withdraw;


/* STYLES */

const styles={

page:{
minHeight:"100vh",
background:"linear-gradient(135deg,#ff7e00,#ffb347)",
overflowX:"hidden"
},

container:{
display:"flex",
maxWidth:"1100px",
margin:"40px auto",
background:"#fff",
borderRadius:"10px",
overflow:"hidden",
boxShadow:"0 8px 20px rgba(0,0,0,0.15)"
},

image:{
flex:1,
backgroundImage:"url('https://img.freepik.com/free-vector/atm-machine-concept-illustration_114360-1587.jpg')",
backgroundSize:"cover",
backgroundPosition:"center"
},

form:{
flex:1,
padding:"40px",
display:"flex",
flexDirection:"column",
justifyContent:"center"
},

input:{
padding:"10px",
marginBottom:"12px",
border:"1px solid #ccc",
borderRadius:"5px"
},

primaryBtn:{
padding:"10px",
background:"#ff7e00",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer",
marginBottom:"10px"
},

secondaryBtn:{
padding:"10px",
background:"#555",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer",
marginBottom:"10px"
},

backBtn:{
padding:"10px",
background:"#000",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer"
},

loaderOverlay:{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.4)",
display:"flex",
justifyContent:"center",
alignItems:"center"
},

loader:{
width:"60px",
height:"60px",
border:"6px solid #eee",
borderTop:"6px solid #ff7e00",
borderRadius:"50%",
animation:"spin 1s linear infinite"
}

};
