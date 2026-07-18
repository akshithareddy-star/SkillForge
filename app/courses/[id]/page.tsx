"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  level: string;
}

export default function CourseDetails() {
  const params = useParams();

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      const res = await fetch("/api/courses");
      const data = await res.json();

      const selected = data.find(
        (item: Course) => item.id === Number(params.id)
      );

      setCourse(selected);
    }

    fetchCourse();
  }, [params.id]);

  if (!course) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontSize: "22px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "60px auto",
      }}
    >
      <div
        style={{
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,.1)",
        }}
      >
        <h2>{course.title}</h2>

        <p>
          <strong>Instructor:</strong> {course.instructor}
        </p>

        <p>
          <strong>Duration:</strong> {course.duration}
        </p>

        <p>
          <strong>Level:</strong> {course.level}
        </p>

        <hr style={{ margin: "25px 0" }} />

        <h3>Course Description</h3>

        <p>
          This course provides practical learning with hands-on exercises,
          projects, quizzes, and real-world examples to strengthen your
          knowledge and prepare you for interviews.
        </p>

        <h3>What You'll Learn</h3>

        <ul>
          <li>✔ Core Concepts</li>
          <li>✔ Practical Hands-on Labs</li>
          <li>✔ Mini Projects</li>
          <li>✔ Interview Preparation</li>
          <li>✔ Best Practices</li>
        </ul>

        <Link href={`/learn/${course.id}`}>
          <button
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Start Learning
          </button>
        </Link>
      </div>
    </div>
  );
}