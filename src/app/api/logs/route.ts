import { NextResponse } from "next/server";
import { selectAllLogs, deleteLog, cadastrarJogo } from "@/logRepository/logRepository";

export async function GET() {
    try {
        const logs = await selectAllLogs();
        return NextResponse.json(logs)
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "unhe" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const idParam = searchParams.get("id");

        if (!idParam) {
            return NextResponse.json(
                { error: "ID não fornecido" },
                { status: 400 }
            );
        }

        const id = Number(idParam);
        await deleteLog(id);

        return NextResponse.json(
            { message: "Deletado com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao deletar" },
            { status: 500 }
        );
    }
}
export async function POST(requisicao: Request) {
    try {
        const jogo = await requisicao.json();

        if (
            !jogo ||
            typeof jogo.jogo !== "string" || !jogo.jogo.trim() ||
            typeof jogo.analise !== "string" || !jogo.analise.trim() ||
            typeof jogo.data_termino !== "string" || !jogo.data_termino ||
            !Number.isInteger(jogo.nota) ||
            !["jogando", "finalizado", "100", "desisti"].includes(jogo.status)
        ) {
            return NextResponse.json(
                { erro: "Preencha os campos corretamente." },
                { status: 400 }
            );
        }

        await cadastrarJogo(jogo);
        return NextResponse.json(
            { mensagem: "Jogo cadastrado!" },
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
