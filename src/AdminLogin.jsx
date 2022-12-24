import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AdminHomePage from "./AdminHomePage";
import "./admin.css";
export default function AdminLogin({ products, setAdmin, admin, setProducts }) {
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });
  const [failed, setFailed] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      console.log(userLog);
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/users/login`,
        userLog
      );
      window.localStorage.setItem("profile", JSON.stringify(result.data));
      window.localStorage.setItem("token", result.data.token);
      setUser(result.data);
      setAdmin(result.data);
      //   history.push("/admin");
    } catch (error) {
      console.log(error);
      setFailed("תנסה שוב");
    }
  };
  console.log(user);

  return (
    <>
      <div></div>
      {!user ? (
        <div className="Auth">
          <h1>כניסה לחשבון</h1>
          <div>
            <div>email</div>
            <input
              style={{ width: "30%", minWidth: "220px" }}
              type="text"
              onChange={(e) =>
                setUserLog({ ...userLog, email: e.target.value })
              }
            />
          </div>
          <div style={{ margin: "30px auto" }}>
            <div>password</div>
            <input
              style={{ width: "30%", minWidth: "220px" }}
              type="password"
              onChange={(e) =>
                setUserLog({ ...userLog, password: e.target.value })
              }
            />
          </div>
          <button style={{ width: "150px" }} onClick={handleLogIn}>
            submit
          </button>
          {failed ? (
            <div style={{ color: "red", fontWeight: "bold" }}>{failed}</div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <AdminHomePage products={products} setProducts={setProducts} />
      )}
    </>
  );
}
