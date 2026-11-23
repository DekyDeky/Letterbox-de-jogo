import db from '@/lib/db';
import { User } from '@/types/Users';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function selectAllUsers(): Promise<User[]> {
    const [rows] = await db.query(
        "SELECT id_user AS id, username, birth, email FROM users ORDER BY id_user DESC"
    );

    return rows as User[];
}

export async function selectUserById(id: number): Promise<User | null> {
    const [row] = await db.query(
        "SELECT id_user AS id, username, birth, email FROM users WHERE id_user = ?",
        [id]
    );

    const logs = row as User[];

    return logs[0] ?? null;
}

export async function deleteUser(id: number): Promise<void> {
    await db.query(
        "DELETE FROM users WHERE id_user = ?",
        [id]
    );
}

export async function updateUser(id: number, data: Partial<User>): Promise<void> {
    await db.query(
        "UPDATE user SET username = ?, birth = ?, email = ? WHERE id_user = ?",
        [
            data.username,
            data.birth ? data.birth.split("T")[0] : null,
            data.email,
            id
        ]
    );
}

export async function updateUserPassword(id: number, data: Partial<User>): Promise<void> {
    await db.query(
        "UPDATE user SET password = ? WHERE id_user = ?",
        [
            data.password,
            id
        ]
    );
}


export async function PostUser(user: Omit<User, "id">){

    const newPassword = await bcrypt.hash(user.password, saltRounds);

    await db.query(
        "INSERT INTO users (username, birth, email, password) VALUES (?, ?, ?, ?)",
        [user.username, user.birth, user.email, newPassword]
    );
}

export async function Login(username: string) {
    const [rows] = await db.query(
        "SELECT id_user, username, password FROM users WHERE username = ?",
        [username]
    );

    const row = (rows as {
        id_user: number;
        username: string;
        password: string;
    }[])[0];

    return row ?? null;
}