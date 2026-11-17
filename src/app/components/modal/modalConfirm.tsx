'use client'
import { useState } from 'react';
import style from './modal.module.scss'
import input from '@/app/styles/input.module.scss'
import { Logs } from "@/types/Logs";
import { BsXSquare, BsXSquareFill } from "react-icons/bs";
import { VT323 } from 'next/font/google'

const VT = VT323({
    weight: "400",
    subsets: ['latin'],
})

interface modalProps {
    setModal : React.Dispatch<React.SetStateAction<boolean>>,
    setLogs : React.Dispatch<React.SetStateAction<Logs[]>>,
    id: number
}

export default function ModalConfirm({ setModal, setLogs, id } : modalProps){
    const [isHoveredX, setIsHoveredX] = useState(false)

    async function handleDelete() {
        const response = await fetch(`/api/logs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setLogs(prev => prev.filter(log => log.id !== id));
            setModal(false);
        } else {
            alert('Erro ao tentar remover o item.');
        }
    } 

    return(
        <div className={style.bgContainer}>  
            <div className={style.modalContainer}>
                <header className={style.modalHeader}>
                    <p className={style.title}>Confirmar Ação</p>  
                    <button className={style.xContainer}
                    onMouseEnter={() => setIsHoveredX(true)}
                    onMouseLeave={() => setIsHoveredX(false)}
                    onClick={() => setModal(false)}
                    >
                    {isHoveredX ? <BsXSquareFill/> : <BsXSquare/> }    
                    </button> 
                </header>
                <main className={style.modalMain}>
                    <h2>Tem certeza disso?</h2>
                </main>
                <footer className={style.modalFooter}>
                    <div className={style.buttons}>
                        <button className={`${VT.className} ${input.btn}`} onClick={() => setModal(false)}>Não</button>
                        <button className={`${VT.className} ${input.btn}`} onClick={() => handleDelete()}>Sim</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}
