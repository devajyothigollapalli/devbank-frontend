import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { api } from "../api/api";
import Navbar from "../components/Navbar";

/* ===== STYLES ===== */

const styles = {

page:{
minHeight:"100vh",
background:"linear-gradient(135deg,#ff7e00,#ffb347)",
paddingBottom:"40px"
},

container:{
maxWidth:"1100px",
margin:"30px auto",
padding:"15px"
},

title:{
color:"#fff",
textAlign:"center",
marginBottom:"25px",
fontSize:"26px"
},

grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
gap:"18px"
},

card:{
background:"#fff",
padding:"18px",
borderRadius:"12px",
boxShadow:"0 8px 20px rgba(0,0,0,0.15)",
transition:"0.3s"
},

cardTitle:{
marginBottom:"10px",
color:"#243b55",
fontSize:"18px"
},

info:{
margin:"4px 0",
fontSize:"14px",
wordWrap:"break-word"
},

input:{
padding:"9px",
width:"100%",
marginTop:"10px",
border:"1px solid #ccc",
borderRadius:"5px",
fontSize:"14px"
},

btn:{
padding:"9px 14px",
marginTop:"12px",
marginRight:"8px",
border:"none",
borderRadius:"6px",
cursor:"pointer",
color:"#fff",
fontWeight:"bold",
fontSize:"14px"
},

activateBtn:{
background:"#28a745"
},

deleteBtn:{
background:"#dc3545"
},

loaderOverlay:{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.85)",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
zIndex:"999"
},

loader:{
width:"70px",
height:"70px",
border:"8px solid #eee",
borderTop:"8px solid #00ffcc",
borderRadius:"50%",
animation:"spin 1s linear infinite"
},

loaderText:{
marginTop:"20px",
color:"#fff",
fontSize:"20px",
fontWeight:"600",
textAlign:"center"
}

};


function AllUsers(){

const [users,setUsers] = useState([]);
const [passwords,setPasswords] = useState({});
const [loading,setLoading] = useState(false);

const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));



/* ===== LOAD USERS ===== */

const loadUsers = useCallback(async () => {
  try {
    setLoading(true);
    const res = await api.get(`/allusers/${user.accountNo}`);
    setUsers(res.data);
  } catch {
  } finally {
    setLoading(false);
  }
}, [user]);
/* ===== AUTH CHECK ===== */

useEffect(() => {
  if (!user || !["CEO", "FOUNDER", "MANAGER"].includes(user.role?.toUpperCase())) {
    alert("Unauthorized Access");
    navigate("/dashboard");
    return;
  }

  loadUsers();
}, [loadUsers, navigate, user]);
/* ===== PASSWORD===== */

const handlePassword = (accNo,value)=>{
setPasswords({
...passwords,
[accNo]:value
});
};


/* ===== ACTIVATE USER ===== */

const activateUser = async(u)=>{

setLoading(true);

try{
await api.put(`/status/${user.accountNo}/${u.accountNo}`);
loadUsers();
}catch{}

setLoading(false);

};


/* ===== DELETE USER ===== */

const deleteUser = async(u)=>{

const password = passwords[u.accountNo];

if(!password){
alert("Enter authority password");
return;
}

setLoading(true);

try{
await api.post(`/delusingrole/${user.accountNo}`,{
accountNo:u.accountNo,
password:password
});
loadUsers();
}catch{}

setLoading(false);

};


return(

<div style={styles.page}>

<Navbar/>

{/* PRELOADER */}

{loading && (

<div style={styles.loaderOverlay}>

<div style={styles.loader}></div>
<p style={styles.loaderText}>DevBank Processing...</p>

</div>

)}

<div style={styles.container}>

<h2 style={styles.title}>Bank Users Management</h2>

<div style={styles.grid}>

{users.map(u=>(

<div key={u.accountNo} style={styles.card}>

<h3 style={styles.cardTitle}>{u.accountHolder}</h3>

<p style={styles.info}><b>Account No:</b> {u.accountNo}</p>
<p style={styles.info}><b>Email:</b> {u.mail}</p>
<p style={styles.info}><b>Status:</b> {u.status}</p>
<p style={styles.info}><b>Role:</b> {u.role}</p>

<input
type="password"
placeholder="Authority Password"
style={styles.input}
onChange={(e)=>handlePassword(u.accountNo,e.target.value)}
/>

{/* INACTIVE → ACTIVATE */}

{u.status==="INACTIVE" && (

<button
style={{...styles.btn,...styles.activateBtn}}
onClick={()=>activateUser(u)}
>
Activate
</button>

)}

{/* ACTIVE → DELETE */}

{u.status==="ACTIVE" && (

<button
style={{...styles.btn,...styles.deleteBtn}}
onClick={()=>deleteUser(u)}
>
<FaTrash/> Delete
</button>

)}

</div>

))}

</div>

</div>

{/* 🔥 ANIMATION */}

<style>{`

@keyframes spin{
0%{transform:rotate(0deg);}
100%{transform:rotate(360deg);}
}

/* 📱 MOBILE */
@media(max-width:480px){

h2{
font-size:20px !important;
}

}

/* 📱 TABLET */
@media(max-width:768px){

h2{
font-size:22px !important;
}

}

`}</style>

</div>

);

}

export default AllUsers;
