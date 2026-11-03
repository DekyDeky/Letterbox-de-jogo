"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Logs } from "@/types/Logs";
import style from './addLog.module.scss';

export default function EditLog() {
    const [log, setLog] = useState<Logs | null>(null);
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id;

    async function loadLog() {
        const response = await fetch("/api/logs/" + id);
        const data = await response.json();
        setLog(data);
    }

    useEffect(() => {
        loadLog();
    }, [id]);

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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!log) return;

        const response = await fetch(`/api/logs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        });

        if (response.ok) {
            alert("Jogo atualizado com sucesso!");
            router.push("/");
        } else {
            alert("Erro ao atualizar o jogo.");
        }
    }

    return (
        <main className={style.addLog}>
            <h1 className={style.title}>Editar Jogo</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Jogo</label>
                        <input
                            type="text"
                            name="jogo"
                            className={style.input}
                            value={log?.jogo ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Última vez que jogou</label>
                        <input
                            type="date"
                            name="data_termino"
                            className={style.input}
                            value={log?.data_termino?.split("T")[0] ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={style.group}>
                    <label className={style.label}>Análise do Jogo</label>
                    <textarea
                        name="analise"
                        className={style.textarea}
                        value={log?.analise ?? ""}
                        onChange={handleChange}
                    />
                </div>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Nota</label>
                        <input
                            type="number"
                            name="nota"
                            className={style.input}
                            value={log?.nota ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Status do Jogo</label>
                        <select
                            name="status"
                            className={style.select}
                            value={log?.status ?? ""}
                            onChange={handleChange}
                        >
                            <option value="">...</option>
                            <option value="jogando">Jogando</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="100">100%</option>
                            <option value="desisti">Desisti</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="headerAdd">
                    Editar
                </button>
            </form>
        </main>
    );
}
