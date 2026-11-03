import { NextResponse } from "next/server";
import { selectAllLogs } from "@/logRepository/logRepository";

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