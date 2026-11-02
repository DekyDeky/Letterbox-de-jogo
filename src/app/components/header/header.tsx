'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from './header.module.scss'

export default function Header(){

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

    return(
        <header className={style.header}>
            <h1 className={style.headerTitle}>Shelfbox API</h1>
            <Link href={currentHeader.link} className={style.headerAdd}>{currentHeader.button}</Link>
        </header>
    )
}