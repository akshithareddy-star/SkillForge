import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function POST(req: NextRequest) {
  try {
    console.log("========== ENROLL API HIT ==========");

    await connectDB();
    console.log("MongoDB Connected");

    const body = await req.json();
    console.log("Request Body:", body);

    const {
      userEmail,
      courseId,
      title,
      instructor,
      duration,
      level,
    } = body;

    const alreadyEnrolled = await Enrollment.findOne({
      userEmail,
      courseId,
    });

    console.log("Already Enrolled:", alreadyEnrolled);

    if (alreadyEnrolled) {
      return NextResponse.json({
        success: false,
        message: "Already enrolled",
      });
    }

    const enrollment = await Enrollment.create({
      userEmail,
      courseId,
      title,
      instructor,
      duration,
      level,
    });

    console.log("Enrollment Saved");

    return NextResponse.json({
      success: true,
      enrollment,
    });
  } catch (err) {
    console.error("ENROLL ERROR:");
    console.error(err);

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