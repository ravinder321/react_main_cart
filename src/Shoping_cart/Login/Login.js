import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import '../css/login.css';
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';  // Import GoogleLogin
import FacebookLogin from "react-facebook-login"; // Import FacebookLogin

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const submit = (evt) => {
    evt.preventDefault();

    const loginData = { email, password };


    axios.post('http://localhost/laravel-shoping-cart/public/api/login', loginData, { withCredentials: true })
    .then((res) => {
        if (res.data.success) {
          setLogin(true);
          localStorage.setItem("token", "access");
        } else {
          Swal.fire({
            title: "Login Failed",
            text: res.data.user,
            icon: "error",
          }).then(() => {
            window.location.href = "/login";
          });
        }
      });
  };
  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
console.log(token)
    try {
      const res = await axios.post(
        "http://localhost:8000/api/google/callback",
        { token },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setLogin(true);
        localStorage.setItem("token", res.data.token);
      } else {
        Swal.fire({
          title: "Login Failed",
          text: res.data.message || "Google login failed.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

    const handleFacebookSuccess = () => {
      window.FB.login(
        function (response) {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            axios.post("http://localhost:8000/api/facebook/token", { token: accessToken })
              .then((res) => {
                if (res.data.success) {
                  setLogin(true);
                  localStorage.setItem("token", res.data.token); // Save the token
                  navigate("/"); // Redirect to home page
                } else {
                  Swal.fire({
                    title: "Facebook Login Failed",
                    text: res.data.message,
                    icon: "error",
                  });
                }
              })
              .catch((error) => {
                console.error("Facebook Login Error:", error);
              });
          } else {
            Swal.fire({
              title: "Login Cancelled",
              text: "You cancelled the Facebook login process.",
              icon: "error",
            });
          }
        },
        { scope: "email" }
      );
    };

  if (login) {
    navigate("/");
  }
  return (
    <>
      <div className="main_div">
        <div className="title">Login Form</div>
        <form onSubmit={submit}>
          <div className="input_box">
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
              required
            />
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="input_box">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              required
            />
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
          </div>
          <div className="option_div">
            <div className="check_box">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="forget_div">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div className="input_box button">
            <input type="submit" value="Login" />
          </div>
          <div className="sign_up">
            Not a member? <a href="/register">Signup now</a>
          </div>
        </form>
        {/* Google Login Button */}
        <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => Swal.fire("Google login failed")}
            />
      </div>
        <FacebookLogin
              appId="566760639149464" // Replace with your Facebook App ID
              fields="name,email,picture"
              callback={handleFacebookSuccess}
              onFailure={() =>
                Swal.fire("Facebook Login Failed", "Try again later", "error")
              }
              cssClass="facebook-login-button"
              textButton="Continue with Facebook"
            />
    </>
  );
};

export default Login;