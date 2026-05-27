import React,{useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const api = axios.create({
baseURL:"http://localhost:8080/api"
});

function Transfer(){

const {id} = useParams();
const navigate = useNavigate();

const [to,setTo] = useState("");
const [amount,setAmount] = useState("");
const [pin,setPin] = useState("");

const [loading,setLoading] = useState(false);
const [message,setMessage] = useState("");
const [type,setType] = useState("");

const submit = async ()=>{

setMessage("");

if(!to || !amount || !pin){
setType("error");
setMessage("All fields required");
return;
}

if(Number(to) === Number(id)){
setType("error");
setMessage("Cannot transfer to same account");
return;
}

try{

setLoading(true);

const res = await api.put(`/transfer/${id}/${to}`,{
amount:Number(amount),
pinNo:Number(pin)
});

setType("success");
setMessage(res.data);

setTo("");
setAmount("");
setPin("");

setTimeout(()=>{
navigate("/success");
},1200);

}catch(e){

setType("error");

if(e.response){
setMessage(e.response.data.message || e.response.data);
}else{
setMessage("Server Error");
}

}finally{
setLoading(false);
}

};

return(

<div style={styles.page}>

<Navbar/>

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

<h2 style={{marginBottom:"20px"}}>Transfer Money</h2>

{message && (
<div style={{
padding:"10px",
marginBottom:"15px",
borderRadius:"6px",
background:type==="error" ? "#ffdede" : "#d4edda",
color:type==="error" ? "#c62828" : "#155724"
}}>
{message}
</div>
)}

<input
type="number"
placeholder="Receiver Account Number"
value={to}
onChange={(e)=>setTo(e.target.value)}
style={styles.input}
/>

<input
type="number"
placeholder="Amount"
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
Transfer
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

</div>

);

}

export default Transfer;


/* STYLES */

const styles={

page:{
minHeight:"100vh",
background:"#f4f6f9"
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
backgroundImage:"url('https://img.freepik.com/free-vector/money-transfer-concept-illustration_114360-2245.jpg')",
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
