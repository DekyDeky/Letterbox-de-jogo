import { NextResponse } from "next/server";
import { PostUser } from "@/logRepository/userRepository";
import { validateEmail } from "@/utils/validation";


export async function POST(requisicao: Request) {
    try {
        const user = await requisicao.json();

        if (
            !user ||
            typeof user.username !== "string" || !user.username.trim() ||
            typeof user.birth !== "string" || !user.birth ||
            typeof user.email !== "string" || !user.email.trim() ||
            typeof user.password !== "string" || !user.password.trim() ||
            typeof user.confPassword !== "string" || !user.confPassword.trim() 
        ) {
            return NextResponse.json(
                { erro: "Preencha os campos corretamente." },
                { status: 400 }
            );
        }

        if (!validateEmail(user.email.trim())) {
            return NextResponse.json(
                { erro: "Email inválido!" },
                { status: 400 }
            );
        }

        if (
            user.password.trim() !== user.confPassword.trim()
        ){
            return NextResponse.json(
                { erro: "Senhas não conhecidem!" },
                { status: 400 }
            );
        }

        await PostUser(user);

        return NextResponse.json(
            { mensagem: "Usuário cadastrado!" },
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
