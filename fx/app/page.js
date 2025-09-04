"use client"
import Link from "next/link";

export default function HomePage(){

    return(
      <>
      <Link href="/publicas/cadastro">signup</Link>
      <Link href="/publicas/login"></Link>
      </>
    );
}