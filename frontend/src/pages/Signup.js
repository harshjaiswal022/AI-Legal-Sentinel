import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";import { useToast } from "../components/Toast";
import API from "../services/api";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    // Password strength indicator
    const getPasswordStrength = () => {
        if (password.length === 0) return null;
        if (password.length < 8) return { label: "Too short", color: "#ef4444", width: "25%" };
        if (password.length < 10) return { label: "Weak", color: "#f59e0b", width: "50%" };
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { label: "Fair", color: "#f59e0b", width: "65%" };
        return { label: "Strong", color: "#22c55e", width: "100%" };
    };

    const strength = getPasswordStrength();

    const signup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        try {
            await API.post("/auth/signup", {
                email,
                password,
                full_name: fullName.trim() || undefined
            });

            // Bug fix: replaced alert() with toast notification
            toast("Account created successfully! Please sign in.", "success", 5000);
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || err.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            {/* Left Side - Brand Panel */}
            <div className="brand-panel" style={{
                flex: 1,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
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
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 30%)',
                    zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '12px' }}>
                            <UserPlus size={28} color="white" />
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>LegalAI</span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: 'white' }}>
                        Start your legal<br />journey today.
                    </h1>
                    <p style={{ fontSize: '1.125rem', opacity: 0.85, lineHeight: 1.6, marginBottom: '3rem' }}>
                        Join thousands of users getting instant, accurate legal guidance powered by advanced AI.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {['Instant Document Analysis', '24/7 AI Legal Assistant', 'Bank-Grade Security', 'Hindi & English Support'].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <CheckCircle size={20} color="#a5b4fc" />
                                <span style={{ fontSize: '1.05rem' }}>{item}</span>
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
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1e293b' }}>Create Account</h2>
                        <p style={{ color: '#64748b' }}>Start your free account in under a minute.</p>
                    </div>

                    {/* Bug fix: use XCircle for error, not rotated CheckCircle */}
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

                    <form onSubmit={signup}>
                        {/* Full Name field — new feature */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>
                                Full Name <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span>
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="e.g. Harsh Yadav"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    style={{ paddingLeft: '46px', fontSize: '1rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0.875rem 1rem 0.875rem 46px' }}
                                    autoComplete="name"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                <input
                                    className="input-field"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ paddingLeft: '46px', paddingRight: '46px', fontSize: '1rem', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0.875rem 46px' }}
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 0 }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Password strength bar */}
                            {strength && (
                                <div style={{ marginTop: '0.5rem' }}>
                                    <div style={{ height: '4px', borderRadius: '2px', background: '#f1f5f9', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s ease', borderRadius: '2px' }} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: strength.color, fontWeight: '600', marginTop: '0.25rem', display: 'block' }}>
                                        {strength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : <><UserPlus size={18} /> Create Account</>}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: '#64748b' }}>
                        Already have an account? <Link to="/login" style={{ color: '#4f46e5', fontWeight: '600' }}>Sign in</Link>
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
