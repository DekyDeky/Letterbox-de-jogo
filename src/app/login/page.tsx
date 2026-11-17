'use client';
import styles from './login.module.scss'
import { VT323 } from 'next/font/google'
import input from '@/app/styles/input.module.scss'

const VT = VT323({
    weight: "400",
    subsets: ['latin'],
})

export default function Login(){
    return(
        <main className={`${styles.login} ${VT.className}`}>
            <form className={styles.loginContainer}>
                <h1 className={`${styles.siteTitle}`}>ShelfBox</h1>
                <h2 className={styles.loginTitle}>Login</h2>
                <div className={input.group}>
                    <label htmlFor="inputUsername" className={input.label}>Apelido</label>
                    <input type="text" name="inputUsername" className={input.input}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="inputPassword" className={input.label}>Senha</label>
                    <input type="text" name="inputPassword" className={input.input}/>
                </div>
                <button className={`${VT.className} ${input.btn}`}>Entrar</button>
            </form>
            <a href='/cadastrar' className={input.link}>Criar uma conta</a>
        </main>
    )
}