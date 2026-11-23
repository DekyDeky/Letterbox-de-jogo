'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './registrar.module.scss'
import input from '@/app/styles/input.module.scss'
import { VT323 } from 'next/font/google'

const VT = VT323({
    weight: "400",
    subsets: ['latin'],
})

export default function Registrar(){
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
            const resposta = await fetch("/api/user/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: dados.get("username"),
                    email: dados.get("email"),
                    birth: dados.get("birth"),
                    password: dados.get("password"),
                    confPassword: dados.get("confPassword")
                })
            });

            if (!resposta.ok) {
                const resultado = await resposta.json();
                setErro(resultado.erro || "Não foi possível cadastrar o usuário.");
                return;
            }

            navegacao.push("/login");
            navegacao.refresh();
        } catch {
            setErro("Não foi possível enviar. Tente novamente.");
        } finally {
            setEnviando(false);
        }
    }

    
    return(
        <main className={`${styles.register} ${VT.className}`}>
            <form className={styles.registerContainer} onSubmit={enviarFormulario}>
                <h1 className={`${styles.siteTitle}`}>ShelfBox</h1>
                <h2 className={styles.registerTitle}>Cadastrar-Se</h2>
                <div className={input.group}>
                    <label htmlFor="username" className={input.label}>Apelido</label>
                    <input type="text" name="username" className={`${VT.className} ${input.input}`}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="email" className={input.label}>E-mail</label>
                    <input type="email" name="email" className={`${VT.className} ${input.input}`}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="birth" className={input.label}>Data de Nascimento</label>
                    <input type="date" name="birth" className={`${VT.className} ${input.input}`}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="password" className={input.label}>Senha</label>
                    <input type="password" name="password" className={`${VT.className} ${input.input}`}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="confPassword" className={input.label}>Confirmar Senha</label>
                    <input type="password" name="confPassword" className={`${VT.className} ${input.input}`}/>
                </div>
                <button className={`${VT.className} ${input.btn}`}>
                    {enviando ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
            <a href='/login' className={input.link}>Voltar Login</a>
        </main>
    )
}