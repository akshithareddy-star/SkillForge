"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  level: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  async function handleEnroll(course: Course) {
    try {
      setEnrolling(course.id);

      const user = localStorage.getItem("user");

      if (!user) {
        alert("Please login first.");
        router.push("/login");
        return;
      }

      const parsedUser = JSON.parse(user);

      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: parsedUser.email,
          courseId: course.id,
          title: course.title,
          instructor: course.instructor,
          duration: course.duration,
          level: course.level,
        }),
      });

      // ===== DEBUG START =====
      const text = await res.text();

      console.log("SERVER RESPONSE:");
      console.log(text);

      const data = JSON.parse(text);
      // ===== DEBUG END =====

      if (data.success) {
        alert("Enrollment Successful!");
        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("CLIENT ERROR:", error);
      alert("Something went wrong.");
    } finally {
      setEnrolling(null);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          fontSize: "22px",
        }}
      >
        Loading Courses...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "40px",
        }}
      >
        Available Courses
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <h2
              style={{
                color: "#2563eb",
                marginBottom: "10px",
              }}
            >
              {course.title}
            </h2>

            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>

            <p>
              <strong>Duration:</strong> {course.duration}
            </p>

            <p>
              <strong>Level:</strong> {course.level}
            </p>

            <button
              onClick={() => handleEnroll(course)}
              disabled={enrolling === course.id}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "12px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {enrolling === course.id ? "Enrolling..." : "Enroll Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}