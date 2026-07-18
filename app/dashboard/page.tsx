"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Enrollment {
  _id: string;
  courseId: number;
  title: string;
  instructor: string;
  duration: string;
  level: string;
}

interface Progress {
  courseId: number;
  progress: number;
  completed: boolean;
  completedLessons: number;
  totalLessons: number;
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<Enrollment[]>([]);
  const [progressData, setProgressData] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchDashboard() {
      const user = localStorage.getItem("user");

      if (!user) {
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(user);

      try {
        const courseRes = await fetch(
          `/api/mycourses?email=${parsedUser.email}`
        );

        const courseData = await courseRes.json();

        if (courseData.success) {
          setCourses(courseData.courses);
        }

        const progressRes = await fetch(
          `/api/progress/${parsedUser.email}`
        );

        const progress = await progressRes.json();

        if (progress.success) {
          setProgressData(progress.progress);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  function getProgress(courseId: number) {
    return progressData.find((p) => p.courseId === courseId);
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
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "50px auto",
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
        🎓 Student Dashboard
      </h1>

      {courses.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No Courses Enrolled
        </h2>
      ) : (
        courses.map((course) => {
          const progress = getProgress(course.courseId);

          return (
            <div
              key={course._id}
              style={{
                marginBottom: "30px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "25px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                background: "#fff",
              }}
            >
              <h2 style={{ color: "#2563eb" }}>
                {course.title}
              </h2>

              <p>
                <strong>Instructor:</strong>{" "}
                {course.instructor}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {course.duration}
              </p>

              <p>
                <strong>Level:</strong>{" "}
                {course.level}
              </p>

              <br />

              <strong>Course Progress</strong>

              <div
                style={{
                  width: "100%",
                  height: "18px",
                  background: "#e5e7eb",
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    width: `${progress?.progress ?? 0}%`,
                    height: "100%",
                    background:
                      progress?.completed
                        ? "#16a34a"
                        : "#2563eb",
                    transition: "0.5s",
                  }}
                />
              </div>

              <p style={{ marginTop: "12px" }}>
                <strong>
                  {progress?.progress ?? 0}% Completed
                </strong>
              </p>

              <p>
                Lessons Completed:
                {" "}
                {progress?.completedLessons ?? 0}
                {" / "}
                {progress?.totalLessons ?? 5}
              </p>

              <p>
                Status:
                {" "}
                {progress?.completed
                  ? "✅ Course Completed"
                  : "🟡 In Progress"}
              </p>

              {/* Continue Learning */}

              <button
                onClick={() =>
                  router.push(`/learn/${course.courseId}`)
                }
                style={{
                  marginTop: "20px",
                  marginRight: "10px",
                  padding: "12px 20px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ▶ Continue Learning
              </button>

              {/* Course Details */}

              <button
                onClick={() =>
                  router.push(`/courses/${course.courseId}`)
                }
                style={{
                  marginTop: "20px",
                  marginRight: "10px",
                  padding: "12px 20px",
                  background: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                📚 View Course
              </button>

              {/* Certificate */}

              {progress?.completed && (
                <button
                  onClick={() =>
                    router.push(
                      `/certificate/${course.courseId}`
                    )
                  }
                  style={{
                    marginTop: "20px",
                    padding: "12px 20px",
                    background: "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  🏆 Download Certificate
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}