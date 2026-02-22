"""
Resume content used as context for the AI chat.
Matches the portfolio data so the chatbot can answer accurately.
"""

RESUME_TEXT = """
# Shubham Kumar — Resume

## Contact
- Email: kumarshubham0950@gmail.com
- Phone: 7004173201
- GitHub: https://github.com/GENAURA
- LinkedIn: https://www.linkedin.com/in/shubham-kumar1278/

## Professional Summary
Final-year B.Tech student in Artificial Intelligence and Machine Learning with strong hands-on experience in full-stack web development using the MERN stack. Solid foundation in Data Structures and Algorithms, machine learning fundamentals including data preprocessing, model training, and evaluation, and strong proficiency in SQL for database design, complex queries, and data management. Experienced in building scalable RESTful APIs, working with MongoDB and relational databases, implementing authentication, and developing end-to-end applications with a focus on clean, maintainable, and scalable code.

## Education
- Birla Institute of Technology Mesra, Ranchi — Nov 2022 – June 2026
- Bachelor of Technology in Artificial Intelligence and Machine Learning
- Ranchi, Jharkhand

## Experience

### B2World — Full Stack Developer Intern (Remote)
May 2025 – July 2025
- Contributed to assigned frontend and backend tasks including user authentication, product listing, cart, and checkout features.
- Collaborated with team members using Git and GitHub for version control, issue tracking, and code reviews.
- Improved UI/UX flow and resolved performance issues, contributing to faster load times and better user experience.
- Assisted in developing an admin dashboard for managing products, users, and inventory under team guidance.

## Projects

### ResumeExpert – Resume Builder
December 2025 | React, Node.js, Express.js, MongoDB, Tailwind CSS
- Built an end-to-end MERN stack resume builder application enabling users to create, manage, and export multiple resumes.
- Designed MongoDB data models for efficient resume storage, user tracking, and version management.
- Developed RESTful APIs using Node.js and Express.js to handle authentication and CRUD operations.
- Implemented a responsive, mobile-optimized UI using React and Tailwind CSS with progress visualization and PDF export functionality.
- Improved UI/UX flow and component structure, leading to an estimated 20% improvement in user navigation efficiency.

### SmartShop – E-Commerce Web Application
June 2025 | React.js, Node.js, Express.js, MongoDB
- Built a full-stack e-commerce application featuring user authentication, product listing, shopping cart, checkout, and order tracking.
- Implemented secure JWT/Firebase-based authentication with protected routes for users and admins.
- Developed an admin dashboard for managing products, users, inventory, and orders, along with a responsive and mobile-optimized UI using React and Tailwind CSS/Bootstrap.
- Integrated RESTful APIs for product, cart, and order management, improving data handling efficiency by approximately 25%.

### AI Portfolio with Resume Chat
- This portfolio site with an AI assistant that answers questions using resume context (React, TypeScript, Python, FastAPI, OpenRouter).

## Technical Skills
- Languages: Python, C++, HTML/CSS, JavaScript, SQL
- Developer Tools: Git, GitHub, VS Code, Postman, Vercel, Render, Cloudinary, MongoDB Atlas
- Technologies/Frameworks: ReactJS, Redux, NodeJS, Express, MongoDB

## Achievements
- Ranked Top 400 out of 12,000 teams in WoodPecker Hackathon 2024, demonstrating strong problem-solving and teamwork skills.
- Secured Rank 667 among 5,000+ participants in Code Clash 2025 and achieved 5-Star rating in HackerRank (Problem Solving).
- Achieved Rank 203 in GeeksforGeeks Weekly Coding Contest 207, outperforming thousands of coders.
- Solved 450+ Data Structures and Algorithms problems on GeeksforGeeks.
- Cleared Round 1 of Hackvega 2025.
"""


def get_resume_context() -> str:
    """Return resume text for injection into the AI system prompt."""
    return RESUME_TEXT.strip()
