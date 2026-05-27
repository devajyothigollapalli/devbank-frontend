import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {api,handleError} from "../api/api";
import Navbar from "../components/Navbar";

/* ================= STYLES ================= */

const styles={

page:{
minHeight:"100dvh",
background:"#ff7e00"
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
backgroundImage:"url('https://img.freepik.com/free-vector/profile-data-concept-illustration_114360-2593.jpg')",
backgroundSize:"cover",
backgroundPosition:"center"
},

rightSide:{
flex:1,
padding:"40px",
display:"flex",
flexDirection:"column",
justifyContent:"center"
},

card:{
background:"#fff",
color:"#000",
padding:"20px",
borderRadius:"10px",
marginBottom:"20px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
},

title:{
marginBottom:"15px"
},

input:{
width:"100%",
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
cursor:"pointer",
width:"100%"
},

message:{
textAlign:"center",
marginTop:"10px",
color:"#00e676"
},

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

loaderImg:{
width:"120px"
}

};


function EditProfile(){

const {id} = useParams();

const [form,setForm] = useState({
accountHolder:"",
mail:"",
mobile:"",
password:""
});

const [loading,setLoading] = useState(false);
const [msg,setMsg] = useState("");

const [updatedData,setUpdatedData] = useState(null);
const [showBox,setShowBox] = useState(false);


/* ===== LOAD USER DATA ===== */

useEffect(()=>{

const fetchUser = async()=>{

setLoading(true);

try{

const res = await api.get(`/usingid/${id}`);

setForm({
accountHolder:res.data.accountHolder || "",
mail:res.data.mail || "",
mobile:res.data.mobile || "",
password:""
});

}catch(e){
handleError(e);
}
finally{
setLoading(false);
}

};

fetchUser();
setShowBox(false);

},[id]);


/* ===== UPDATE PROFILE ===== */

const updateProfile = async()=>{

setLoading(true);
setMsg("Updating profile...");

try{

const res = await api.put(`/editMyProfile/${id}`,form);

setUpdatedData(res.data);
setShowBox(true);
setMsg("Profile Updated Successfully");

}catch(e){

handleError(e);
setMsg("Update Failed");

}
finally{

setLoading(false);
setTimeout(()=>setMsg(""),3000);

}

};


return(

<div style={styles.page}>

<Navbar/>

{/* PRELOADER */}

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

<div style={styles.image} className="leftImage"></div>

{/* RIGHT SIDE */}

<div style={styles.rightSide}>

{/* EDIT FORM */}

<div style={styles.card}>

<h3 style={styles.title}>Edit Profile</h3>

<input
style={styles.input}
placeholder="Account Holder"
value={form.accountHolder}
onChange={(e)=>setForm({...form,accountHolder:e.target.value})}
/>

<input
style={styles.input}
placeholder="Email"
value={form.mail}
onChange={(e)=>setForm({...form,mail:e.target.value})}
/>

<input
style={styles.input}
placeholder="Mobile"
value={form.mobile}
onChange={(e)=>setForm({...form,mobile:e.target.value})}
/>

<input
style={styles.input}
type="password"
placeholder="Password"
value={form.password}
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<button style={styles.btn} onClick={updateProfile}>
Update Profile
</button>

{msg && <p style={styles.message}>{msg}</p>}

</div>

{/* UPDATED PROFILE */}

{showBox && updatedData && (

<div style={styles.card}>

<h3>Updated Profile</h3>

<p><b>Name :</b> {updatedData.accountHolder}</p>
<p><b>Email :</b> {updatedData.mail}</p>
<p><b>Mobile :</b> {updatedData.mobile}</p>
<p><b>Account No :</b> {updatedData.accountNo}</p>

</div>

)}

</div>

</div>

{/* ================= MOBILE RESPONSIVE ================= */}

<style>{`

@media(max-width:768px){

/* STACK LAYOUT */
.container{
flex-direction:column !important;
margin:10px !important;
}

/* HIDE IMAGE */
.leftImage{
display:none !important;
}

/* FORM PADDING REDUCE */
.rightSide{
padding:20px !important;
}

/* CARD SPACING */
.card{
padding:15px !important;
}

}

`}</style>

</div>

);

}

export default EditProfile;
