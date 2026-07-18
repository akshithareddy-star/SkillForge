"use client";

import { useParams, useRouter } from "next/navigation";
import { quizzes } from "@/lib/quizzes";
import { useState } from "react";

export default function QuizPage() {
  const { id } = useParams();
  const router = useRouter();

  const questions =
    quizzes[Number(id) as keyof typeof quizzes] || [];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  function choose(option: string) {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    if (current === questions.length - 1) {
      setTimeout(() => {
        alert(
          `Quiz Completed!\n\nScore: ${
            option === questions[current].answer
              ? score + 1
              : score
          } / ${questions.length}`
        );

        router.push(`/learn/${id}`);
      }, 300);
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
      }}
    >
      <h1>Lesson Quiz</h1>

      <h2>{questions[current].question}</h2>

      {questions[current].options.map((option) => (
        <button
          key={option}
          onClick={() => choose(option)}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "15px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            cursor: "pointer",
            background: "#fff",
          }}
        >
          {option}
        </button>
      ))}

      <p
        style={{
          marginTop: "40px",
        }}
      >
        Question {current + 1} / {questions.length}
      </p>
    </div>
  );
}