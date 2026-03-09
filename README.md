# 🚀 Job Application Tracker (Kanban Board)

A feature-rich, interactive Kanban board designed to track and manage job applications throughout the hiring pipeline. This project demonstrates complex state management, seamless drag-and-drop interactions, and local data persistence.

**Live Demo:** [Insert your Vercel URL here, e.g., https://jeeva-app-tracker.vercel.app]

## ✨ Key Features

* **Drag-and-Drop Interface:** Smoothly move job applications between stages (Wishlist, Applied, Interviewing, Offered, Rejected) using `@hello-pangea/dnd`.
* **Complex State Management:** Utilizes **Redux Toolkit** with normalized state architecture to efficiently handle cross-column card movements and CRUD operations.
* **Data Persistence:** Integrates with the browser's `localStorage` to automatically save and load board state, ensuring no data is lost upon page refresh.
* **Smart Search & Filter:** Features a non-destructive search bar that dims non-matching cards instead of removing them from the DOM, preserving the drag-and-drop index integrity.
* **Full CRUD Operations:** Add new job applications via a custom modal and delete outdated cards directly from the board.

## 🛠️ Tech Stack

* **Frontend Framework:** React.js (via Vite for optimized build speeds)
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
* **Drag & Drop:** `@hello-pangea/dnd` (Modern, maintained fork of `react-beautiful-dnd`)
* **Styling:** Tailwind CSS (Responsive, utility-first styling)
* **Deployment:** Vercel


🚀 Local Installation & SetupTo run this project locally on your machine:Clone the repository:Bashgit clone [https://github.com/YOUR_USERNAME/job-application-tracker.git](https://github.com/YOUR_USERNAME/job-application-tracker.git)
Navigate into the directory:Bashcd job-application-tracker
Install the dependencies:Bashnpm install
Start the development server:Bashnpm run dev
Open your browser and visit http://localhost:5173.💡 Technical HighlightsBuilding this Kanban board involved solving several interesting frontend challenges:Redux Normalization: Instead of deeply nested arrays, the state is normalized (separating the jobs object from the columns arrays). This allows for $O(1)$ lookups when updating a job's status and prevents unnecessary re-renders.Immutable State Updates: Leveraged Immer (built into Redux Toolkit) to safely splice arrays when moving cards within the same column or between different columns.
