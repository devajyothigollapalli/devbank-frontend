import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import Navbar from "../components/Navbar";

function History() {

const [txns,setTxns] = useState([]);
const navigate = useNavigate();
const {accountNo} = useParams();
const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{

const accNo = accountNo || user?.accountNo;

if(!accNo){
console.log("Account number missing");
return;
}

api.get(`/history/${accNo}`)
.then(res=>{

const sorted = res.data.sort(
(a,b)=> new Date(b.txnDate) - new Date(a.txnDate)
);

setTxns(sorted);

})
.catch(err=>console.error(err));

},[accountNo, user?.accountNo]);

return(

<div style={{
background:"#ff7a00",
minHeight:"100vh"
}}>

<Navbar/>

{/* Header */}

<div style={{
color:"white",
padding:"20px",
fontSize:"clamp(20px,4vw,26px)",
fontWeight:"bold",
textAlign:"center"
}}>
Transaction History
</div>

{/* Container */}

<div style={{
maxWidth:"700px",
margin:"auto",
padding:"15px"
}}>

{txns.length===0 && (
<p style={{color:"white",textAlign:"center"}}>
No Transactions Found
</p>
)}

{txns.map((txn,index)=>{


const remarks = txn.remarks?.toLowerCase() || "";

const isWithdrawal = remarks.includes("withdraw");
const isTransfer = remarks.includes("transfer");


return(

<div
key={txn.txnId || index}
onClick={()=>navigate(`/txn/${txn.txnId}`)}

style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"white",
padding:"16px",
marginBottom:"12px",
borderRadius:"12px",
boxShadow:"0 3px 8px rgba(0,0,0,0.15)",
cursor:"pointer"
}}

>

{/* LEFT */}

<div style={{
display:"flex",
alignItems:"center",
gap:"12px"
}}>

<div style={{
background: isTransfer
  ? "#e6f0ff"
  : isWithdrawal
  ? "#ffe5e5"
  : "#e6fff2",

color: isTransfer
  ? "blue"
  : isWithdrawal
  ? "red"
  : "green",

width:"38px",
height:"38px",
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"18px",
fontWeight:"bold"
}}>
{isTransfer ? "⇅" : isWithdrawal ? "↑" : "↓"}
</div>

<div>

<div style={{
fontWeight:"600",
fontSize:"clamp(14px,3vw,16px)"
}}>
{txn.remarks}
</div>

<div style={{
fontSize:"clamp(11px,2.5vw,13px)",
color:"#777"
}}>
{new Date(txn.txnDate).toLocaleString()}
</div>

</div>

</div>

{/* RIGHT */}

<div style={{
fontWeight:"bold",
fontSize:"clamp(15px,3vw,18px)",
color: isTransfer
  ? "blue"
  : isWithdrawal
  ? "red"
  : "green"
}}>
{isTransfer
  ? "⇄"
  : isWithdrawal
  ? "-"
  : "+"} ₹{txn.amount}
</div>

</div>

)

})}

</div>

</div>

)

}

export default History;
