import { NextResponse } from "next/server";
import { getLogById, updateLog, deleteLog } from "@/logRepository/logRepository";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const logId = Number(id);

        const log = await getLogById(logId);

        return NextResponse.json(log);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const logId = Number(id);
        const body = await request.json();

        await updateLog(logId, body);

        return NextResponse.json(
            { message: "Atualizado com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Erro ao atualizar" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "ID não fornecido" },
                { status: 400 }
            );
        }

        const logId = Number(id);

        await deleteLog(logId);

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
