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
    );

    const logs = row as Logs[];

    return logs[0] ?? null;
}

export async function deleteLog(id: number): Promise<void> {
    await db.query(
        "DELETE FROM log WHERE log_id = ?",
        [id]
    );
}

export async function updateLog(id: number, data: Partial<Logs>): Promise<void> {
    await db.query(
        "UPDATE log SET jogo = ?, data_termino = ?, analise = ?, nota = ?, status = ? WHERE log_id = ?",
        [
            data.jogo,
            data.data_termino ? data.data_termino.split("T")[0] : null,
            data.analise,
            Number(data.nota),
            data.status,
            id
        ]
    );
}
