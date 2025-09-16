import { cookiesOptions } from "@/constants";
import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Please provide all required fields" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isMatch = user.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = user.generateJWTToken();

        const loggedInUser = await User.findById(user._id).select("-password");

        if (!loggedInUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const response = NextResponse.json(
            {
                message: "User Logged in successfully",
                user: loggedInUser,
                token,
                success: true,
            },
            { status: 200 }
        );

        response.cookies.set("token", token, cookiesOptions);

        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: "Error while logging in user" },
            { status: 500 }
        );
    }
}
