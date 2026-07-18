import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Progress from "../../../models/Progress";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      userEmail,
      courseId,
      completed,
      progress,
      completedLessons,
      totalLessons,
    } = body;

    let existingProgress = await Progress.findOne({
      userEmail,
      courseId,
    });

    if (existingProgress) {
      existingProgress.completed = completed;
      existingProgress.progress = progress;
      existingProgress.completedLessons = completedLessons;
      existingProgress.totalLessons = totalLessons;

      await existingProgress.save();

      return NextResponse.json({
        success: true,
        message: "Progress Updated",
        progress: existingProgress,
      });
    }

    const newProgress = await Progress.create({
      userEmail,
      courseId,
      completed,
      progress,
      completedLessons,
      totalLessons,
    });

    return NextResponse.json({
      success: true,
      message: "Progress Saved",
      progress: newProgress,
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