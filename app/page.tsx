import Navbar from "@/components/Navbar";

const courses = [
  {
    title: "Programming",
    desc: "Master C, C++, Java, Python and Data Structures.",
  },
  {
    title: "Artificial Intelligence",
    desc: "Learn AI, Machine Learning and Large Language Models.",
  },
  {
    title: "Cloud Computing",
    desc: "Hands-on AWS, Azure and Google Cloud Platform.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}

      <section
        style={{
          background: "#eef5ff",
          padding: "120px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            color: "#2563eb",
            marginBottom: "25px",
          }}
        >
          Learn Without Limits
        </h1>

        <p
          style={{
            maxWidth: "750px",
            margin: "auto",
            fontSize: "22px",
            color: "#555",
            lineHeight: "1.7",
          }}
        >
          Join thousands of learners and build industry-ready skills in
          Programming, Artificial Intelligence, Cloud Computing and
          Cybersecurity.
        </p>

        <button
          style={{
            marginTop: "40px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "18px 40px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Start Learning
        </button>
      </section>

      {/* FEATURES */}

      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            marginBottom: "50px",
          }}
        >
          Why Choose SkillForge?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {[
            "🎓 Expert Mentors",
            "📜 Certificates",
            "💻 Hands-on Projects",
            "📈 Track Progress",
          ].map((item) => (
            <div
              key={item}
              style={{
                width: "250px",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              }}
            >
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}

      <section
        style={{
          background: "#f8fafc",
          padding: "80px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "50px",
          }}
        >
          Featured Courses
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {courses.map((course) => (
            <div
              key={course.title}
              style={{
                width: "320px",
                background: "white",
                padding: "30px",
                borderRadius: "18px",
                boxShadow: "0 10px 20px rgba(0,0,0,.08)",
              }}
            >
              <h3>{course.title}</h3>

              <p
                style={{
                  marginTop: "15px",
                  color: "#555",
                  lineHeight: "1.7",
                }}
              >
                {course.desc}
              </p>

              <button
                style={{
                  marginTop: "25px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Explore Course
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          background: "#111827",
          color: "white",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>SkillForge</h2>

        <p
          style={{
            marginTop: "15px",
            color: "#cbd5e1",
          }}
        >
          Learn. Build. Grow.
        </p>

        <p
          style={{
            marginTop: "20px",
            color: "#94a3b8",
          }}
        >
          © 2026 SkillForge. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}