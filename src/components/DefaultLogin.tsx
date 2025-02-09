import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../data/firebaseConfig";
import {loginWithEmail} from "../services/authService";

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
}

const DefaultLogin: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginWithEmail(email, password);
            alert("Inicio de sesión exitoso");
            onClose(); // Cerrar modal al iniciar sesión
        } catch (error) {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Iniciar Sesión</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Ingresar
                    </button>
                </form>
                <button className="mt-4 text-gray-500" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default DefaultLogin;