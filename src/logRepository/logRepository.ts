import db from '@/lib/db';
import { Logs } from '@/types/Logs';

export async function selectAllLogs(): Promise<Logs[]> {
    const [rows] = await db.query(
        "SELECT * FROM log ORDER BY log_id DESC"
    );

    return rows as Logs[];
}

export async function getLogById(id: number): Promise<Logs | null> {
    const [row] = await db.query(
        "SELECT * FROM log WHERE log_id = ?",
        [id]
    )

    const logs = row as Logs[]

    return logs[0] ?? null;
}
export async function cadastrarJogo(jogo: Omit<Logs, "id">) {
    await db.query(
        "INSERT INTO log (jogo, data_termino, analise, nota, status) VALUES (?, ?, ?, ?, ?)",
        [jogo.jogo, jogo.data_termino, jogo.analise, jogo.nota, jogo.status]
    );
}
