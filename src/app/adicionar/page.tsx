import style from './addLog.module.scss'

export default function addLog(){
    return(
        <main className={style.addLog}>
            <h1 className={style.title}>Adicionar à Estante</h1>
            <form className={style.form}>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Jogo</label>
                        <input type='text' className={style.input}/>
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Última vez que jogou</label>
                        <input type='date' className={style.input}/>
                    </div>
                </div>
                <div className={style.group}>
                    <label className={style.label}>Análise do Jogo</label>
                    <textarea className={style.textarea}></textarea>
                </div>
                <div className={style.line}>
                    <div className={style.group}>
                        <label className={style.label}>Nota</label>
                        <input type="number" className={style.input}/>
                    </div>
                    <div className={style.group}>
                        <label className={style.label}>Status do Jogo</label>
                        <select className={style.select}>
                            <option>...</option>
                            <option value="jogando">Jogando</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="100">100%</option>
                            <option value="desisti">Desisti</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className={`headerAdd`}>
                    Publicar
                </button>
            </form>
        </main>
    )
}