import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = () => {
    const responseGoogle = (response) => {
        if (response.error) {
            console.error('Google login error', response.error);
        } else {
            // Send the Google token to your backend
            fetch('http://your-backend-url/api/google/callback', {
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
                clientId="901398140959-f1kv4mp23fal0rekpbl0hcsja1q0k7bs.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleAuth;
