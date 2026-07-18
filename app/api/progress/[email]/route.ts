import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Progress from "@/models/Progress";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    await connectDB();

    const { email } = await params;

    const progress = await Progress.find({
      userEmail: decodeURIComponent(email),
    });

    return NextResponse.json({
      success: true,
      progress,
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