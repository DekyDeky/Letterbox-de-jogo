"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Logs } from "@/types/Logs";
import style from './addLog.module.scss'

export default function addLog(){
    const [log, setLog] = useState<Logs | null>(null);
    const params = useParams<{ id: string }>();
    const id = params.id;

    async function loadLog(){
        const response = await fetch("/api/logs/" + id);
        const data = await response.json();
        console.log(data)

        setLog(data);
    }

    useEffect(() => {
        loadLog();
        console.log(log);
    }, []);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setLog(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                [name]: value
            };
        });
    }

    return(
        <main className={style.addLog}>
            <h1 className={style.title}>Editar Jogo</h1>
            <form className={style.form}>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Jogo</label>
                        <input type='text' className={style.input} value={log?.jogo ?? ""} onChange={handleChange}/>
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Última vez que jogou</label>
                        <input type='date' className={style.input} 
                        value={log?.data_termino?.split("T")[0] ?? ""}
                    onChange={handleChange}
                    />
                    </div>
                </div>
                <div className={style.group}>
                    <label className={style.label}>Análise do Jogo</label>
                    <textarea className={style.textarea} value={log?.analise ?? ""} onChange={handleChange}></textarea>
                </div>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Nota</label>
                        <input type="number" className={style.input} value={log?.nota ?? ""} onChange={handleChange}/>
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Status do Jogo</label>
                        <select className={style.select} value={log?.status ?? ""} onChange={handleChange}>
                            <option>...</option>
                            <option value="jogando">Jogando</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="100">100%</option>
                            <option value="desisti">Desisti</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className={`headerAdd`}>
                    Editar
                </button>
            </form>
        </main>
    )
}