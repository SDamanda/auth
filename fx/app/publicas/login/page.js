'use client'
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
        const { data, error } = await supabase.auth.signInWithPassword({
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
        <>
            <form onSubmit={handleLogin}>
                <div style={{ display: "grid" }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="email.."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        placeholder="senha.."
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} />
                    <input type="submit" value="Enviar" />
                </div>
            </form>
        </>
    );
}