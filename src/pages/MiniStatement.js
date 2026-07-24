import React,{useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function MiniStatement(){

const navigate = useNavigate();
const {id} = useParams();

const [accountNo,setAccountNo] = useState("");
const [pin,setPin] = useState("");
const [transactions,setTransactions] = useState([]);

const [loading,setLoading] = useState(false);
const [message,setMessage] = useState("");
const [type,setType] = useState("");

const getMiniStatement = async ()=>{

setMessage("");

if(!accountNo || !pin){
setType("error");
setMessage("Enter account number and PIN");
return;
}

try{

setLoading(true);

const res = await axios.post(
"https://devbank-backend-production.up.railway.app/api/miniStatement",
{
accountNo:Number(accountNo),
pin:Number(pin)
}
);

if(Array.isArray(res.data)){
setTransactions(res.data);
setType("success");
setMessage("Mini Statement Loaded");
}else{
setTransactions([]);
setType("success");
setMessage(res.data);
}

}catch(err){

setType("error");

if(err.response){
setMessage(err.response.data.message || err.response.data);
}else{
setMessage("Server Error");
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

<h2 style={{marginBottom:"20px"}}>Mini Statement</h2>

{message && (
<div className={`msgBox ${type==="error"?"error":"success"}`}>
{message}
</div>
)}

<input
placeholder="Enter Account Number"
value={accountNo}
onChange={(e)=>setAccountNo(e.target.value)}
style={styles.input}
/>

<input
type="password"
placeholder="Enter PIN"
value={pin}
onChange={(e)=>setPin(e.target.value)}
style={styles.input}
/>

<button
style={styles.primaryBtn}
onClick={getMiniStatement}
>
Get Mini Statement
</button>


{/* TRANSACTIONS */}

{Array.isArray(transactions) && transactions.length>0 && (

<div style={styles.statementBox}>

<h3>Last Transactions</h3>

<table style={styles.table}>

<thead>
<tr>
<th>Date</th>
<th>Type</th>
<th>Amount</th>
</tr>
</thead>

<tbody>

{transactions.map((t,index)=>(
<tr key={index}>
<td>{t.date}</td>
<td>{t.type}</td>
<td>₹ {t.amount}</td>
</tr>
))}

</tbody>

</table>

</div>

)}

<button
onClick={()=>navigate(`/forgot-pin/${id}`)}
style={styles.secondaryBtn}
>
Forgot PIN?
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

export default MiniStatement;


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
backgroundImage:"url('https://img.freepik.com/free-vector/bank-statement-concept-illustration_114360-5175.jpg')",
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
background:"gray",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer",
marginBottom:"10px"
},

backBtn:{
padding:"10px",
background:"black",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer"
},

statementBox:{
marginTop:"20px",
maxHeight:"220px",
overflowY:"auto"
},

table:{
width:"100%",
borderCollapse:"collapse",
marginTop:"10px"
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
