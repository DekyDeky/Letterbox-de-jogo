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

    const usuario = await verificarToken(token);

    if (!usuario) {
        return NextResponse.json(
            { logado: false },
            { status: 401 }
        );
    }

    console.log(usuario)

    return NextResponse.json({
        logado: true,
        usuario : usuario
    });
}