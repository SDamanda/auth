'use client'
import { POST } from "@/app/api/usuarios/router"
import { useState } from "react"

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [numero, setNumero] = useState('')

    async function handleSubmit(event) {
        event.preventDefaunt()

        const Response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, numero }),
        })
        if(response.ok){
            alert('cadastro realizado com sucesso')
            window.location.href = '/privadas/comercial'
        } else {
            const error = await response.json();
            alert('erro');
        }
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