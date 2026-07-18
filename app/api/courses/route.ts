import { NextResponse } from "next/server";

export async function GET() {
  const courses = [
    {
      id: 1,
      title: "Linux Administration",
      instructor: "SkillForge",
      duration: "20 Hours",
      level: "Beginner",
      description:
        "Learn Linux fundamentals including file systems, users, permissions, processes, package management, shell commands, and administration.",
      modules: [
        "Linux Introduction",
        "Linux File System",
        "Users & Permissions",
        "Process Management",
        "Package Management",
      ],
    },
    {
      id: 2,
      title: "Networking Fundamentals",
      instructor: "SkillForge",
      duration: "18 Hours",
      level: "Beginner",
      description:
        "Understand networking concepts including IP addressing, DNS, routing, switches, protocols, and troubleshooting.",
      modules: [
        "Network Basics",
        "OSI Model",
        "IP Addressing",
        "DNS & DHCP",
        "Network Troubleshooting",
      ],
    },
    {
      id: 3,
      title: "Cloud Computing with GCP",
      instructor: "SkillForge",
      duration: "25 Hours",
      level: "Intermediate",
      description:
        "Master Google Cloud Platform by learning Compute Engine, Storage, Networking, IAM, and Deployment.",
      modules: [
        "Introduction to GCP",
        "Compute Engine",
        "Cloud Storage",
        "Virtual Networks",
        "Deployment",
      ],
    },
    {
      id: 4,
      title: "AI Fundamentals",
      instructor: "SkillForge",
      duration: "15 Hours",
      level: "Beginner",
      description:
        "Learn Artificial Intelligence concepts including Machine Learning, Deep Learning, LLMs, and real-world AI applications.",
      modules: [
        "Introduction to AI",
        "Machine Learning",
        "Deep Learning",
        "Large Language Models",
        "AI Applications",
      ],
    },
  ];

  return NextResponse.json(courses);
}
