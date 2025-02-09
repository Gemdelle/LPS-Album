import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../data/firebaseConfig";

// Registrar usuario
export const registerWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
    }
};

// Iniciar sesión
export const loginWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error en el login:", error);
        throw error;
    }
};

// Cerrar sesión
export const logout = async () => {
    await signOut(auth);
};
