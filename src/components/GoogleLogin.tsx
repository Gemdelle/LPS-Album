import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../data/firebaseConfig";
const GoogleLogin = () => {

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div onClick={signInWithGoogle}>Google Login</div>
        </div>
    );
};

export default GoogleLogin;