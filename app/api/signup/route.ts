import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    console.log("Step 1");

    await connectDB();

    console.log("Step 2");

    const body = await req.json();

    console.log(body);

    const { name, email, password } = body;

    console.log("Step 3");

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    console.log("Step 4");

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Step 5");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Step 6");

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (err) {
    console.log("ERROR");
    console.error(err);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}