import React, { useState } from "react";
import "./AnimatedLoginRegister.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

export default function AnimatedLoginRegister() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="wrapper">
      <span className="bg-animate"></span>
      <span className="bg-animate2"></span>

      {isLogin ? (
        <div className="form-box login">
          <h1>Login</h1>
          <form>
            <div className="input-box">
              <input type="text" required />
              <label>Username</label>
              <FaUser />
            </div>
            <div className="input-box">
              <input type="password" required />
              <label>Password</label>
              <FaLock />
            </div>
            <div className="remember-forgot">
              <label><input type="checkbox" />Remember me</label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn">Login</button>
            <div className="logreg-link">
              <p>Don't have an account? <a onClick={() => setIsLogin(false)}>Sign Up</a></p>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-box register">
          <h1>Sign Up</h1>
          <form>
            <div className="input-box">
              <input type="text" required />
              <label>Username</label>
              <FaUser />
            </div>
            <div className="input-box">
              <input type="email" required />
              <label>Email</label>
              <FaEnvelope />
            </div>
            <div className="input-box">
              <input type="password" required />
              <label>Password</label>
              <FaLock />
            </div>
            <button type="submit" className="btn">Sign Up</button>
            <div className="logreg-link">
              <p>Already have an account? <a onClick={() => setIsLogin(true)}>Login</a></p>
            </div>
          </form>
        </div>
      )}

      <div className={`info ${isLogin ? "login" : "register"}`}>
        <h1>BIENVENUE !</h1>
        <p>Gérez vos SIM avec Tunisie Telecom facilement et efficacement.</p>
      </div>
    </div>
  );
}





