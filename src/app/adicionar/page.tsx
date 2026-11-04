"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from './addLog.module.scss'

export default function AdicionarJogo(){
    const navegacao = useRouter();
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    async function enviarFormulario(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (enviando) return;

        const dados = new FormData(evento.currentTarget);
        setEnviando(true);
        setErro("");

        try {
            const resposta = await fetch("/api/logs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jogo: dados.get("jogo"),
                    data_termino: dados.get("data_termino"),
                    analise: dados.get("analise"),
                    nota: Number(dados.get("nota")),
                    status: dados.get("status")
                })
            });

            if (!resposta.ok) {
                const resultado = await resposta.json();
                setErro(resultado.erro || "Não foi possível adicionar o jogo.");
                return;
            }

            navegacao.push("/");
            navegacao.refresh();
        } catch {
            setErro("Não foi possível enviar. Tente novamente.");
        } finally {
            setEnviando(false);
        }
    }
    return(
        <main className={style.addLog}>
            <h1 className={style.title}>Adicionar à Estante</h1>
            <form className={style.form} onSubmit={enviarFormulario}>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Jogo</label>
                        <input type='text' name='jogo' maxLength={255} required className={style.input}/>
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Última vez que jogou</label>
                        <input type='date' name='data_termino' min='1000-01-01' max='9999-12-31' required className={style.input}/>
                    </div>
                </div>
                <div className={style.group}>
                    <label className={style.label}>Análise do Jogo</label>
                    <textarea name="analise" maxLength={500} required className={style.textarea}></textarea>
                </div>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Nota</label>
                        <input type="number" name="nota" step="1" required className={style.input}/>
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Status do Jogo</label>
                        <select name="status" defaultValue="" required className={style.select}>
                            <option value="">...</option>
                            <option value="jogando">Jogando</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="100">100%</option>
                            <option value="desisti">Desisti</option>
                        </select>
                    </div>
                </div>
                {erro && <p role="alert">{erro}</p>}
                <button disabled={enviando} type="submit" className={`headerAdd`}>
                    {enviando ? "Publicando..." : "Publicar"}
                </button>
            </form>
        </main>
    )
}
