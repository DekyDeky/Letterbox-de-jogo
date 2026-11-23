'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import style from './header.module.scss'

export default function Header(){

    const navegacao = useRouter();
    const pathname = usePathname();

    const header: Record<string, {
        button: string,
        link: string
    }> = {
        '/': {
            button: "Adicionar à Estante",
            link: "/adicionar"
        }
    }

    const currentHeader = header[pathname] ?? {
        button: "Voltar",
        link: "/"
    }

    async function logout() {
        await fetch("/api/user/logout", {
            method: "POST"
        });

        navegacao.push("/login");
        navegacao.refresh();
    }

    return(
        <header className={style.header}>
            <h1 className={style.headerTitle}>Shelfbox API</h1>
            <div className={style.btns}>
                <Link href={currentHeader.link} className={style.headerAdd}>{currentHeader.button}</Link>
                <button onClick={logout} className={`backgroundCTV ${style.headerAdd}`}>Sair</button>
            </div>
        </header>
    )
}