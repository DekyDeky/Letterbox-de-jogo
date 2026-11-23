import { NextResponse } from "next/server";
import { getLogsByUserId } from "@/logRepository/logRepository";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const logId = Number(id);

        const log = await getLogsByUserId(logId);

        return NextResponse.json(log);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}