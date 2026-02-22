export const portfolio = {
  name: "Shubham Kumar",
  tagline: "Full Stack Developer | MERN | AI Enthusiast",
  about:
    "Final-year B.Tech student in Artificial Intelligence and Machine Learning with strong hands-on experience in full-stack web development using the MERN stack. Solid foundation in DSA, ML fundamentals, and SQL. Experienced in building scalable RESTful APIs, MongoDB, authentication, and end-to-end applications with clean, maintainable code.",
  email: "kumarshubham0950@gmail.com",
  phone: "7004173201",
  github: "https://github.com/GENAURA",
  linkedin: "https://www.linkedin.com/in/shubham-kumar1278/",
  avatar: null as string | null,

  experience: [
    {
      role: "Full Stack Developer Intern",
      period: "May 2025 – July 2025",
      company: "B2World",
      points: [
        "Contributed to frontend and backend tasks: user authentication, product listing, cart, and checkout features.",
        "Collaborated using Git and GitHub for version control, issue tracking, and code reviews.",
        "Improved UI/UX flow and resolved performance issues for faster load times and better user experience.",
        "Assisted in developing an admin dashboard for managing products, users, and inventory.",
      ],
    },
  ],

  skills: [
    { category: "Languages", items: ["Python", "C++", "HTML/CSS", "JavaScript", "SQL"] },
    { category: "Technologies / Frameworks", items: ["ReactJS", "Redux", "NodeJS", "Express", "MongoDB"] },
    { category: "Developer Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Render", "Cloudinary", "MongoDB Atlas"] },
  ],

  education: [
    {
      title: "Bachelor of Technology in Artificial Intelligence and Machine Learning",
      org: "Birla Institute of Technology Mesra, Ranchi",
      period: "Nov 2022 – June 2026",
      location: "Ranchi, Jharkhand",
    },
  ],

  projects: [
    {
      name: "ResumeExpert – Resume Builder",
      description: "End-to-end MERN stack resume builder: create, manage, and export multiple resumes. MongoDB data models for resume storage and version management; RESTful APIs with Node.js/Express for auth and CRUD; responsive React + Tailwind UI with progress visualization and PDF export. ~20% improvement in user navigation efficiency.",
      tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      link: null,
      repo: null,
    },
    {
      name: "SmartShop – E-Commerce Web Application",
      description: "Full-stack e-commerce with user auth, product listing, cart, checkout, and order tracking. JWT/Firebase authentication, protected routes, admin dashboard for products/users/inventory/orders. Responsive UI with React and Tailwind/Bootstrap. RESTful APIs improved data handling by ~25%.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      link: null,
      repo: "https://github.com/GENAURA",
    },
    {
      name: "AI Portfolio with Resume Chat",
      description: "This portfolio with an AI assistant that answers questions using my resume (React, TypeScript, Python, FastAPI, OpenRouter).",
      tech: ["React", "TypeScript", "Python", "FastAPI", "OpenRouter", "SQLite"],
      link: null,
      repo: "https://github.com/GENAURA",
    },
  ],

  achievements: [
    "Ranked Top 400 out of 12,000 teams in WoodPecker Hackathon 2024",
    "Secured Rank 667 among 5,000+ participants in Code Clash 2025; 5-Star rating in HackerRank (Problem Solving)",
    "Rank 203 in GeeksforGeeks Weekly Coding Contest 207",
    "Solved 450+ Data Structures and Algorithms problems on GeeksforGeeks",
    "Cleared Round 1 of Hackvega 2025",
  ],
};

export type Portfolio = typeof portfolio;
