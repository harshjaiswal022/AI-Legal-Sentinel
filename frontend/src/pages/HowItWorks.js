import React from 'react';
import { MessageSquare, Server, Cpu, FileText, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="animate-fade-in" style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <div className="glass-card">
        <h1 style={{ marginBottom: "2rem", textAlign: "center", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          How LegalAI Works
        </h1>

        <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: '1.2rem', marginBottom: '3rem' }}>
          LegalAI synthesizes complex legal data into clear, structured, and actionable 
          insights for individuals and businesses alike.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Step
            number="1"
            title="User Query"
            desc="Enter your legal question, document, or scenario in everyday language."
            icon={<MessageSquare size={24} color="var(--color-primary)" />}
          />
          <Step
            number="2"
            title="Secure Transmission"
            desc="Your query is encrypted and instantly transmitted to our robust backend infrastructure."
            icon={<Server size={24} color="#a855f7" />}
          />
          <Step
            number="3"
            title="AI Analysis"
            desc="Our state-of-the-art LLM engine analyzes the context against established legal frameworks."
            icon={<Cpu size={24} color="#06b6d4" />}
          />
          <Step
            number="4"
            title="Structured Intelligence"
            desc="Results are dynamically organized into simple sections: core explanation, applicable laws, and risk assessment."
            icon={<FileText size={24} color="#ec4899" />}
          />
          <Step
            number="5"
            title="Actionable Guidance"
            desc="You receive empowering knowledge—stripping away jargon so you know exactly what your next steps should be."
            icon={<CheckCircle size={24} color="#22c55e" />}
          />
        </div>

        <p style={{ marginTop: "40px", textAlign: "center", color: "var(--color-text-muted)" }}>
          This approach ensures clarity, safety, and reliability even in complex legal situations.
        </p>
      </div>
    </div>
  );
}

function Step({ number, title, desc, icon }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1.5rem',
      padding: '1.5rem',
      background: 'rgba(255,255,255,0.5)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-glass-border)'
    }}>
      <div style={{
        background: 'white',
        minWidth: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: 'var(--color-text-main)'
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  )
}
