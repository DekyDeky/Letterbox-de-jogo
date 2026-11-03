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