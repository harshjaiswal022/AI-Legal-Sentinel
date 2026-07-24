import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

export default function WhyUs() {
  return (
    <div className="animate-fade-in" style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <div className="glass-card">
        <h1 style={{ marginBottom: "1.5rem", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Why Choose LegalAI?
        </h1>

        <p style={{ marginTop: "15px", color: "var(--color-text-muted)", fontSize: '1.1rem', lineHeight: 1.7 }}>
          While traditional legal platforms cater exclusively to seasoned professionals, 
          LegalAI is meticulously engineered for the modern user. We replace overwhelming 
          complexity with absolute clarity, ensuring justice and knowledge are accessible to all.
        </p>

        <div style={{ marginTop: "40px" }}>
          <h3 style={{ marginBottom: '1.5rem' }}>What Makes Us Different</h3>

          <ul style={{ display: 'grid', gap: '1rem' }}>
            <FeatureItem title="Structured Precision" desc="Say goodbye to rambling text blocks. We deliver categorical, easy-to-read legal breakdowns." />
            <FeatureItem title="User-Centric Design" desc="An ethereal, fully responsive interface that feels as premium as the insights it provides." />
            <FeatureItem title="Action-Oriented Intelligence" desc="We don't just explain the law; we generate tactical next steps to help you move forward." />
            <FeatureItem title="Enterprise-Grade Reliability" desc="Built with modern AI fallback systems to maintain accuracy, security, and trust at every level." />
          </ul>
        </div>

        <div style={{ marginTop: "50px" }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Comparison with Existing Solutions</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: "rgba(99, 102, 241, 0.1)" }}>
                  <th style={th}>Feature</th>
                  <th style={th}>LegalAI</th>
                  <th style={th}>Generic Chatbots</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>Structured Output & Formatting</td>
                  <td style={td}><Check size={18} color="green" style={{ verticalAlign: 'middle' }} /> Guaranteed</td>
                  <td style={td}><X size={18} color="red" style={{ verticalAlign: 'middle' }} /> Inconsistent</td>
                </tr>
                <tr>
                  <td style={td}>Jargon-Free Explanations</td>
                  <td style={td}><Check size={18} color="green" style={{ verticalAlign: 'middle' }} /> Yes</td>
                  <td style={td}><X size={18} color="red" style={{ verticalAlign: 'middle' }} /> Often Academic</td>
                </tr>
                <tr>
                  <td style={td}>Actionable Next Steps</td>
                  <td style={td}><Check size={18} color="green" style={{ verticalAlign: 'middle' }} /> Yes</td>
                  <td style={td}><AlertCircle size={18} color="orange" style={{ verticalAlign: 'middle' }} /> Rare</td>
                </tr>
                <tr>
                  <td style={td}>Domain-Specific Logic</td>
                  <td style={td}><Check size={18} color="green" style={{ verticalAlign: 'middle' }} /> High Accuracy</td>
                  <td style={td}><X size={18} color="red" style={{ verticalAlign: 'middle' }} /> Broad/Generic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ title, desc }) {
  return (
    <li style={{
      background: 'rgba(255,255,255,0.6)',
      padding: '1rem',
      borderRadius: 'var(--radius-md)',
      listStyle: 'none',
      borderLeft: '4px solid var(--color-primary)'
    }}>
      <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--color-text-main)' }}>{title}</strong>
      <span style={{ color: 'var(--color-text-muted)' }}>{desc}</span>
    </li>
  )
}

const th = {
  padding: "16px",
  textAlign: "left",
  borderBottom: '2px solid var(--color-glass-border)',
  color: 'var(--color-text-main)',
  fontWeight: '600'
};

const td = {
  padding: "16px",
  borderBottom: "1px solid var(--color-glass-border)",
  color: 'var(--color-text-muted)'
};
