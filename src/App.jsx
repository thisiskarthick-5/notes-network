import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  return (
    <>
      {page === "login" && (
        <LoginPage
          onLoginSuccess={() => setPage("dashboard")}
          onSignupSuccess={() => setPage("setup")}
        />
      )}
      {page === "setup" && (
        <ProfileSetup onSuccess={() => setPage("dashboard")} />
      )}
      {page === "dashboard" && (
        <Dashboard user={user || { name: "Jane Doe", role: "student", institution: "MIT" }} />
      )}
    </>
  );
}

export default App;