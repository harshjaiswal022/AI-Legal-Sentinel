import React from 'react';

export default function About() {
  return (
    <div className="animate-fade-in" style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <div className="glass-card">
        <h1 style={{ marginBottom: "1.5rem", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          About LegalAI
        </h1>

        <p style={{ marginTop: "15px", color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: '1.1rem' }}>
          LegalAI is a next-generation intelligent platform engineered to democratize legal 
          awareness. We empower individuals and modern businesses to seamlessly navigate 
          complex legal landscapes before they escalate into serious issues.
        </p>

        <p style={{ marginTop: "15px", color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: '1.1rem' }}>
          While our platform does not replace the critical role of human counsel, it serves 
          as a powerful first step—providing you with instant, AI-driven legal insights so 
          you can take informed and responsible actions with confidence.
        </p>

        <div style={{ marginTop: "40px", padding: "2rem", background: "rgba(255,255,255,0.5)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-glass-border)" }}>
          <h3 style={{ marginBottom: "1rem" }}>⚠️ Disclaimer</h3>
          <p style={{ color: "var(--color-text-main)", lineHeight: "1.7" }}>
            This application provides legal awareness and informational guidance only.
            It does not constitute legal advice. Users are strongly advised to consult
            qualified legal professionals or official government authorities for
            case-specific decisions.
          </p>
        </div>

        <h3 style={{ marginTop: "40px", marginBottom: "1rem" }}>Our Vision for the Future</h3>

        <ul style={{ lineHeight: "1.8", color: "var(--color-text-muted)", paddingLeft: "1.5rem" }}>
          <li>Expanding multilingual capabilities for deeper regional accessibility</li>
          <li>Direct integration with verified government and institutional legal portals</li>
          <li>Specialized, deep-dive assistance tailored for criminal, civil, and corporate law</li>
          <li>Automated compliance auditing and real-time document risk detection</li>
        </ul>

        <p style={{ marginTop: "40px", fontStyle: "italic", color: "var(--color-text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
          Driven by a commitment to social impact through the responsible application of advanced AI.
        </p>
      </div>
    </div>
  );
}
