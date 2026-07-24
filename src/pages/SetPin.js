import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function SetPin() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [pin, setPin] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 SEND OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      setMsg("");
      setError("");

      await axios.post(
        "https://devbank-backend-production.up.railway.app/api/fetch/sendOtp",
        {
          mail: user.mail,
          accountHolder: user.accountHolder
        }
      );

      setOtpSent(true);
      setMsg("OTP sent to your email");

    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SET PIN WITH OTP
  const handleSetPin = async () => {

    setMsg("");
    setError("");

    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    if (!otp) {
      setError("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.put(
        "https://devbank-backend-production.up.railway.app/api/pinSetWithOtp",
        {
          accountNo: user.accountNo,
          mail: user.mail,
          otp: otp,
          pinNo: pin
        }
      );

      setMsg(res.data);

    } catch (err) {

      if (err.response && err.response.data) {

        if (typeof err.response.data === "object") {
          setError(err.response.data.message);
        } else {
          setError(err.response.data);
        }

      } else {
        setError("Server error");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <Navbar />

      {/* 🔄 LOADER */}
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

          <h2 style={{ marginBottom: "20px" }}>Set Your PIN</h2>

          {/* SUCCESS */}
          {msg && (
            <div style={styles.successBox}>
              {msg}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          {/* ACCOUNT INFO */}
          <p style={styles.account}>
            Account No: <b>{user?.accountNo}</b>
          </p>

          {/* 🔥 SEND OTP BUTTON */}
          {!otpSent && (
            <button onClick={sendOtp} style={styles.primaryBtn}>
              Send OTP
            </button>
          )}

          {/* OTP INPUT */}
          {otpSent && (
            <>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.input}
              />

              <input
                type="password"
                placeholder="Enter 4 Digit PIN"
                value={pin}
                maxLength={4}
                onChange={(e) => setPin(e.target.value)}
                style={styles.input}
              />

              <button
                onClick={handleSetPin}
                style={styles.primaryBtn}
              >
                Set PIN
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default SetPin;

//////////////////////////////////////////////////////

const styles = {

  
page:{
height:"100vh",
background:"linear-gradient(135deg,#ff7e00,#ffb347)",
overflow:"hidden"
},
  container: {
    display: "flex",
    maxWidth: "1100px",
    margin: "40px auto",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
  },

  image: {
    flex: 1,
    backgroundImage:
      "url('https://img.freepik.com/free-vector/mobile-password-concept-illustration_114360-5180.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  form: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  account: {
    marginBottom: "10px",
    color: "#555"
  },

  input: {
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },

  primaryBtn: {
    padding: "10px",
    background: "#ff7e00",
    color: "#fff",
    border: "none",
    outline: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px"
  },

  successBox: {
    padding: "10px",
    marginBottom: "10px",
    background: "#d4edda",
    color: "#155724",
    borderRadius: "5px",
    textAlign: "center"
  },

  errorBox: {
    padding: "10px",
    marginBottom: "10px",
    background: "#ffdede",
    color: "#c62828",
    borderRadius: "5px",
    textAlign: "center"
  },

  loaderOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "999"
  },

  loader: {
    width: "60px",
    height: "60px",
    border: "6px solid #eee",
    borderTop: "6px solid #ff7e00",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }

};
