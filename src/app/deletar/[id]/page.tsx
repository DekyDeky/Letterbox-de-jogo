"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Logs } from "@/types/Logs";
import style from './addLog.module.scss'

export default function EditOrDeleteLog() {
    const [log, setLog] = useState<Logs | null>(null);
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id;

    async function loadLog(){
        const response = await fetch("/api/logs/" + id);
        const data = await response.json();
        console.log(data);

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

    // Função de deletar utilizando exatamente o ID da rota dinâmica
    async function handleDelete() {
        if (!confirm("Tem certeza que deseja excluir este registro?")) return;

        const response = await fetch(`/api/logs?id=${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Item removido com sucesso!');
            router.push('/'); // Redireciona para a página principal após deletar
        } else {
            alert('Erro ao tentar remover o item.');
        }
    }

    return(
        <main className={style.addLog}>
            <h1 className={style.title}>Gerenciar Jogo</h1>
            <form className={style.form} onSubmit={(e) => e.preventDefault()}>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Jogo</label>
                        <input type='text' name="jogo" className={style.input} value={log?.jogo ?? ""} onChange={handleChange}/>
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Última vez que jogou</label>
                        <input type='date' name="data_termino" className={style.input} 
                        value={log?.data_termino?.split("T")[0] ?? ""}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={style.group}>
                    <label className={style.label}>Análise do Jogo</label>
                    <textarea name="analise" className={style.textarea} value={log?.analise ?? ""} onChange={handleChange}></textarea>
                </div>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Nota</label>
                        <input type="number" name="nota" className={style.input} value={log?.nota ?? ""} onChange={handleChange}/>
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Status do Jogo</label>
                        <select name="status" className={style.select} value={log?.status ?? ""} onChange={handleChange}>
                            <option>...</option>
                            <option value="jogando">Jogando</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="100">100%</option>
                            <option value="desisti">Desisti</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <button 
                        type="button" 
                        onClick={handleDelete}
                        style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '.5rem 2rem', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Deletar
                    </button>
                    
                    <button type="submit" className={`headerAdd`}>
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </main>
    )
}