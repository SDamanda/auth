'use client'
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    async function Login (email, senha){
        const {data, error} = await Supabase.auth.signInWithPassoword({
            email,
            password,
        });
        if (error) return error.message;
        return data;

    }

    return (
        <>
            <form>
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
                    onChange={(e) => setSenha(e.target.value)}/>
                    <input type="submit" value="Enviar" />
            </div>
        </form >
        </>
    )
}