'use client'
import './globals.css'
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleLogin(event) {
        event.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: senha,
        });
        if (error) {
            alert(error.message);
        } else {
            alert('Login realizado com sucesso!');
            window.location.href = '/privadas/comercial';
        }
    }

    return (
        <div className="container">
            <h1>Entrar</h1>
            <p>Digite suas credencias para acessar sua conta</p>
            <form onSubmit={handleLogin} autoComplete="off">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    placeholder="******"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <input type="submit" value="Entrar" />
                <div className="login-link">
                    Não tem uma conta? <a href="/publicas/cadastro">Cadastre-se</a>
                </div>
            </form>
        </div>
    );
}
