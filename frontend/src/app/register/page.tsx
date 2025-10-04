'use client';

import "../../styles/register-style.css";
import api from "@/lib/api";
import { useState, useEffect } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: ""
    });

    useEffect(() => {
        // Forzar blur en todos los inputs al entrar a la página
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => input.blur());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.repeatPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            await api.post("/api/v1/auth/register", formData, { withCredentials: true });
            window.location.href = "/";
        } catch (err) {
            console.error("Error en el registro", err);
            alert("Hubo un problema con el registro");
        }
    };

  // Generador de labels animados
    const makeAnimatedLabel = (text: string) =>
        text.split("").map((char, i) => (
        <span
        key={i}
        className="char"
        style={{ "--index": i } as React.CSSProperties}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));




    return (
        <div className="register-page">
            <div className="register-div">
                <form onSubmit={handleRegister} className="register-form">
                    <h1 className="text-center text-xl">Registro</h1>

                    {/* Usuario */}
                    <div className="input-box">
                        <input
                        required
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input"
                        placeholder=" "
                        />
                        <label className="label">{makeAnimatedLabel("Usuario")}</label>
                    </div>

                    {/* Nombre */}
                    <div className="input-box">
                        <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input"
                        placeholder=" "
                        />
                        <label className="label">{makeAnimatedLabel("Nombre")}</label>
                    </div>

                    {/* Primer apellido */}
                    <div className="input-box">
                        <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input"
                        placeholder=" "
                        />
                        <label className="label">{makeAnimatedLabel("Apellidos")}</label>
                    </div>

                    {/* Email */}
                    <div className="input-box">
                        <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                        placeholder=" "
                        />
                        <label className="label">{makeAnimatedLabel("Email")}</label>
                    </div>

                    {/* Teléfono */}
                    <div className="input-box">
                        <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder=" "
                        />
                        <label className="label">{makeAnimatedLabel("Teléfono")}</label>
                    </div>

                    {/* Contraseña */}
                    <div className="input-box">
                        <input
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                        placeholder=" "
                        />
                        <label className="label">{makeAnimatedLabel("Contraseña")}</label>
                    </div>

                    {/* Repetir contraseña */}
                    <div className="input-box">
                        <input
                        required
                        type="password"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        className="input"
                        placeholder=" "
                        />
                        <label className="label">{makeAnimatedLabel("Repetir Contraseña")}</label>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-blue-500 border border-blue-500"
                    >
                        Registrarse
                    </button>

                    <div className="form-group text-center">
                        <p>
                            ¿Ya tienes cuenta?{" "}
                            <a href="/login" style={{ color: "#5f8c5e" }}>
                                Inicia sesión aquí
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );

}
