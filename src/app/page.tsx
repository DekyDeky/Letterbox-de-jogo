'use client';

import Link from 'next/link'
import { useEffect, useState } from "react";
import styles from './home.module.scss';
import { Logs } from "@/types/Logs";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";

export default function Home() {
  const [logs, setLogs] = useState<Logs[]>([]);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: "long",
    day: 'numeric'
  };


  async function loadLogs(){
    const response = await fetch("/api/logs");
    const data = await response.json();

    console.log(data);

    setLogs(data);
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <main className={styles.main}>
      {
        logs.map((log) => (
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
                    ? new Date(log.data_termino).toLocaleDateString("pt-BR")
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
              <Link href={"/deletar/" + log.id} className={styles.btn} aria-label="Excluir jogo"><BsFillTrash3Fill/></Link>
            </div>
          </div>
        )
      )}
    </main>
  );
}
