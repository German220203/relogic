'use client';

import "../../styles/login-style.css"
import api from "@/lib/api";
import { useState } from "react";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const response = await api.post(
            "/api/v1/auth/login",
            { username, password },
            { withCredentials: true } // ¡Importante para recibir cookies!
        );

        // localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        window.location.href = "/"; // Redirigir al inicio después del login exitoso
        } catch (err) {
        console.error("Login fallido", err);
        alert("Credenciales incorrectas");
        }
  };

    return (
        <div>
            <div className="login-div">
                
                <div>
                    <form onSubmit={handleLogin} className="form-div">
                        <h1 className="text-center text-xl">Iniciar sesión</h1>
                        <div className="form-group">
                            <p>Nombre de usuario</p>
                            <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border p-2 rounded"
                            />
                        </div>
                        <div className="form-group">
                            <p>Contraseña</p>
                            <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 rounded"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-blue-500 border border-blue-500">
                            Entrar
                        </button>
                        <div className="form-group">
                            <p>¿No tienes cuenta? Regístrate <a href="/register" className="text-blue-500">aquí</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}