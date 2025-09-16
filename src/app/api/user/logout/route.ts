import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json(
        { message: "User logged out successfully", success: true },
        { status: 200 }
    );
    response.cookies.delete("token");
    return response;
}
