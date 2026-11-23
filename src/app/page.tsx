'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import styles from './home.module.scss';
import { Logs } from "@/types/Logs";
import LogPreview from './components/log-preview/LogPreview';
import ModalConfirm from './components/modal/modalConfirm';

export default function Home() {
  const navegacao = useRouter()
  const [usuario, setUsuario] = useState<string | null>(null);
  const [logs, setLogs] = useState<Logs[]>([]);


  async function loadLogs(){
    const response = await fetch("/api/logs");
    const data = await response.json();

    console.log(data);

    setLogs(data);
  }

  useEffect(() => {
    async function verificarLogin() {
        const resposta = await fetch("/api/user/me");

        if (!resposta.ok) {
            navegacao.push("/login");
            navegacao.refresh();
            return;
        }

        const dados = await resposta.json();

        setUsuario(dados.username);
    }

    verificarLogin();
    loadLogs();
  }, []);

  return (
    <main className={styles.main}>
      {
        logs.map((log) => (
          <LogPreview log={log} setLogs={setLogs} key={log.id}/>
        )
      )}
    </main>
  );
}
