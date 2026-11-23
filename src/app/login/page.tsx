'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './login.module.scss'
import { VT323 } from 'next/font/google'
import input from '@/app/styles/input.module.scss'

const VT = VT323({
    weight: "400",
    subsets: ['latin'],
})

export default function Login(){
    const navegacao = useRouter();
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    async function enviarFormulario(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (enviando) return;

        const dados = new FormData(event.currentTarget);
        setEnviando(true);
        setErro("");

        try {
            const resposta = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: dados.get("username"),
                    password: dados.get("password")
                })
            });

            if (!resposta.ok) {
                const resultado = await resposta.json();
                setErro(resultado.erro || "Não foi possível entrar.");
                return;
            }

            navegacao.push("/");
            navegacao.refresh();
        } catch {
            setErro("Não foi possível enviar. Tente novamente.");
        } finally {
            setEnviando(false);
        }
    }

    return(
        <main className={`${styles.login} ${VT.className}`}>
            <form className={styles.loginContainer} onSubmit={enviarFormulario}>
                <h1 className={`${styles.siteTitle}`}>ShelfBox</h1>
                <h2 className={styles.loginTitle}>Login</h2>
                <div className={input.group}>
                    <label htmlFor="inputUsername" className={input.label}>Apelido</label>
                    <input type="text" name="username" className={`${VT.className} ${input.input}`}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="inputPassword" className={input.label}>Senha</label>
                    <input type="password" name="password" className={`${VT.className} ${input.input}`}/>
                </div>
                <button className={`${VT.className} ${input.btn}`}>Entrar</button>
            </form>
            <a href='/cadastrar' className={input.link}>Criar uma conta</a>
        </main>
    )
}