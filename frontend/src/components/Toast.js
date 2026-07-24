import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

// ─── Toast Context ────────────────────────────────────────────────────────────
const ToastContext = React.createContext(null);

const ICONS = {
  success: <CheckCircle size={20} color="#16a34a" />,
  error: <XCircle size={20} color="#dc2626" />,
  info: <Info size={20} color="#2563eb" />,
  warning: <AlertTriangle size={20} color="#d97706" />,
};

const COLORS = {
  success: { bg: "#f0fdf4", border: "#86efac", text: "#15803d" },
  error: { bg: "#fef2f2", border: "#fca5a5", text: "#dc2626" },
  info: { bg: "#eff6ff", border: "#93c5fd", text: "#1d4ed8" },
  warning: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => {
          const colors = COLORS[toast.type] || COLORS.info;
          return (
            <div
              key={toast.id}
              className="toast-enter"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1.25rem",
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                minWidth: "280px",
                maxWidth: "400px",
                pointerEvents: "all",
                color: colors.text,
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              {ICONS[toast.type]}
              <span style={{ flex: 1 }}>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  color: colors.text,
                  opacity: 0.6,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
