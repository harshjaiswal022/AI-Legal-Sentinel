import React, { useState, useEffect } from 'react';
import PdfUpload from './PdfUpload';
import Analysis from './Analysis';
import API from '../services/api';
import { FileText, Clock, RefreshCw, BarChart3 } from 'lucide-react';

export default function Dashboard() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [documents, setDocuments] = useState([]);
    const [docsLoading, setDocsLoading] = useState(true);
    const userName = localStorage.getItem('user_name');

    const fetchDocuments = async () => {
        setDocsLoading(true);
        try {
            const res = await API.get('/pdf/list');
            setDocuments(res.data.documents || []);
        } catch (err) {
            console.error('Failed to load documents:', err);
        } finally {
            setDocsLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [refreshTrigger]);

    const handleUploadSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const formatDate = (iso) => {
        if (!iso) return 'Unknown date';
        return new Date(iso).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
                <p style={{ color: 'var(--color-primary)', fontWeight: '600', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                    Welcome back 👋
                </p>
                <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    {userName ? `Hello, ${userName}` : 'Your Dashboard'}
                </h1>
                <p className="text-muted" style={{ fontSize: '1.0625rem' }}>
                    Upload, analyze, and manage your legal documents with AI.
                </p>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <StatCard icon={<FileText size={22} color="#6366f1" />} value={documents.length} label="Documents Uploaded" />
                <StatCard icon={<BarChart3 size={22} color="#a855f7" />} value={documents.length > 0 ? "Active" : "—"} label="Analysis Status" />
                <StatCard icon={<Clock size={22} color="#06b6d4" />} value={documents[0] ? formatDate(documents[0].uploaded_at).split(',')[0] : "—"} label="Last Upload" />
            </div>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2rem' }}>

                {/* Upload + History Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ height: 'fit-content' }}>
                        <PdfUpload onUploadSuccess={handleUploadSuccess} />
                    </div>

                    {/* Document History */}
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: '#ede9fe', padding: '8px', borderRadius: '8px' }}>
                                    <Clock size={20} color="#7c3aed" />
                                </div>
                                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Upload History</h3>
                            </div>
                            <button
                                onClick={fetchDocuments}
                                className="btn btn-ghost"
                                style={{ padding: '6px 10px', fontSize: '0.8rem', gap: '4px', display: 'flex', alignItems: 'center' }}
                            >
                                <RefreshCw size={14} className={docsLoading ? 'spin' : ''} />
                                Refresh
                            </button>
                        </div>

                        {docsLoading ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                                <RefreshCw size={24} className="spin" style={{ margin: '0 auto 0.5rem', display: 'block' }} />
                                <p style={{ fontSize: '0.875rem' }}>Loading history...</p>
                            </div>
                        ) : documents.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                                <FileText size={36} style={{ opacity: 0.2, margin: '0 auto 0.75rem', display: 'block' }} />
                                <p style={{ fontSize: '0.9rem' }}>No documents yet. Upload your first PDF above.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', maxHeight: '280px', overflowY: 'auto' }}>
                                {documents.map((doc, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '0.75rem 1rem',
                                        background: i === 0 ? 'rgba(99, 102, 241, 0.06)' : 'rgba(255,255,255,0.6)',
                                        borderRadius: 'var(--radius-md)',
                                        border: i === 0 ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid var(--color-glass-border)',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        <div style={{ background: i === 0 ? '#ede9fe' : '#f1f5f9', padding: '6px', borderRadius: '8px', flexShrink: 0 }}>
                                            <FileText size={16} color={i === 0 ? '#7c3aed' : '#64748b'} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {doc.filename}
                                            </p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                                {formatDate(doc.uploaded_at)}
                                            </p>
                                        </div>
                                        {i === 0 && (
                                            <span style={{
                                                fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase',
                                                background: '#ede9fe', color: '#7c3aed', padding: '2px 8px', borderRadius: '99px', flexShrink: 0
                                            }}>
                                                Latest
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Analysis Panel */}
                <div className="glass-card" style={{ minHeight: '600px' }}>
                    <Analysis key={refreshTrigger} />
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, value, label }) {
    return (
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '1.375rem', fontWeight: '700', color: 'var(--color-text-main)', lineHeight: 1.2 }}>{value}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{label}</p>
            </div>
        </div>
    );
}
