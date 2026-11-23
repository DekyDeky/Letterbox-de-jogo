import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verificarToken } from "@/lib/session";

export async function GET() {
    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (!token) {
        return NextResponse.json(
            { logado: false },
            { status: 401 }
        );
    }

    const username = await verificarToken(token);

    if (!username) {
        return NextResponse.json(
            { logado: false },
            { status: 401 }
        );
    }

    return NextResponse.json({
        logado: true,
        username
    });
}