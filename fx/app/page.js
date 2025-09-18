"use client"
import "./globals.css";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()

  return (
    <>
      <main>
        <h1>Bem-vindo</h1>
        <p>escolha uma opção para continuar</p>
        <button className="login" onClick={() => router.push("/publicas/login")}>Entrar</button>
        <button className="cadastro" onClick={() => router.push("/publicas/cadastro")}>Criar conta</button>
      </main >
    </>
  );
}
