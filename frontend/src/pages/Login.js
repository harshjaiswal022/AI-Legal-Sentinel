import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, XCircle, Eye, EyeOff } from "lucide-react";
import { useToast } from "../components/Toast";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData();
    form.append("username", email);
    form.append("password", password);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_name", res.data.user_name);
      // Notify Layout to re-render nav
      window.dispatchEvent(new Event('storage'));
      toast("Welcome back, " + res.data.user_name + "! 🎉", "success");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const detail = err.response?.data?.detail || "Invalid credentials. Please try again.";
      setError(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Left Side - Brand Panel */}
      <div className="brand-panel" style={{
        flex: 1,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 30%)',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem' }}>
            <div style={{ background: 'var(--gradient-primary)', padding: '10px', borderRadius: '12px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L12 6M12 6L8 10M12 6L16 10M4 12l8 8 8-8M4 12h16"/>
              </svg>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>LegalAI</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: 'white' }}>
            Welcome<br />back.
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.75, lineHeight: 1.6, marginBottom: '3rem' }}>
            Access your dashboard to continue your legal research and document analysis.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {['JWT-authenticated sessions', 'End-to-end encrypted storage', 'AI-powered document analysis'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.85 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a5b4fc', flexShrink: 0 }} />
                <span style={{ fontSize: '1rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        padding: '2rem'
      }}>
        <div style={{ width: '100%', maxWidth: '480px', background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1e293b' }}>Sign In</h2>
            <p style={{ color: '#64748b' }}>Enter your credentials to access your account.</p>
          </div>

          {/* Bug fix: use XCircle icon for errors, not CheckCircle rotated */}
          {error && (
            <div style={{
              background: '#fee2e2', color: '#dc2626', padding: '0.875rem 1rem', borderRadius: '12px',
              marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem',
              border: '1px solid #fca5a5'
            }}>
              <XCircle size={18} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={login}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  className="input-field"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '46px', fontSize: '1rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0.875rem 1rem 0.875rem 46px' }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>Password</label>
          <Link to="/signup" style={{ fontSize: '0.85rem', color: '#4f46e5', fontWeight: '600' }}>
  Forgot password?
</Link>              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                {/* Bug fix: added className="input-field" for consistent styling */}
                <input
                  className="input-field"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '46px', paddingRight: '46px', fontSize: '1rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0.875rem 46px' }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              disabled={loading}
            >
              {loading ? "Signing In..." : <><span>Sign In</span> <ArrowRight size={20} /></>}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: '#64748b' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#4f46e5', fontWeight: '600' }}>Sign up free</Link>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              🔒 Secure Connection &bull; SSL Encrypted
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .brand-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
