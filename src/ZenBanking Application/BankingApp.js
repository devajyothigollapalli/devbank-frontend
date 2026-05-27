// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   FaMoneyBillWave,
//   FaExchangeAlt,
//   FaHandHoldingUsd,
//   FaUsers,
//   FaUserEdit,
//   FaTrash,
//   FaSignOutAlt,
//   FaUserPlus,
//   FaKey,
//   FaFileInvoice,
//   FaUniversity,
//   FaCreditCard,
//   FaLock,
//   FaChartLine
// } from "react-icons/fa";


// /* ================= AXIOS ================= */
// const api = axios.create({
//   baseURL: "http://localhost:8080/api"
// });

// /* ================= ERROR HANDLER ================= */
// const handleError = (e) => {
//   if (e.response && e.response.data) {
//     const d = e.response.data;
//     if (typeof d === "string") alert(d);
//     else if (d.message) alert(d.message);
//     else alert(JSON.stringify(d, null, 2));
//   } else alert("Server Error");
// };

// /* ================= COMMON STYLES ================= */
// const bg = { minHeight:"100vh", padding:"40px",
//   background:"linear-gradient(to right,#141e30,#243b55)", color:"#fff"};

// const input = { width:"100%", padding:"10px", margin:"10px 0" };
// const btn = { padding:"10px 15px", margin:"5px",
//   background:"#243b55", color:"#fff", border:"none", cursor:"pointer" };

// const card = {
//   background:"#fff", color:"#000", padding:"25px",
//   margin:"25px", borderRadius:"50px",
//   width:"150px", textAlign:"center", cursor:"pointer"
// };

// /* ================= REGISTER WITH OTP ================= */
// function Register(){

//   const [user,setUser]=useState({
//     accountHolder:"",
//     mail:"",
//     mobile:"",
//     password:"",
//     age:"",
//     role:""
//   });

//   const [otp,setOtp]=useState("");
//   const [sent,setSent]=useState(false);
//   const nav=useNavigate();

//   const sendOtp=async()=>{

//     if(!user.accountHolder || !user.mail){
//       alert("Name and Email required");
//       return;
//     }

//     try{
//       await api.post("/fetch/sendOtp",{
//         mail:user.mail,
//         accountHolder:user.accountHolder
//       });
//       alert("OTP Sent");
//       setSent(true);
//     }catch(e){handleError(e);}
//   };

//  const register = async () => {

//   if(!user.accountHolder ||
//      !user.mail ||
//      !user.mobile ||
//      !user.password ||
//      !user.age ||
//      !user.role){
//     alert("All fields are required");
//     return;
//   }

//   if(!otp){
//     alert("Enter OTP");
//     return;
//   }

//   try{

//     const res = await api.post("/fetch",{user,otp});  

//     alert(res.data); 
//     nav("/");

//   }catch(e){
//     handleError(e);
//   }
// };


//   return(
//     <div style={bg}>
//       <div style={{maxWidth:"500px",margin:"auto"}}>
//         <h2><FaUserPlus/> Register</h2>

//         <input
//           style={input}
//           placeholder="Name"
//           value={user.accountHolder}
//           onChange={e=>setUser({...user,accountHolder:e.target.value})}
//         />

//         <input
//           style={input}
//           placeholder="Email"
//           value={user.mail}
//           onChange={e=>setUser({...user,mail:e.target.value})}
//         />

//         <input
//           style={input}
//           placeholder="Mobile"
//           value={user.mobile}
//           onChange={e=>setUser({...user,mobile:e.target.value})}
//         />

//         <input
//           style={input}
//           type="password"
//           placeholder="Password"
//           value={user.password}
//           onChange={e=>setUser({...user,password:e.target.value})}
//         />

//         <input
//           style={input}
//           type="date"
//           value={user.age}
//           onChange={e=>setUser({...user,age:e.target.value})}
//         />

//         <select
//           style={input}
//           value={user.role}
//           onChange={(e)=>setUser({...user,role:e.target.value})}
//         >
//           <option value="">Select Role</option>
//           <option value="CEO">CEO</option>
//           <option value="Founder">Founder</option>
//           <option value="Manager">Manager</option>
//           <option value="User">User</option>
//         </select>

//         {!sent ? (
//           <button style={btn} onClick={sendOtp}>
//             Send OTP
//           </button>
//         ) : (
//           <>
//             <input
//               style={input}
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={e=>setOtp(e.target.value)}
//             />
//             <button style={btn} onClick={register}>
//               Verify & Register
//             </button>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }


// /* ================= LOGIN ================= */
// function Login(){
//   const [email,setEmail]=useState("");
//   const [password,setPassword]=useState("");
//   const nav=useNavigate();

//   const login=async()=>{
//     try{
//       const res=await api.post("/login",{email,password});
//       localStorage.setItem("user",JSON.stringify(res.data));
//       nav("/dashboard");
//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <div style={{maxWidth:"400px",margin:"auto"}}>
//         <h2>Login</h2>
//         <input style={input} placeholder="Email"
//           onChange={e=>setEmail(e.target.value)}/>
//         <input style={input} type="password"
//           placeholder="Password"
//           onChange={e=>setPassword(e.target.value)}/>
//         <button style={btn} onClick={login}>Login</button>
//         <button style={btn}
//           onClick={()=>nav("/register")}>
//           Register
//         </button>
//         <button style={{...btn,background:"#555"}}
//           onClick={()=>nav("/forgot")}>
//           Forgot Password?
//         </button>
//       </div>
//     </div>
//   );
// }


// /* ================= DASHBOARD ================= */
// function Dashboard(){
//   const user=JSON.parse(localStorage.getItem("user"));
//   const nav=useNavigate();

//   return(
//     <div style={bg}>
//       <h1>Welcome {user.accountHolder}</h1>
//       <h2>Your Account is :{user.accountNo}</h2>
//       <div style={{display:"flex",flexWrap:"wrap"}}>
//         <div style={card} onClick={()=>nav(`/deposit/${user.accountNo}`)}>
//           <FaMoneyBillWave size={50}/><h3>Deposit</h3></div>
//         <div style={card} onClick={()=>nav(`/withdraw/${user.accountNo}`)}>
//           <FaHandHoldingUsd size={50}/><h3>Withdraw</h3></div>
//         <div style={card} onClick={()=>nav(`/transfer/${user.accountNo}`)}>
//           <FaExchangeAlt size={50}/><h3>Transfer</h3></div>
//         <div style={card} onClick={()=>nav(`/balance/${user.accountNo}`)}>
//           <FaChartLine size={50}/><h3>Check Balance</h3></div>
//         <div style={card} onClick={()=>nav(`/mini/${user.accountNo}`)}>
//           <FaFileInvoice size={50}/><h3>Mini Statement</h3></div>
//         <div style={card} onClick={()=>nav(`/edit/${user.accountNo}`)}>
//           <FaUserEdit size={50}/><h3>Edit Profile</h3></div>
//           <div style={card} onClick={()=>nav("/setpin")}>
//         <FaKey size={50}/><h3>Set / Change PIN</h3></div>
//       <div style={card} onClick={()=>nav("/panlink")}>
//         <FaUniversity size={50}/><h3>Link PAN</h3></div>
//         <div style={card} onClick={()=>nav("/creditcard")}>
//           <FaCreditCard size={50}/>
//           <h3>Credit Card</h3>
//         </div>

//         {["CEO","FOUNDER","MANAGER"] .includes(user.role?.toUpperCase()) &&
//           <div style={card} onClick={()=>nav("/allusers")}>
//             <FaUsers size={50}/><h3>Manage Users</h3></div>}
//       </div>
       

//       <button style={{...btn,background:"red"}}
//         onClick={()=>{localStorage.clear();nav("/")}}>
//         <FaSignOutAlt/> Logout
//       </button>
//     </div>
//   );
// }

// /* ================= DEPOSIT ================= */
// function Deposit(){
//   const {id}=useParams();
//   const [amount,setAmount]=useState("");
//   const [pin,setPin]=useState("");
//   const nav = useNavigate();


//   const submit=async()=>{
//     try{
//       await api.put(`/depositCash/${id}`,{
//         balance:Number(amount),
//         pinNo:Number(pin)   
//       });
//       alert("Deposit Successful");
//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <h2>Deposit</h2>
//       <input style={input} type="number"
//         placeholder="Amount"
//         onChange={e=>setAmount(e.target.value)}/>
//       <input style={input} type="number"
//         placeholder="Enter PIN"
//         onChange={e=>setPin(e.target.value)}/>
//       <button style={btn} onClick={submit}>
//         Deposit
//       </button>
//       <button style={{...btn,background:"gray"}}
//   onClick={()=>nav("/forgotpin")}>
//   Forgot PIN?
// </button>

//     </div>
//   );
// }


// /* ================= WITHDRAW ================= */
// function Withdraw(){
//   const {id}=useParams();
//   const [amount,setAmount]=useState("");
//   const [pin,setPin]=useState("");
// const nav = useNavigate();

//   const submit=async()=>{
//     try{
//       await api.put(`/withdrawCash/${id}`,
//         {balance:Number(amount),pinNo:Number(pin)});
//       alert("Withdraw Successful");
//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <h2>Withdraw</h2>
//       <input style={input} type="number"
//         placeholder="Amount"
//         onChange={e=>setAmount(e.target.value)}/>
//       <input style={input} type="number"
//         placeholder="PIN"
//         onChange={e=>setPin(e.target.value)}/>
//       <button style={btn} onClick={submit}>Withdraw</button>
//       <button style={{...btn,background:"gray"}}
//   onClick={()=>nav("/forgotpin")}>
//   Forgot PIN?
// </button>

//     </div>
//   );
// }

// /* ================= TRANSFER ================= */
// function Transfer(){
//   const {id}=useParams();
//   const [to,setTo]=useState("");
//   const [amount,setAmount]=useState("");
//   const [pin,setPin]=useState("");
// const nav = useNavigate();

//  const submit = async () => {

//   if(!to || !amount || !pin){
//     alert("All fields required");
//     return;
//   }

//   try{

//     const res = await api.put(`/transfer/${id}/${to}`,{
//       amount: Number(amount),
//       pinNo: Number(pin)   
//     });

//     alert(res.data);

//   }catch(e){
//     handleError(e);
//   }
// };


//   return(
//     <div style={bg}>
//       <h2>Transfer</h2>
//       <input style={input}
//         placeholder="Receiver Account"
//         onChange={e=>setTo(e.target.value)}/>
//       <input style={input} type="number"
//         placeholder="Amount"
//         onChange={e=>setAmount(e.target.value)}/>
//       <input style={input} type="number"
//         placeholder="Enter PIN"
//         onChange={e=>setPin(e.target.value)}/>
//       <button style={btn} onClick={submit}>
//         Transfer
//       </button>
//       <button style={{...btn,background:"gray"}}
//   onClick={()=>nav("/forgotpin")}>
//   Forgot PIN?
// </button>

//     </div>
//   );
// }


// /* ================= BALANCE ================= */
// function Balance(){
//   const {id}=useParams();
//   const [pin,setPin]=useState("");
//   const nav = useNavigate();

//   const [bal,setBal]=useState("");

//   const check=async()=>{
//     try{
//       const res=await api.get(`/checkingbal/${id}/${pin}`);
//       setBal(res.data);
//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <h2>Check Balance</h2>
//       <input style={input} type="number"
//         placeholder="Enter PIN"
//         onChange={e=>setPin(e.target.value)}/>
//       <button style={btn} onClick={check}>Check</button>
//       <button style={{...btn,background:"gray"}}
//   onClick={()=>nav("/forgotpin")}>
//   Forgot PIN?
// </button>

//       {bal && <h3>Balance: ₹ {bal}</h3>}
//     </div>
//   );
// }

// /* ================= MINI STATEMENT ================= */
// function Mini(){

//   const { id } = useParams();
//   const [pin,setPin] = useState("");

//   const send = async () => {

//     if(!pin){
//       alert("Enter PIN");
//       return;
//     }

//     try{

//       const res = await api.post("/miniStatement",{
//         accountNo: id,
//         pin: Number(pin)
//       });

//       alert(res.data);

//     }catch(e){
//       handleError(e);
//     }
//   };

//   return(
//     <div style={bg}>
//       <h2>Mini Statement</h2>

//       <input
//         style={input}
//         type="password"
//         placeholder="Enter PIN"
//         value={pin}
//         onChange={e=>setPin(e.target.value)}
//       />

//       <button style={btn} onClick={send}>
//         Send to Mail
//       </button>
//     </div>
//   );
// }


// /* ================= FORGOT PASSWORD ================= */
// function ForgotPassword(){
//   const [accountNo,setAccountNo]=useState("");
//   const [mail,setMail]=useState("");
//   const [otp,setOtp]=useState("");
//   const [newPassword,setNewPassword]=useState("");
//   const [step,setStep]=useState(1);
//   const nav=useNavigate();

//   const sendOtp=async()=>{
//     try{
//       await api.post("/fetch/sendOtp",{
//         mail:mail,
//         accountHolder:"User"
//       });
//       alert("OTP Sent to Email");
//       setStep(2);
//     }catch(e){handleError(e);}
//   };

//   const resetPassword=async()=>{
//     try{
//       await api.post("/forgotPassword",{
//         accountNo:Number(accountNo),
//         mail:mail,
//         otp:otp,
//         newPassword:newPassword
//       });
//       alert("Password Reset Successful");
//       nav("/");
//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <div style={{maxWidth:"400px",margin:"auto"}}>
//         <h2>Forgot Password</h2>

//         {step===1 && (
//           <>
//             <input style={input}
//               placeholder="Account Number"
//               onChange={e=>setAccountNo(e.target.value)}/>
//             <input style={input}
//               placeholder="Registered Email"
//               onChange={e=>setMail(e.target.value)}/>
//             <button style={btn} onClick={sendOtp}>
//               Send OTP
//             </button>
//           </>
//         )}

//         {step===2 && (
//           <>
//             <input style={input}
//               placeholder="Enter OTP"
//               onChange={e=>setOtp(e.target.value)}/>
//             <input style={input}
//               type="password"
//               placeholder="New Password"
//               onChange={e=>setNewPassword(e.target.value)}/>
//             <button style={btn} onClick={resetPassword}>
//               Reset Password
//             </button>
//           </>
//         )}

//         <button style={{...btn,background:"gray"}}
//           onClick={()=>nav("/")}>
//           Back to Login
//         </button>
//       </div>
//     </div>
//   );
// }


// /* ================= EDIT PROFILE ================= */
// function Edit(){
//   const {id}=useParams();
//   const [form,setForm]=useState({});
//   const [updatedData,setUpdatedData]=useState(null);

//   const update=async()=>{
//     try{
//       const res = await api.put(`/editMyProfile/${id}`,form);

//       alert("Profile Updated");
//       setUpdatedData(res.data);

//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <h2>Edit Profile</h2>
//       {updatedData && (
//         <div style={{
//           background:"#fff",
//           color:"#000",
//           padding:"15px",
//           borderRadius:"10px",
//           marginBottom:"20px"
//         }}>
//           <h3>Updated Details</h3>

//           <p>Name: {updatedData.accountHolder}</p>
//           <p>Email: {updatedData.mail}</p>
//           <p>Mobile: {updatedData.mobile}</p>
//         </div>
//       )}

//       <input style={input} placeholder="Name"
//         onChange={e=>setForm({...form,accountHolder:e.target.value})}/>

//       <input style={input} placeholder="Email"
//         onChange={e=>setForm({...form,mail:e.target.value})}/>

//       <input style={input} placeholder="Mobile"
//         onChange={e=>setForm({...form,mobile:e.target.value})}/>

//       <input style={input} type="password"
//         placeholder="Password"
//         onChange={e=>setForm({...form,password:e.target.value})}/>

//       <button style={btn} onClick={update}>Update</button>
//     </div>
//   );
// }


// /* ================= ADMIN ================= */
// function AllUsers(){
//   const [users,setUsers]=useState([]);
//   const nav=useNavigate();
//   const user=JSON.parse(localStorage.getItem("user"));
//   useEffect(()=>{
//     if(!user || !["CEO","FOUNDER","MANAGER"]
//         .includes(user.role?.toUpperCase())){
//       alert("Unauthorized Access");
//       nav("/dashboard");
//     }else{
//       load();
//     }
//   },[]);

//   const load=()=>{
//     api.get(`/allusers/${user.accountNo}`) 
//       .then(res=>setUsers(res.data))
//       .catch(handleError);
//   };
//   const changeStatus = async (acc) => {
//   try {
//     await api.put(`/status/${user.accountNo}/${acc}`);
//     alert("Status Changed");
//     load();
//   } catch (e) {
//     handleError(e);
//   }
// };

// const del = async (acc) => {

//   const adminPassword = prompt("Enter Admin Password");

//   if (!adminPassword) {
//     alert("Password required");
//     return;
//   }

//   try {
//     await api.post(`/delusingrole/${user.accountNo}`, {
//       accountNo: acc,
//       password: adminPassword  
//     });

//     alert("User Deactivated");
//     load();
//   } catch (e) {
//     handleError(e);
//   }
// };


//   return(
//     <div style={bg}>
//       <h2>Manage Users</h2>

//       {users.map(u=>(
//         <div key={u.accountNo}
//           style={{
//             background:"#fff",
//             color:"#000",
//             padding:"15px",
//             margin:"10px",
//             borderRadius:"10px"
//           }}>
//           <h3>{u.accountHolder}</h3>
//           <p>Acc: {u.accountNo}</p>
//           <p>Email: {u.mail}</p>
//           <p>Status: {u.status}</p>
//           <p>Role: {u.role}</p>

//          <button style={btn}
//   onClick={()=>changeStatus(u.accountNo)}>
//   Change Status
// </button>


//           <button style={{...btn,background:"red"}}
//             onClick={()=>del(u.accountNo)}>
//             <FaTrash/> Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
// // setPin
// function SetPin(){

//   const user = JSON.parse(localStorage.getItem("user"));
//   const [pin,setPin]=useState("");
//   const nav = useNavigate();

//   const updatePin = async()=>{
//     try{
//       await api.put(`/pinSet/${user.accountNo}`,{
//         pinNo:Number(pin)
//       });

//       alert("PIN Updated Successfully");
//       nav("/dashboard");

//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <div style={{maxWidth:"400px",margin:"auto"}}>
//         <h2>Set / Change PIN</h2>

//         <input style={input}
//           type="number"
//           placeholder="Enter 4 Digit PIN"
//           onChange={e=>setPin(e.target.value)}
//         />

//         <button style={btn} onClick={updatePin}>
//           Update PIN
//         </button>

//         <button style={{...btn,background:"gray"}}
//           onClick={()=>nav("/dashboard")}>
//           Cancel
//         </button>

//       </div>
//     </div>
//   );
// }
// // linkpan
// function PanLink(){

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [currentUser,setCurrentUser] = useState(null);
//   const [pan,setPan]=useState("");
//   const nav = useNavigate();

//   useEffect(()=>{
//     api.get(`/usingid/${storedUser.accountNo}`)

//       .then(res=>{
//         setCurrentUser(res.data);
//       })
//       .catch(handleError);
//   },[]);

//   const linkPan = async()=>{
//     try{

//       const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

//       if(!panRegex.test(pan)){
//         alert("Invalid PAN format");
//         return;
//       }

//       await api.put(`/linkPan/${storedUser.accountNo}`,{
//         panNo:pan
//       });

//       alert("PAN Linked Successfully");
//       nav("/dashboard");

//     }catch(e){handleError(e);}
//   };

//   if(!currentUser){
//     return <div style={bg}>Loading...</div>;
//   }

//   return(
//     <div style={bg}>
//       <div style={{maxWidth:"400px",margin:"auto"}}>
//         <h2>Link PAN Card</h2>

//         {currentUser.panNo ? (
//           <>
//             <p style={{color:"lightgreen"}}>
//               PAN already linked and cannot be changed.
//             </p>

//             <button
//               style={btn}
//               onClick={()=>nav("/dashboard")}
//             >
//               Back to Dashboard
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               style={input}
//               placeholder="Enter PAN Number"
//               maxLength={10}
//               onChange={e=>setPan(e.target.value.toUpperCase())}
//             />

//             <button
//               style={btn}
//               onClick={linkPan}
//             >
//               Link PAN
//             </button>

//             <button
//               style={{...btn,background:"gray"}}
//               onClick={()=>nav("/dashboard")}
//             >
//               Cancel
//             </button>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }

// // forgotpin
// function ForgotPin(){

//   const [accountNo,setAccountNo]=useState("");
//   const [mail,setMail]=useState("");
//   const [otp,setOtp]=useState("");
//   const [newPin,setNewPin]=useState("");
//   const [step,setStep]=useState(1);
//   const nav = useNavigate();

//   const sendOtp=async()=>{
//     try{
//       await api.post("/fetch/sendOtp",{
//         mail:mail,
//         accountHolder:"User"
//       });
//       alert("OTP Sent to Email");
//       setStep(2);
//     }catch(e){handleError(e);}
//   };

//   const resetPin=async()=>{
//     try{
//       await api.post("/forgotPin",{
//         accountNo:Number(accountNo),
//         mail:mail,
//         otp:otp,
//         newPin:Number(newPin)
//       });
//       alert("PIN Updated Successfully");
//       nav("/dashboard");
//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <div style={{maxWidth:"400px",margin:"auto"}}>
//         <h2>Forgot PIN</h2>

//         {step===1 && (
//           <>
//             <input style={input}
//               placeholder="Account Number"
//               onChange={e=>setAccountNo(e.target.value)}/>
//             <input style={input}
//               placeholder="Registered Email"
//               onChange={e=>setMail(e.target.value)}/>
//             <button style={btn} onClick={sendOtp}>
//               Send OTP
//             </button>
//           </>
//         )}

//         {step===2 && (
//           <>
//             <input style={input}
//               placeholder="Enter OTP"
//               onChange={e=>setOtp(e.target.value)}/>
//             <input style={input}
//               type="number"
//               placeholder="New PIN"
//               onChange={e=>setNewPin(e.target.value)}/>
//             <button style={btn} onClick={resetPin}>
//               Update PIN
//             </button>
//           </>
//         )}

//         <button style={{...btn,background:"gray"}}
//           onClick={()=>nav("/dashboard")}>
//           Cancel
//         </button>

//       </div>
//     </div>
//   );
// }
// function CreditCard(){

//   const user = JSON.parse(localStorage.getItem("user"));
//   const [dob,setDob]=useState("");
//   const [cardType,setCardType]=useState("");
//   const nav = useNavigate();

//   const applyCard = async()=>{
//     try{

//       if(!dob){
//         alert("Enter Date of Birth");
//         return;
//       }

//       if(!cardType){
//         alert("Select Card Type");
//         return;
//       }

//       await api.post(`/creditcard`,{
//         accountNo:user.accountNo,
//         dob:dob,
//         cardType:cardType
//       });

//       alert("Credit Card Applied Successfully");
//       nav("/dashboard");

//     }catch(e){handleError(e);}
//   };

//   return(
//     <div style={bg}>
//       <div style={{maxWidth:"400px",margin:"auto"}}>
//         <h2>Apply Credit Card</h2>

//         <input 
//           style={input}
//           type="date"
//           onChange={e=>setDob(e.target.value)}
//         />

//         <select
//           style={input}
//           onChange={e=>setCardType(e.target.value)}
//         >
//           <option value="">Select Card Type</option>
//           <option value="Silver">Silver</option>
//           <option value="Gold">Gold</option>
//           <option value="Platinum">Platinum</option>
//         </select>

//         <button style={btn} onClick={applyCard}>
//           Apply
//         </button>

//         <button
//           style={{...btn,background:"gray"}}
//           onClick={()=>nav("/dashboard")}
//         >
//           Cancel
//         </button>

//       </div>
//     </div>
//   );
// }
// /* ================= APP ================= */
// function BankingApp(){
//   return(
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login/>}/>
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/dashboard" element={<Dashboard/>}/>
//         <Route path="/deposit/:id" element={<Deposit/>}/>
//         <Route path="/withdraw/:id" element={<Withdraw/>}/>
//         <Route path="/transfer/:id" element={<Transfer/>}/>
//         <Route path="/balance/:id" element={<Balance/>}/>
//         <Route path="/mini/:id" element={<Mini/>}/>
//         <Route path="/edit/:id" element={<Edit/>}/>
//         <Route path="/allusers" element={<AllUsers/>}/>
//         <Route path="/forgot" element={<ForgotPassword/>}/>
// <Route path="/forgotpin" element={<ForgotPin/>}/>
// <Route path="/setpin" element={<SetPin/>}/>
// <Route path="/panlink" element={<PanLink/>}/>
// <Route path="/creditcard" element={<CreditCard/>}/>




//       </Routes>
//     </Router>
//   );
// }
// export default BankingApp;