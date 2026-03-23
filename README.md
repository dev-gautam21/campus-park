# 🚗 CampusPark

### Digital Smart Parking Availability & Notification System

---

## 📌 Overview

**CampusPark** is a smart, digital parking assistance system designed to solve the *last-mile parking problem* for college faculty.

Instead of relying on expensive IoT sensors, it uses a **manual admin-driven model**, where security staff update parking availability in real-time, and teachers can instantly view it through a responsive web dashboard.

---

## 🎯 Problem Statement

Faculty members often waste valuable time searching for parking during peak hours, which leads to:

* ⏱️ Late arrival to classes
* 🚗 Traffic congestion inside campus
* 😓 Frustration and inefficiency

---

## 💡 Proposed Solution

CampusPark provides:

* 📊 Real-time parking availability dashboard
* 🔔 Smart notification system for vacant slots
* 🧠 AI-powered parking insights

---

## ✨ Key Features

### 👨‍🏫 Teacher/Staff Interface (User Portal)

* 🟢 **Live Availability Map**

  * Green → Available
  * Red → Occupied
  * Amber → Reserved

* ⏰ **Smart Reservations**

  * Reserve slots within time window *(08:45 AM – 04:30 PM)*

* 🔔 **Push Notifications**

  * Alerts when parking changes from *Full → Available*

* 🤖 **AI Parking Insights**

  * Powered by Google Gemini API
  * Suggests:

    * Best arrival time
    * Optimal parking zones
    * Peak traffic hours

---

### 🛡️ Admin/Security Interface (Management Portal)

* 🔐 **Secure Login**
* 🧩 **Zone Management** (Add/Edit Zones)
* ⚡ **One-Tap Slot Controls**
* 🅿️ **Slot Management** (Add/Remove slots)

---

## 🏗️ Tech Stack

| Category       | Technology        |
| -------------- | ----------------- |
| Frontend       | React 19          |
| Styling        | Tailwind CSS      |
| Charts         | Recharts          |
| Icons          | Lucide React      |
| AI Integration | Google Gemini API |
| Storage        | LocalStorage      |

---

## ⚙️ System Architecture

### 🔄 Core Flow

1. Centralized state management in `App.tsx`
2. Real-time updates via React Hooks
3. Notification trigger on slot availability change
4. Data persistence using LocalStorage

---

### 🔔 Notification Logic

* Trigger condition:

  ```
  OCCUPIED → AVAILABLE
  ```
* Automatically pushes alert to notification center

---

### 💾 Data Persistence

* Uses `LocalStorage`
* Ensures data survives refresh

---

## 🤖 AI Integration

The system integrates with **Google Gemini API** to:

* Analyze parking occupancy data
* Provide actionable insights
* Improve decision-making before entering campus

---

## 📱 UI/UX Design

* 📱 Mobile-first responsive design
* 📊 Visual grid-based parking layout
* 🎯 Simple and intuitive controls

---

## 🔐 Admin Credentials (For Testing)

```
ID: admin123  
Password: campus-secure
```

---

## 🚀 Future Scope

* 📡 IoT Sensor Integration
* 🎓 Role-based access (Students, Visitors, VIP)
* ☁️ Backend Integration (Firebase / Supabase)
* 📲 Mobile App Version

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/dev-gautam21/campus-park.git

# Navigate into project
cd campus-park

# Install dependencies
npm install

# Run the app
npm run dev
```

---

## 📂 Project Structure

```
├── components/
├── server/
│   ├── models/
│   ├── routes/
├── services/
├── App.tsx
├── index.tsx
├── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit pull requests.

---

## 📜 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Gautam Sharma**
B.Tech CSE (AIML)

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
