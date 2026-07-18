"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h2
        style={{
          color: "#2563eb",
          fontWeight: "bold",
          fontSize: "28px",
        }}
      >
        SkillForge
      </h2>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <Link href="/">Home</Link>

        <Link href="/courses">Courses</Link>

        <Link href="/about">About</Link>

        <Link href="/contact">Contact</Link>

        <Link href="/login">Login</Link>

        <Link href="/signup">
          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}