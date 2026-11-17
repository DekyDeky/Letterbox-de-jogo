import styles from './registrar.module.scss'
import input from '@/app/styles/input.module.scss'
import { VT323 } from 'next/font/google'

const VT = VT323({
    weight: "400",
    subsets: ['latin'],
})

export default function Registrar(){
    return(
        <main className={`${styles.register} ${VT.className}`}>
            <form className={styles.registerContainer}>
                <h1 className={`${styles.siteTitle}`}>ShelfBox</h1>
                <h2 className={styles.registerTitle}>Cadastrar-Se</h2>
                <div className={input.group}>
                    <label htmlFor="inputUsername" className={input.label}>Apelido</label>
                    <input type="text" name="inputUsername" className={input.input}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="inputEmail" className={input.label}>E-mail</label>
                    <input type="email" name="inputEmail" className={input.input}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="inputBirth" className={input.label}>Data de Nascimento</label>
                    <input type="date" name="inputBirth" className={input.input}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="inputPassword" className={input.label}>Senha</label>
                    <input type="password" name="inputPassword" className={input.input}/>
                </div>
                <div className={input.group}>
                    <label htmlFor="inputConfPassword" className={input.label}>Confirmar Senha</label>
                    <input type="password" name="inputConfPassword" className={input.input}/>
                </div>
                <button className={`${VT.className} ${input.btn}`}>Entrar</button>
            </form>
            <a href='/login' className={input.link}>Voltar Login</a>
        </main>
    )
}