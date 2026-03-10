# 📚 NoteNest

> **A community-driven note-sharing platform for students and educators.**  
> Upload, discover, and save academic notes — organized by subject, institution, and role.

---

## ✨ Overview

NoteNest is a React-based web application that connects students and faculty through shared academic resources. Users sign up, set up a personalized profile, and immediately access a curated feed of notes from their peers — filtered by subject, searchable by title, and ranked by community engagement.

---

## 🖼️ App Flow

```
Login / Signup  →  Profile Setup (5-step onboarding)  →  Dashboard
```

| Screen | Description |
|---|---|
| **LoginPage** | Authentication entry point with login and signup flows |
| **ProfileSetup** | 5-step onboarding — name, role, academic details, photo, review |
| **Dashboard** | Full feed with stats, trending notes, activity stream, and search |

---

## 🗂️ Project Structure

```
src/
├── pages/
│   ├── LoginPage.jsx        # Auth screen
│   ├── ProfileSetup.jsx     # 5-step profile onboarding wizard
│   └── Dashboard.jsx        # Main app dashboard
└── App.jsx                  # Root router (login → setup → dashboard)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/notenest.git
cd notenest
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 Features

### 🔐 Authentication
- Login and signup flows on a single, animated page
- Role-aware routing — new users are directed to profile setup

### 🧭 5-Step Profile Onboarding
- **Step 1** — Display name and bio
- **Step 2** — Role selection (Student or Staff / Faculty)
- **Step 3** — Academic details (institution, course, year or department)
- **Step 4** — Profile photo upload with live preview
- **Step 5** — Profile review and launch

### 📊 Dashboard
- **Stats row** — notes saved, your notes, followers, total views
- **Discover feed** — filter by subject, search by title, save/unsave notes
- **Trending panel** — top 5 notes of the week ranked by saves
- **Activity stream** — follows, comments, saves, and milestones
- **Collapsible sidebar** — responsive navigation with icon-only mode

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Styling | Inline styles + CSS-in-JS (no external CSS framework) |
| Fonts | Georgia (serif) — consistent with brand aesthetic |
| State | React `useState` / `useRef` |
| Build Tool | Vite (recommended) |

---

## 🎨 Design System

NoteNest uses a consistent visual language across all screens:

| Token | Value |
|---|---|
| Primary | `#ff6b35` (orange) |
| Dark bg | `#1a1a2e` → `#0f3460` (navy gradient) |
| Surface | `#ffffff` / `#f8faff` |
| Text | `#1a1a2e` (primary), `#64748b` (muted) |
| Font | Georgia, serif |
| Radius | 12–16px cards, 99px pills |

---

## 📁 Key Components

### `ProfileSetup.jsx`
A self-contained 5-step wizard with per-step validation, animated transitions, and a persistent left panel that updates contextually at each step.

### `Dashboard.jsx`
Full dashboard layout with a collapsible sidebar, top search bar, stats grid, filterable note feed, trending panel, and activity stream. Accepts a `user` prop:

```jsx
<Dashboard user={{ name: "Jane Doe", role: "student", institution: "MIT" }} />
```

### `App.jsx`
Minimal root component managing page state across `"login"`, `"setup"`, and `"dashboard"`.

---

## 📌 Roadmap

- [ ] Backend integration (auth, notes API)
- [ ] Real file upload for notes (PDF, DOCX)
- [ ] Full-text note viewer
- [ ] Comments and reactions
- [ ] Notifications system
- [ ] Mobile-responsive layout
- [ ] Dark mode

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">Built with ☕ and Georgia serif — because good notes deserve a good home.</p>