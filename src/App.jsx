import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ProfileSetup from "./pages/ProfileSetup";

function App() {
  const [page, setPage] = useState("login");

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
        <div style={{
          minHeight:"100vh",
          background:"linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", fontSize:24, fontFamily:"Georgia,serif",
        }}>
          🚧 Dashboard coming soon...
        </div>
      )}
    </>
  );
}
export default App;