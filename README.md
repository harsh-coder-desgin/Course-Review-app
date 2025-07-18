# 🎓 Course Review & Management Backend

This is the **backend server** for a full-featured **Course Review Web App** supporting creators and users. Built with the **MERN stack**, it includes secure authentication, dynamic course/review APIs, advanced search, and Cloudinary-based image uploads.

## 🧰 Backend Tech Stack

- Runtime:             Node.js
- Server Framework:    Express.js
- Database:            MongoDB (with Mongoose)
- Authentication:      JWT (Access + Refresh Tokens)
- Email Service:       Resend
- File Upload:         Cloudinary
- Search:              MongoDB Atlas Full-Text Search
- Utilities:           bcrypt, cookie-parser


---

## 🚀 Features Overview

### 👨‍🏫 Creator Dashboard
- 🔐 Creator Sign-Up & Login (with Email Verification)
- 🔄 Access & Refresh Token System
- 🧾 Creator Overview Page:Total Courses,Total Reviews,New Reviews,Average Rating
- 🖊️ Edit Profile :(**email non-editable**)
- 📚 Manage Courses:
  - Add / Edit / Delete Course
  - Fields: Name, Description, Cover Image, Free/Paid, Duration, Year, YouTube Link, What You'll Learn, Tags,description
  - Images uploaded to Cloudinary
- 📥 Course Reviews:
  - View latest reviews
  - View course-specific review breakdowns (5★–1★)
  - Reply to user comments (Only reply; cannot like, upvote/downvote)

---

### 🙋‍♂️ User Dashboard
- 🔐 User Sign-Up & Login (with Email Verification)
- 🔄 Access & Refresh Token System
- 🏠 Home Page:
  - Search creators and courses using **MongoDB Atlas Full-Text Search**
  - View top-rated creators
  - See latest reviews and new courses
  - Filter by **Free/Paid** and by **Tags** (e.g., Python, JavaScript)
- 📄 Course Pages:
  - Full course details
  - Total rating & user reviews
  - Related courses suggestions
- 🧾 Creator Pages:
  - List of all their courses
  - All reviews about the creator
  - All creator courses

---

### ✍️ Reviews & Comments System

#### ✅ User Capabilities
- Add a review with star rating (1–5)
- Like reviews
- Upvote / Downvote reviews
- Comment on reviews

#### 💬 Commenting System
- Nested replies
- Edit / Delete / Like / Report comments and reply

#### 🎯 Tags Filtering
- All courses include `tags` like: `python`, `c++`
- Clicking a tag filters all courses and reviews related to that topic

---

## 🧑‍💻 Author

Made by [Harsh Patel](https://github.com/harsh-coder-desgin)

📫 Reach me on [LinkedIn](https://www.linkedin.com/in/harsh-patel-2b3405303/)  

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
EOF
