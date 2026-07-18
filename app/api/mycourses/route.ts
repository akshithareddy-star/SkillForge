import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    const courses = await Enrollment.find({
      userEmail: email,
    });

    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}