import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { fullName, email, password } = await request.json();

        console.log(request);

        if (!fullName || !email || !password) {
            return NextResponse.json(
                { error: "Please provide all required fields" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        const newUser = new User({ fullName, email, password });

        const user = await newUser.save();

        if (!user) {
            return NextResponse.json(
                { error: "Error while registering user" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "User registered successfully",
                user,
                success: true,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: "Error while registering user" },
            { status: 500 }
        );
    }
}
