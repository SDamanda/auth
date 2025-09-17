'use client';
import './globals.css';
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [numero, setNumero] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, numero })
        });
        const result = await response.json();

        if (response.ok) {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: senha,
            });
            if (error) {
                alert('Erro ao autenticar: ' + error.message);
            } else {
                window.location.href = '/privadas/comercial';
            }
        } else {
            alert(result.error || 'Erro ao cadastrar usuário');
        }
    }

    return (
        <div className="container">
            <h1>Criar conta</h1>
            <p>Preencha os dados para criar sua conta</p>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="Nome">Nome Completo</label>
                <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="senha">Senha</label>
                <input
                    type="password"
                    placeholder="******"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <label htmlFor="number">Número</label>
                <input
                    type="number"
                    placeholder="seu número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />
                <input type="submit" value="Criar Conta" />
                <div className="login-link">
                    Já tem uma conta? <a href="/publicas/login">Faça login</a>
                </div>
            </form>
        </div>
    );
}
