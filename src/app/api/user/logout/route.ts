import { NextResponse } from "next/server";

export async function POST() {

    const resposta = NextResponse.json({
        mensagem: "Logout realizado."
    });

    resposta.cookies.delete("session");

    return resposta;
}