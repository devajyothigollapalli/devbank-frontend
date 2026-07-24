import React,{useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const api = axios.create({
  baseURL:"https://devbank-backend-production.up.railway.app/api"
});

function CreditCard(){

const [accountNo,setAccountNo] = useState("");
const [dob,setDob] = useState("");
const [cardType,setCardType] = useState("VISA");

const [message,setMessage] = useState("");
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);

const applyCard = async ()=>{

setMessage("");
setError("");

if(!accountNo || !dob){
setError("All fields required");
return;
}

try{

setLoading(true);

const res = await api.post("/creditcard",{
accountNo:Number(accountNo),
dob:dob,
cardType:cardType
});

setMessage(res.data);

setAccountNo("");
setDob("");

}catch(e){

if(e.response && e.response.data){

if(typeof e.response.data === "object"){
setError(e.response.data.message);
}else{
setError(e.response.data);
}

}else{
setError("Server Error");
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

{/* LEFT IMAGE */}

<div style={styles.image}></div>


{/* RIGHT FORM */}

<div style={styles.form}>

<h2 style={{marginBottom:"20px"}}>Apply Credit Card</h2>

{message && (
<div className="msgBox success">
{message}
</div>
)}

{error && (
<div className="msgBox error">
{error}
</div>
)}

<input
type="number"
placeholder="Enter Account Number"
value={accountNo}
onChange={(e)=>setAccountNo(e.target.value)}
style={styles.input}
/>

<input
type="date"
value={dob}
onChange={(e)=>setDob(e.target.value)}
style={styles.input}
/>

<select
value={cardType}
onChange={(e)=>setCardType(e.target.value)}
style={styles.input}
>

<option value="VISA">VISA</option>
<option value="MASTER">MASTER</option>
<option value="RUPAY">RUPAY</option>

</select>

<button
onClick={applyCard}
style={styles.primaryBtn}
>
Apply Credit Card
</button>

</div>

</div>


<style>
{`

.msgBox{
padding:12px;
margin-bottom:15px;
border-radius:6px;
text-align:center;
font-weight:500;
animation:fadeIn 0.4s ease, shake 0.4s ease;
}

.msgBox.success{
background:#d4edda;
color:#155724;
}

.msgBox.error{
background:#ffdede;
color:#c62828;
}

@keyframes fadeIn{
from{
opacity:0;
transform:translateY(-10px);
}
to{
opacity:1;
transform:translateY(0);
}
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

)

}

export default CreditCard;


/* ================= STYLES ================= */

const styles={

page:{
height:"100vh",
background:"linear-gradient(135deg,#ff7e00,#ffb347)",
overflow:"hidden"
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
backgroundImage:"url('https://img.freepik.com/free-vector/credit-card-concept-illustration_114360-1675.jpg')",
backgroundSize:"cover",
backgroundPosition:"center"
},

form:{
flex:1,
padding:"40px",
display:"flex",
flexDirection:"column",
justifyContent:"center",
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
