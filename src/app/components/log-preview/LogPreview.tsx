'use client'
import Link from 'next/link'
import { useState } from 'react';
import { Logs } from "@/types/Logs";
import styles from './LogPreview.module.scss';
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import ModalConfirm from '../modal/modalConfirm';

interface LogPreviewProps {
    log: Logs;
    setLogs: React.Dispatch<React.SetStateAction<Logs[]>>
}

export default function LogPreview({log, setLogs}: LogPreviewProps){
    const [openDelete, setOpenDelete] = useState(false);

    return(
        <div className={styles.log} key={log.id}>
            <div className={styles.logHeader}>
                <h1 className={styles.logGame}>{log.jogo}</h1>
                <h4>{log.nota} / 10</h4>
            </div>
            <div className={styles.logContainer}>
                <div className={styles.logStats}>
                <div>
                    <h3>Última vez Jogado</h3>
                    <h4>{log?.data_termino
                    ? new Date(log.ultima_vez).toLocaleDateString("pt-BR")
                    : ""}
                    </h4>
                </div>
                <div>
                    <h3>Status</h3>
                    <h4>{log.status}</h4>
                </div>
                </div>
                <p className={styles.logReview}>{log.analise}</p>
            </div>
            <div className={styles.logButtons}>
                <Link href={"/editar/" + log.id} className={styles.btn} aria-label="Editar jogo"><BsFillPencilFill /></Link>
                {/*<Link href={"/deletar/" + log.id} className={styles.btn} aria-label="Excluir jogo"><BsFillTrash3Fill/></Link>*/}
                <button onClick={() => {setOpenDelete(true)}} className={styles.btn} aria-label="Excluir jogo"><BsFillTrash3Fill/></button>
            </div>
            {openDelete && <ModalConfirm setModal={setOpenDelete} setLogs={setLogs} id={log?.id}/>}
        </div>
    )
}