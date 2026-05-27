import React, { useEffect, useState } from "react";
import { api, handleError } from "../api/api";
import Navbar from "../components/Navbar";

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
      "url('https://img.freepik.com/free-vector/credit-score-concept-illustration_114360-7286.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  content: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },

  title: { marginBottom: "20px" },

  scoreBox: {
    padding: "25px",
    borderRadius: "10px",
    background: "#f4f6f9",
    marginBottom: "20px"
  },

  score: {
    fontSize: "45px",
    fontWeight: "bold"
  },

  account: {
    marginBottom: "10px",
    color: "#555"
  },

  btn: {
    padding: "10px",
    background: "#243b55",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  status: { marginTop: "10px", fontWeight: "500" },

  loaderOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "999"
  },

  loaderImg: { width: "120px" }
};

function CibilScore() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [score, setScore] = useState(null);
  const [accountNo, setAccountNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // 🔥 API CALL
  const fetchScore = async () => {
    try {
      setLoading(true);
      setMsg("");

      const res = await api.get(`/cibilScore/${user.accountNo}`);

      // ✅ DTO fields
      setScore(res.data.cibilScore);
      setAccountNo(res.data.accountNo);

    } catch (e) {
      handleError(e);
      setMsg("❌ Unable to fetch CIBIL score");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScore();
  }, []);

  // 🎯 Score color + rating
  const getColor = () => {
    if (score >= 750) return "green";
    if (score >= 600) return "orange";
    return "red";
  };

  const getRating = () => {
    if (score >= 750) return "Excellent 🎉";
    if (score >= 600) return "Good 👍";
    return "Poor ⚠️";
  };

  return (
    <div style={styles.page}>
      <Navbar />

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

        {/* RIGHT CONTENT */}
        <div style={styles.content}>
          <h2 style={styles.title}>Your CIBIL Score</h2>

          {score !== null ? (
            <div style={styles.scoreBox}>
              <p style={styles.account}>
                Account No: <b>{accountNo}</b>
              </p>

              <div style={{ ...styles.score, color: getColor() }}>
                {score}
              </div>

              <p>{getRating()}</p>
            </div>
          ) : (
            <p>No score available</p>
          )}

          <button onClick={fetchScore} style={styles.btn}>
            Refresh Score
          </button>

          {msg && (
            <p style={{ ...styles.status, color: "red" }}>
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CibilScore;
