import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = () => {
    const responseGoogle = (response) => {
        if (response.error) {
            console.error('Google login error', response.error);
        } else {
            // Send the Google token to your backend
            fetch('https://ravinder.freelogomaker.in/api/auth/google/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: response.tokenId }), // Send the token to backend
            })
            .then((res) => res.json())
            .then((data) => {
                console.log('Login success', data);
                // Handle user data (e.g., save to localStorage or session)
            })
            .catch((err) => {
                console.error('Error sending token to backend', err);
            });
        }
    };

    return (
        <div>
            <GoogleLogin
                clientId="901398140959-1ks4l2irqmlrf7e4aglusjeeg4cn3o5k.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleAuth;
