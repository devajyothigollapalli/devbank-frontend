import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import Navbar from "../components/Navbar";

function TransactionDetails(){

const {id} = useParams();
const [txn,setTxn] = useState(null);
const [loading,setLoading] = useState(true);
const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{

api.get(`/txn/${id}`)
.then(res=>{
setTxn(res.data);
})
.catch(err=>console.error(err))
.finally(()=>setLoading(false));

},[id]);

if(loading){
return <h3 style={{textAlign:"center", marginTop:"50px"}}>Loading...</h3>;
}

if(!txn){
return <h3 style={{textAlign:"center", marginTop:"50px"}}>Transaction not found</h3>;
}

const type = txn.type?.toLowerCase() || "";

const isTransfer = type.includes("transfer");
const isWithdrawal = type.includes("debit");

let symbol = "↓";
let color = "green";
let bgColor = "#e6fff2";

if(isTransfer){
symbol = "⇄";
color = "#0052cc";
bgColor = "#e6f0ff";
}
else if(isWithdrawal){
symbol = "↑";
color = "red";
bgColor = "#ffe5e5";
}

return(

<div style={{
background:"linear-gradient(to right, #ff7a00, #ffb347)",
minHeight:"100vh",
padding:"20px",
overflowX:"hidden" // ✅ FIX 1 (important)
}}>

<Navbar/>

<div className="txnContainer">

<div className="txnCard">

{/* ICON */}

<div style={{
background:bgColor,
color:color,
width:"70px",
height:"70px",
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"30px",
margin:"auto",
marginBottom:"15px"
}}>
{symbol}
</div>

<h2>Transaction Details</h2>

<p style={{color:"#666", fontSize:"14px"}}>
Transaction summary
</p>

<hr style={{margin:"15px 0"}}/>

<div style={{textAlign:"left"}}>

<h3>👤 {user.accountNo}</h3>

<p><b>Amount:</b> 
<span style={{
color:color,
fontWeight:"bold",
marginLeft:"5px"
}}>
₹{txn.amount}
</span>
</p>
{/* 
<p><b>Type:</b> {txn.type}</p> */}

<p><b>Transaction Type: </b> {txn.remarks}</p>

<p><b>Date:</b> 
<span style={{marginLeft:"5px"}}>
{new Date(txn.txnDate).toLocaleString()}
</span>
</p>

</div>

</div>

</div>

<style>{`

/* CONTAINER */
.txnContainer{
display:flex;
justify-content:center;
align-items:flex-start;
padding-top:20px;
}

/* CARD */
.txnCard{
width:100%;
max-width:420px;
background:white;
padding:20px;
border-radius:15px;
box-shadow:0 8px 20px rgba(0,0,0,0.2);
text-align:center;
}

/* MOBILE FIX */
@media(max-width:768px){

.txnContainer{
padding:10px;
}

.txnCard{
margin-top:10px;
padding:15px;
}

/* 🔥 CRITICAL FIX FOR SIDEBAR OVERFLOW */
body{
overflow-x:hidden;
}

}

`}</style>

</div>
);
}
export default TransactionDetails;
