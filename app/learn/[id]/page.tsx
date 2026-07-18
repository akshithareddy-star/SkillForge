"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { courseLessons } from "@/lib/courseData";
import { courseContent } from "@/lib/courseContent";

export default function LearnPage() {
  const { id } = useParams();
  const router = useRouter();

  const courseId = Number(id);

  const lessons =
    courseLessons[courseId as keyof typeof courseLessons] || [];

  const content =
    courseContent[courseId as keyof typeof courseContent] || [];

  const [currentLesson, setCurrentLesson] = useState(0);

  async function completeLesson() {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(user);

    const completedLessons = currentLesson + 1;

    const progress = Math.round(
      (completedLessons / lessons.length) * 100
    );

    const completed = completedLessons === lessons.length;

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: parsedUser.email,
          courseId,
          completed,
          progress,
          completedLessons,
          totalLessons: lessons.length,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (completed) {
          alert("🎉 Congratulations! Course Completed!");
        } else {
          alert(`Lesson ${completedLessons} Completed Successfully`);

          if (currentLesson < lessons.length - 1) {
            setCurrentLesson(currentLesson + 1);
          }
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  if (lessons.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontSize: "22px",
        }}
      >
        Course not found.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        display: "flex",
        gap: "30px",
      }}
    >
      {/* Sidebar */}

      <div
        style={{
          width: "300px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <h2>Course Lessons</h2>

        {lessons.map((lesson, index) => (
          <div
            key={index}
            onClick={() => setCurrentLesson(index)}
            style={{
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              background:
                currentLesson === index
                  ? "#2563eb"
                  : "#f3f4f6",
              color:
                currentLesson === index
                  ? "#fff"
                  : "#000",
            }}
          >
            <strong>Lesson {index + 1}</strong>

            <br />

            <small>{lesson}</small>
          </div>
        ))}
      </div>

      {/* Main Content */}

      <div style={{ flex: 1 }}>
        <h1>Lesson {currentLesson + 1}</h1>

        <h2>{lessons[currentLesson]}</h2>

        <hr style={{ margin: "20px 0" }} />

        {/* Video */}

        <iframe
          width="100%"
          height="500"
          src={content[currentLesson]?.video}
          title="Course Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            border: "none",
            borderRadius: "12px",
          }}
        />

        {/* PDF */}

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f8fafc",
            borderRadius: "12px",
          }}
        >
          <h2>📄 Lesson Notes</h2>

          <iframe
            src={content[currentLesson]?.notes}
            width="100%"
            height="650"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              marginTop: "15px",
            }}
          />

          <br />

          <a
            href={content[currentLesson]?.notes}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "12px 18px",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            📥 Download Notes
          </a>
        </div>

        {/* Quiz */}

        <button
          onClick={() => router.push(`/learn/${courseId}/quiz`)}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "15px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          📝 Take Quiz
        </button>

        {/* Complete Lesson */}

        <button
          onClick={completeLesson}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "15px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          ✅ Complete Lesson
        </button>
      </div>
    </div>
  );
}