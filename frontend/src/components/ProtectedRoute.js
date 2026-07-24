import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ProtectedRoute — wraps any page that requires authentication.
 * Redirects to /login if no token found in localStorage.
 */
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) return null; // Render nothing while redirecting

  return <>{children}</>;
}
