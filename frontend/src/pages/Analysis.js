import { useState } from "react";
import {
  FileSearch, RefreshCw, AlertTriangle, CheckCircle, Info,
  Copy, Check, Globe
} from "lucide-react";
import { useToast } from "../components/Toast";
import API from "../services/api";

export default function Analysis() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("English");
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const analyze = async () => {
    setLoading(true);
    setAnalysis(null);
    setError(null);
    try {
      const res = await API.get(`/ai/analyze-latest?language=${language}`);
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setAnalysis(res.data);
      }
    } catch (err) {
      // Bug fix: log the actual error instead of swallowing it
      console.error("Analysis error:", err);
      setError("Please upload a PDF first or check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Copy AI summary to clipboard
  const copyToClipboard = async () => {
    const text = analysis?.analysis?.llm_analysis || analysis?.analysis?.rule_based?.summary || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast("Analysis copied to clipboard!", "success", 2500);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast("Clipboard access denied.", "error");
    }
  };

  // Risk badge color
  const getRiskColor = (severity) => {
    const s = severity?.toLowerCase();
    if (s === 'high' || s === 'critical') return '#ef4444';
    if (s === 'medium') return '#f59e0b';
    return '#3b82f6';
  };

  const getRiskBgClass = (severity) => {
    const s = severity?.toLowerCase();
    if (s === 'high' || s === 'critical') return 'badge-high';
    if (s === 'medium') return 'badge-medium';
    return 'badge-low';
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#f3e8ff', padding: '8px', borderRadius: '8px' }}>
            <FileSearch size={24} color="#9333ea" />
          </div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 0 }}>AI Analysis</h2>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Language selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.8)', border: '1px solid var(--color-glass-border)', borderRadius: 'var(--radius-full)', padding: '4px 12px' }}>
            <Globe size={14} color="var(--color-text-muted)" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontSize: '0.8125rem', color: 'var(--color-text-main)', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
            </select>
          </div>

          <button
            onClick={analyze}
            className="btn btn-secondary"
            disabled={loading}
            style={{ padding: '6px 14px', fontSize: '0.8125rem', gap: '6px', display: 'flex', alignItems: 'center' }}
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-glass-border)',
        padding: '1.5rem',
        minHeight: '300px',
        maxHeight: '620px',
        overflowY: 'auto',
        backdropFilter: 'blur(8px)'
      }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-muted" style={{ minHeight: '200px' }}>
            <RefreshCw size={36} className="spin mb-4" style={{ color: 'var(--color-primary)' }} />
            <p style={{ fontWeight: '500' }}>Analyzing document with AI...</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>This may take a few seconds</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-muted" style={{ minHeight: '200px' }}>
            <AlertTriangle size={36} color="var(--color-error, #ef4444)" style={{ marginBottom: '1rem' }} />
            <p style={{ color: 'var(--color-text-main)', fontWeight: '500', textAlign: 'center' }}>{error}</p>
            <button className="btn btn-secondary mt-4" onClick={analyze} style={{ fontSize: '0.875rem' }}>
              Try Again
            </button>
          </div>
        ) : analysis ? (
          <div className="animate-fade-in">
            {/* Document Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Document</p>
                <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>{analysis.filename}</p>
                {analysis.analysis?.rule_based?.document_type && (
                  <span style={{
                    display: 'inline-block', marginTop: '4px', fontSize: '0.72rem', fontWeight: '700',
                    background: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)',
                    padding: '2px 10px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>
                    {analysis.analysis.rule_based.document_type}
                  </span>
                )}
              </div>
              {/* Risk count badge */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  background: '#fff7ed', border: '1px solid #fed7aa',
                  borderRadius: '12px', padding: '0.5rem 1rem', display: 'inline-block'
                }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#c2410c', lineHeight: 1 }}>
                    {analysis.analysis?.rule_based?.risk_count ?? 0}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#9a3412', fontWeight: '600', marginTop: '2px' }}>RISKS</p>
                </div>
              </div>
            </div>

            {/* AI Summary Section */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', margin: 0 }}>
                  <Info size={18} color="var(--color-primary)" /> AI Summary
                </h3>
                {/* Copy to clipboard button */}
                <button
                  onClick={copyToClipboard}
                  className="btn btn-ghost"
                  style={{ padding: '4px 10px', fontSize: '0.8rem', gap: '5px', display: 'flex', alignItems: 'center' }}
                  title="Copy analysis to clipboard"
                >
                  {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
                fontSize: '0.9375rem',
                color: 'var(--color-text-main)'
              }}>
                {analysis.analysis?.llm_analysis || analysis.analysis?.rule_based?.summary || "No summary available."}
              </div>
            </div>

            {/* Risks Section */}
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', marginBottom: '0.875rem' }}>
                <AlertTriangle size={18} color="#f59e0b" /> Detected Risks
              </h3>

              {analysis.analysis?.rule_based?.risks?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {analysis.analysis.rule_based.risks.map((risk, idx) => (
                    <div key={idx} style={{
                      background: 'white',
                      borderLeft: `4px solid ${getRiskColor(risk.severity)}`,
                      padding: '1rem 1.25rem',
                      borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.5rem' }}>
                        <span style={{ fontWeight: '700', color: 'var(--color-text-main)' }}>
                          {/* Keyword highlighting — new feature */}
                          <span className="risk-keyword">{risk.keyword}</span>
                        </span>
                        <span className={`badge ${getRiskBgClass(risk.severity)}`}>
                          {risk.severity}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                        {risk.suggestion || risk.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  background: '#f0fdf4',
                  color: '#15803d',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid #86efac'
                }}>
                  <CheckCircle size={20} />
                  <span style={{ fontWeight: '500' }}>No significant risks detected in this document.</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted" style={{ minHeight: '200px' }}>
            <FileSearch size={52} style={{ opacity: 0.15, marginBottom: '1rem' }} />
            <p style={{ fontWeight: '500' }}>No analysis loaded yet.</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.25rem', marginBottom: '1.25rem' }}>Upload a PDF and click Analyze to get started.</p>
            <button className="btn btn-primary" onClick={analyze} style={{ fontSize: '0.9rem', padding: '0.625rem 1.5rem' }}>
              Load Latest Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
