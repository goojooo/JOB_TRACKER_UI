import { useNavigate } from "react-router-dom";
import "./Header.css";
export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header">
      <h2 onClick={() => navigate("/")}>Job Tracker</h2>

      <div className="nav-buttons">
        {user ? (
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </div>
  );
}