'use client';

import "../../styles/login-style.css"
import api from "@/lib/api";
import { useState, useEffect } from "react";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Forzar blur en todos los inputs al entrar a la página
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => input.blur());
    }, []);

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
        <div className="login-page">
            <div className="login-div">
                
                <div>
                    <form onSubmit={handleLogin} className="form-div">
                        <h1 className="text-center text-xl">Iniciar sesión</h1>
                        <div className="form-group input-box">
                            <input
                                required
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input"
                                placeholder=" "
                            />
                            <label className="label">
                                <span className="char" style={{ "--index": 0, paddingLeft: "5px" } as React.CSSProperties}>U</span>
                                <span className="char" style={{ "--index": 1 } as React.CSSProperties}>s</span>
                                <span className="char" style={{ "--index": 2 } as React.CSSProperties}>u</span>
                                <span className="char" style={{ "--index": 3 } as React.CSSProperties}>a</span>
                                <span className="char" style={{ "--index": 4 } as React.CSSProperties}>r</span>
                                <span className="char" style={{ "--index": 5 } as React.CSSProperties}>i</span>
                                <span className="char" style={{ "--index": 6, paddingRight: "5px" } as React.CSSProperties}>o</span>
                            </label>
                        </div>

                        <div className="form-group input-box">
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                placeholder=" "
                            />
                            <label className="label">
                                <span className="char" style={{ "--index": 0, paddingLeft: "5px" } as React.CSSProperties}>C</span>
                                <span className="char" style={{ "--index": 1 } as React.CSSProperties}>o</span>
                                <span className="char" style={{ "--index": 2 } as React.CSSProperties}>n</span>
                                <span className="char" style={{ "--index": 3 } as React.CSSProperties}>t</span>
                                <span className="char" style={{ "--index": 4 } as React.CSSProperties}>r</span>
                                <span className="char" style={{ "--index": 5 } as React.CSSProperties}>a</span>
                                <span className="char" style={{ "--index": 6 } as React.CSSProperties}>s</span>
                                <span className="char" style={{ "--index": 7 } as React.CSSProperties}>e</span>
                                <span className="char" style={{ "--index": 8 } as React.CSSProperties}>ñ</span><span className="char" style={{ "--index": 9 } as React.CSSProperties}>a</span>

                            </label>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-blue-500 border border-blue-500">
                            Entrar
                        </button>
                        <div className="form-group text-center">
                            <p>¿No tienes cuenta? Regístrate <a href="/register" style={ {color: '#5f8c5e'} } className="">aquí</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}