# 🎓 Course Review & Management Web App (MERN)

A full-stack **Course Review & Management Web App** built using the **MERN stack**, designed for **course creators** to manage and track their courses, reviews, and overall performance.  
The platform includes a powerful Creator Dashboard with analytics, charts, and course management features.

---

## 🧰 Tech Stack

### Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (Access + Refresh Tokens)  
- **Email Verification:** Resend  
- **File Uploads:** Cloudinary  
- **Search:** MongoDB Atlas Full-Text Search  

### Frontend
- **Library:** React.js  
- **Styling:** Tailwind CSS  
- **State Management:** Context API / Redux (if used)  
- **Routing:** React Router  
- **API Calls:** Axios  

---

## 🚀 Features Overview

### 👨‍🏫 Creator Dashboard

A complete management panel for course creators to monitor, create, and update their content.

#### 🧾 Dashboard Page
- Displays **3 Overview Cards**:
  - Total **Courses**
  - Total **Followers**
  - Total **Reviews**
- **Recent Reviews Section**  
  - Shows the latest reviews  
  - Includes a **dropdown filter**: Today / Week / Month  
- **Overall Rating Chart**
  - Displays ⭐1–⭐5 star rating distribution  
  - Includes a **dropdown filter**: Year / Month / Week  
- **Performance Charts**
  - **Monthly Reviews Chart** – visualizes reviews by month  
  - **Latest Course Rating Chart** – compares ratings of recent courses  

---

#### 📚 Create New Course
Course creation is divided into **4 structured tabs**, allowing creators to fill in data step by step before publishing.

Each course includes:
- Title  
- Description  
- Category / Tags  
- Free or Paid option  
- Duration & Year  
- Cover Image (uploaded to Cloudinary)  
- **What You Will Teach in This Course** — add chapters and lessons in a structured format  
- “What You’ll Learn” section  

---

#### 📂 My Courses
- View all published courses in one place  
- Filter courses by **category**, **tags**, or **status**  
- Each course includes quick actions:
  - **View Details**
  - **Edit Course**
  - **Delete Course**

---

#### ⚙️ Settings
- Edit profile details (name, bio, profile image)  
- Add social media links  
- Change password securely  

---

#### 🚪 Sign Out
- Log out instantly from the dashboard with session cleared  

---

### 🙋‍♂️ User Dashboard
> 🚧 *Currently in progress*  
Upcoming features include:
- Explore courses  
- View creator profiles  
- Add course reviews & ratings  
- Search and filter by tags or course type  

---

## 🧑‍💻 Author

Developed by [Harsh Patel](https://github.com/harsh-coder-desgin)

📫 Connect on [LinkedIn](https://www.linkedin.com/in/harsh-patel-2b3405303/)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
