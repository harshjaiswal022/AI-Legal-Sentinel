import React, { useState } from "react";
import { ArrowRight, Scale, Shield, Sparkles, Send } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await API.post("/ai/ask", { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("API Error:", error);
      setAnswer("Unable to connect to the legal service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcut: Ctrl+Enter to submit
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      askQuestion();
    }
  };

  const sections = answer ? answer.split(/\n(?=[A-Za-z ]+:)/) : [];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ padding: '4rem 0 6rem 0', textAlign: 'center', position: 'relative' }}>
        <div className="animate-float" style={{
          position: 'absolute', top: '-10%', left: '10%', width: '300px', height: '300px',
          background: 'var(--gradient-primary)', filter: 'blur(100px)', opacity: 0.2, zIndex: -1
        }}></div>

        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          background: 'rgba(99, 102, 241, 0.1)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--color-primary)',
          fontWeight: '600',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          ✨ Next-Gen Legal Assistance
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          marginBottom: '1.5rem',
          background: 'linear-gradient(to right, #1e293b, #4f46e5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }}>
          Justice, Simplified.
        </h1>

        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          Your intelligent companion for legal guidance. Get instant answers and document analysis powered by AI.
        </p>

        <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Get Started <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </Link>
          <a href="#ask" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', background: 'rgba(255,255,255,0.8)' }}>
            Try Quick Ask
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ marginBottom: '6rem', gap: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <FeatureCard
          icon={<Shield size={32} color="var(--color-primary)" />}
          title="Secure & Private"
          description="Enterprise-grade security ensuring your legal data remains confidential and protected at all times."
        />
        <FeatureCard
          icon={<Sparkles size={32} color="#a855f7" />}
          title="Instant Insights"
          description="Get immediate, AI-powered feedback on complex legal queries and document risk summaries."
        />
        <FeatureCard
          icon={<Scale size={32} color="#06b6d4" />}
          title="Legally Trained"
          description="Our models are fine-tuned on vast legal libraries to provide accurate, actionable context."
        />
      </section>

      {/* Quick Ask Section */}
      <section id="ask" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="glass-card">
          <div className="text-center mb-4">
            {/* Bug fix: removed bare className attribute */}
            <h2 style={{ fontSize: '2rem' }}>Ask a Legal Question</h2>
            <p className="text-muted">
              Describe your situation in plain English. No legalese required.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <textarea
              className="input-field"
              placeholder="Example: I was involved in a car accident where the other driver was at fault. What are my first steps?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                minHeight: "180px",
                resize: "vertical",
                padding: '1.5rem',
                paddingBottom: '4rem',
                fontSize: '1.0625rem',
                lineHeight: 1.6,
                background: 'white',
                // Bug fix: was 'inner' — correct CSS value is 'inset'
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }}
              spellCheck="false"
            />
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', opacity: 0.7 }}>Ctrl+Enter</span>
              <button
                onClick={askQuestion}
                className="btn btn-primary"
                style={{ padding: '0.625rem 1.25rem', fontSize: '0.9375rem' }}
                disabled={loading || !question.trim()}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
                    Analyzing...
                  </span>
                ) : (
                  <><Send size={16} style={{ marginRight: 6 }} /> Get Guidance</>
                )}
              </button>
            </div>
          </div>

          {answer && (
            <div className="animate-fade-in" style={{ marginTop: '3rem' }}>
              <h3 style={{ borderBottom: '1px solid var(--color-glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scale size={20} color="var(--color-primary)" />
                Legal Guidance
              </h3>
              {sections.length > 0 ? sections.map((section, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "1rem",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-glass-border)",
                    whiteSpace: "pre-line",
                    lineHeight: 1.7,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                  }}
                >
                  {section}
                </div>
              )) : (
                <div style={{
                  background: "rgba(255,255,255,0.6)",
                  padding: "1.5rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-glass-border)",
                  whiteSpace: "pre-line",
                  lineHeight: 1.7
                }}>
                  {answer}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'left', border: '1px solid rgba(255,255,255,0.6)' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.8)',
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}
