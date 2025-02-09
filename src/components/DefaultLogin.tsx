import { useState } from "react";
import { loginWithEmail } from "../services/authService";
import {useAuth} from "../services/useAuth";

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
}

const DefaultLogin: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null; // No renderizar si no está abierto
    const handleLogin = async (e: React.FormEvent) => {
        try {
            await loginWithEmail(email, password); // Login and set the user state
            setError("");  // Clear any previous error
        } catch (error) {
            setError("Login failed. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            {/* Modal */}
            <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative animate-fade-in">
                {/* Botón Cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>

                {/* Título */}
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                    Iniciar Sesión
                </h2>

                {/* Mostrar error */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/* Formulario */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DefaultLogin;