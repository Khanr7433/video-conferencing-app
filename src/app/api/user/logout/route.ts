import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "No token found", success: false },
            { status: 401 }
        );
    }

    const response = NextResponse.json(
        { message: "User logged out successfully", success: true },
        { status: 200 }
    );
    response.cookies.delete("token");
    return response;
}
