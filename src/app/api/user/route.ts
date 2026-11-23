import { NextResponse } from "next/server";
import { selectAllUsers } from "@/logRepository/userRepository";

export async function GET() {
    try {
        const users = await selectAllUsers();
        return NextResponse.json(users)
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "unhe" },
            { status: 500 }
        );
    }
}
