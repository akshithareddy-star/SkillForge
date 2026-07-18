"use client";

import { useParams } from "next/navigation";

export default function CertificatePage() {
  const { id } = useParams();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const courseNames: Record<number, string> = {
    1: "Linux Administration",
    2: "Networking Fundamentals",
    3: "Google Cloud Platform",
    4: "Artificial Intelligence Fundamentals",
  };

  const today = new Date().toLocaleDateString();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        id="certificate"
        style={{
          width: "1000px",
          background: "#fff",
          border: "12px solid #2563eb",
          borderRadius: "20px",
          padding: "60px",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0,0,0,.15)",
        }}
      >
        <h3
          style={{
            color: "#2563eb",
            letterSpacing: "6px",
            fontSize: "22px",
          }}
        >
          SKILLFORGE
        </h3>

        <h1
          style={{
            fontSize: "54px",
            marginTop: "15px",
            color: "#111827",
          }}
        >
          Certificate of Completion
        </h1>

        <p
          style={{
            marginTop: "35px",
            fontSize: "22px",
          }}
        >
          This certificate is proudly presented to
        </p>

        <h1
          style={{
            marginTop: "15px",
            color: "#2563eb",
            fontSize: "46px",
          }}
        >
          {user.name || "Student"}
        </h1>

        <p
          style={{
            marginTop: "30px",
            fontSize: "22px",
          }}
        >
          for successfully completing the course
        </p>

        <h2
          style={{
            marginTop: "20px",
            color: "#16a34a",
            fontSize: "36px",
          }}
        >
          {courseNames[Number(id)]}
        </h2>

        <p
          style={{
            marginTop: "35px",
            fontSize: "20px",
          }}
        >
          Completion Date: <strong>{today}</strong>
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "80px",
          }}
        >
          <div>
            <hr
              style={{
                width: "220px",
              }}
            />
            <p>Instructor</p>
          </div>

          <div>
            <hr
              style={{
                width: "220px",
              }}
            />
            <p>SkillForge Director</p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          style={{
            marginTop: "60px",
            padding: "16px 35px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          🖨 Download Certificate
        </button>
      </div>
    </div>
  );
}