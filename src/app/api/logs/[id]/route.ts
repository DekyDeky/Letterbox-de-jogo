import { NextResponse } from "next/server";
import { getLogById } from "@/logRepository/logRepository";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }>}
) {
    try {
        const { id } = await params;
        const logId = Number(id);

        const log = await getLogById(logId);

        return NextResponse.json(log);
    }catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}