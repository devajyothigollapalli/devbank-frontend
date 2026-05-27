import React,{useEffect,useState} from "react";
import {api,handleError} from "../api/api";
import Navbar from "../components/Navbar";

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
backgroundImage:"url('https://img.freepik.com/free-vector/tax-concept-illustration_114360-5867.jpg')",
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

title:{ marginBottom:"20px" },

input:{
padding:"10px",
marginBottom:"12px",
border:"1px solid #ccc",
borderRadius:"5px"
},

btn:{
padding:"10px",
background:"#243b55",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer"
},

status:{ marginTop:"10px", fontWeight:"500" },

loaderOverlay:{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.6)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:"999"
},

loaderImg:{ width:"120px" }
};

function PanLink(){

const user = JSON.parse(localStorage.getItem("user"));

const [pan,setPan] = useState("");
const [loading,setLoading] = useState(false);
const [msg,setMsg] = useState("");
const [linked,setLinked] = useState(false);

useEffect(()=>{

const checkPan = async()=>{

try{
setLoading(true);

const res = await api.get(`/usingid/${user.accountNo}`);

// ✅ already linked check
if(res.data.panNo){
setLinked(true);
}

}catch(e){
handleError(e);
}
finally{
setLoading(false);
}

};

checkPan();

},[]);


// 🔥 MAIN FUNCTION
const linkPan = async()=>{

// 🔴 frontend validation
if(!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)){
setMsg("❌ Invalid PAN format");
return;
}

try{

setLoading(true);
setMsg("");

const res = await api.put(`/linkPan/${user.accountNo}`,{
panNo:pan
});

const message = res.data;

// ✅ SAME USER SAME PAN
if(message.includes("already linked to this account")){
setMsg("ℹ️ PAN already linked");
setLinked(true);
}
// ✅ SUCCESS
else{
setMsg("✅ PAN Linked Successfully");
setLinked(true);
}

}catch(e){

// 🔥 NO MORE [object Object]
let errorMsg = "Something went wrong";

if(e.response?.data){

errorMsg =
typeof e.response.data === "string"
? e.response.data
: e.response.data.message;

}

setMsg("❌ " + errorMsg);

}
finally{
setLoading(false);
}

};

return(

<div style={styles.page}>

<Navbar/>

{/* 🔄 LOADER */}
{loading && (
<div style={styles.loaderOverlay}>
<img
src="https://i.gifer.com/ZZ5H.gif"
alt="loading"
style={styles.loaderImg}
/>
</div>
)}

<div style={styles.container}>

{/* LEFT IMAGE */}
<div style={styles.image}></div>

{/* RIGHT FORM */}
<div style={styles.form}>

<h2 style={styles.title}>Link PAN Card</h2>

{linked ? (

<p style={{color:"green",fontWeight:"bold"}}>
✅ PAN already linked
</p>

) : (

<>

<input
placeholder="Enter PAN Number"
maxLength={10}
value={pan}
onChange={e=>setPan(e.target.value.toUpperCase())}
style={styles.input}
/>

<button onClick={linkPan} style={styles.btn}>
Link PAN
</button>

{/* 🔥 MESSAGE */}
{msg && (
<p style={{
...styles.status,
color: msg.includes("❌")
? "red"
: msg.includes("ℹ️")
? "orange"
: "green"
}}>
{msg}
</p>
)}

</>

)}

</div>

</div>

</div>

);

}

export default PanLink;
