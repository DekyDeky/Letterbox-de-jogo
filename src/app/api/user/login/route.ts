import { NextResponse } from "next/server";
import { Login } from "@/logRepository/userRepository";
import { criarToken } from "@/lib/session";

const bcrypt = require('bcrypt');

export async function POST(
    requisicao: Request,
) {
    
    try {
        const user = await requisicao.json();

        if (
            !user ||
            typeof user.username !== "string" || !user.username.trim() ||
            typeof user.password !== "string" || !user.password.trim()
        ) {
            return NextResponse.json(
                { erro: "Preencha os campos corretamente." },
                { status: 400 }
            );
        }

        const passwordBD = await Login(user.username);

        if (!passwordBD) {
            return NextResponse.json(
                { erro: "Usuário ou senha incorretos." },
                { status: 401 }
            );
        }

        const resultado = await bcrypt.compare(
            user.password,
            passwordBD.password
        );

        if (!resultado) {
            return NextResponse.json(
                { erro: "Usuário ou senha incorretos." },
                { status: 401 }
            );
        }

        console.log(passwordBD)

        const token = await criarToken(passwordBD.id_user, passwordBD.username);

        const resposta = NextResponse.json(
            { mensagem: "Logado com sucesso!" },
            { status: 200 }
        );

        resposta.cookies.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return resposta;
        
    } catch (erro) {
        console.error(erro);
        return NextResponse.json(
            { erro: "Não foi possível cadastrar o jogo." },
            { status: 500 }
        );
    }
}
