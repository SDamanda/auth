'use client'
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [numero, setNumero] = useState('')

    const supabase = createClient(
        process.env.,NEXT_PUBLIC_SUPABASE_URL
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
    async function signUp (nome, email, senha, numero){
        const {data, error} = await supabase.auth.signUp({
            email, senha, nome, numero
        });
        if (error ) return error.message;
        return data;
    }


    return (
        <>
            <form>
                <div style={{ display: "grid" }}>
                    <label htmlFor="Nome">Nome:</label>
                    <input
                        type="name"
                        placeholder="name"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        placeholder="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} />

                    <label htmlFor="number">Número:</label>
                    <input
                        type="number"
                        placeholder="numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)} />
                        <input type="submit" value='Enviar' />
                </div>
            </form>
        </>
    )
}