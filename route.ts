import { NextResponse } from "next/server";
import { selectAllLogs, deleteLog } from "@/logRepository/logRepository";

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