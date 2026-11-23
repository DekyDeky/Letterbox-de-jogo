import { NextResponse } from "next/server";
import { Login } from "@/logRepository/userRepository";

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
            passwordBD
        );

        if (!resultado) {
            return NextResponse.json(
                { erro: "Usuário ou senha incorretos." },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { mensagem: "Logado com sucesso!" },
            { status: 200 }
        );
        
    } catch (erro) {
        console.error(erro);
        return NextResponse.json(
            { erro: "Não foi possível cadastrar o jogo." },
            { status: 500 }
        );
    }
}
