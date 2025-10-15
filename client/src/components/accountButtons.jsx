import React, { useState } from 'react';

export default function AccountButtons() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async () => {
        const res = await fetch("http://localhost:5173/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        setMessage(data.message);
    };


    const handleLogin = async () => {
        const res = await fetch("http://localhost:5173/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        setMessage(data.message);
    };


    return (
        <div style={{ padding: "40px", maxWidth: "400px" }}>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />

            <button onClick={handleSignup} style={{ marginRight: "10px" }}>
                Create Account
            </button>
            <button onClick={handleLogin}>Login</button>

            <p>{message}</p>
        </div>
    )

}