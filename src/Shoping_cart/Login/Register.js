// React Functional Component for Register
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "jquery/dist/jquery.min.js";

function Register() {
    // State management using useState hook
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Login, setLogin] = useState("Register");

    function submit(evt) {
        setLogin("Registering...");

        evt.preventDefault();
        let fd = new FormData();
        fd.append("name", name);
        fd.append("email", email);
        fd.append("password", password);

        axios
            .post("https://ravinder.freelogomaker.in/api/register", fd)
            .then((res) => {
                Swal.fire({
                    title: "Reactjs",
                    text: res.data.message,
                    icon: "success",
                });
                 setLogin("Register");
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    text: err.message,
                    icon: "error",
                });
            });
    }
   
    return (
        <>
            <div className="main_div">
                <div className="title">Register Form</div>
                <form onSubmit={submit}>
                    <div className="input_box">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            placeholder="Enter your full name"
                            required
                        />
                        <div className="icon">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <div className="input_box">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <div className="icon">
                            <i className="fas fa-envelope"></i>
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
                    <div className="input_box">
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            id="con-password"
                            placeholder="Enter your password"
                            required
                        />
                        <div className="icon">
                            <i className="fas fa-lock"></i>
                        </div>
                    </div>
                    <div className="input_box button">
                        <input type="submit" value={Login} />
                    </div>
                    <div className="sign_up">
                        Already have an account? <a href="/login">Login now</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;
