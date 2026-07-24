import { useState, useCallback } from "react";
import { UploadCloud, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
import { useToast } from "../components/Toast";
import API from "../services/api";

export default function PdfUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isDragOver, setIsDragOver] = useState(false);
  const toast = useToast();

  // Drag & drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (!droppedFile.name.toLowerCase().endsWith(".pdf")) {
        setStatus({ type: "error", message: "Only PDF files are allowed." });
        return;
      }
      setFile(droppedFile);
      setStatus({ type: "", message: "" });
    }
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setStatus({ type: "", message: "" });
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setStatus({ type: "", message: "" });
  };

  const upload = async () => {
    if (!file) {
      setStatus({ type: "error", message: "Please select a file first" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await API.post("/pdf/upload", form);
      setStatus({ type: "success", message: `"${file.name}" uploaded successfully!` });
      toast(`Document uploaded: ${file.name}`, "success");
      setFile(null);
      if (onUploadSuccess) onUploadSuccess(res.data);
    } catch (err) {
      const msg = err.response?.data?.detail || "Upload failed. Please login first.";
      setStatus({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '8px' }}>
          <UploadCloud size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.15rem', marginBottom: 0 }}>Upload Document</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>PDF files only · Max 20MB</p>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        className={`drop-zone${isDragOver ? ' drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && document.getElementById('fileInput').click()}
        style={{ cursor: file ? 'default' : 'pointer' }}
      >
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept=".pdf"
        />

        {file ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <FileText size={52} color="var(--color-primary)" />
              <button
                onClick={clearFile}
                style={{
                  position: 'absolute', top: -8, right: -8,
                  background: '#ef4444', border: 'none', borderRadius: '50%',
                  width: 22, height: 22, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', color: 'white', padding: 0
                }}
              >
                <X size={12} />
              </button>
            </div>
            <p style={{ fontWeight: '600', color: 'var(--color-text-main)', marginTop: '0.25rem' }}>{file.name}</p>
            <p className="text-muted" style={{ fontSize: '0.8125rem' }}>{formatSize(file.size)}</p>
            <span style={{
              fontSize: '0.72rem', padding: '2px 10px', background: '#dcfce7',
              color: '#15803d', borderRadius: '99px', fontWeight: '600'
            }}>
              Ready to upload
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1rem 0' }}>
            <UploadCloud size={52} color={isDragOver ? 'var(--color-primary)' : 'var(--color-text-muted)'} style={{ transition: 'color 0.2s' }} />
            <div>
              <p style={{ fontWeight: '600', color: isDragOver ? 'var(--color-primary)' : 'var(--color-text-muted)', textAlign: 'center' }}>
                {isDragOver ? 'Drop it here!' : 'Drag & drop your PDF here'}
              </p>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '0.25rem' }}>
                or <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>click to browse</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={upload}
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '1.25rem', gap: '8px' }}
        disabled={loading || !file}
      >
        {loading ? (
          <>
            <span className="spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
            Uploading...
          </>
        ) : (
          <><UploadCloud size={18} /> Upload & Analyze</>
        )}
      </button>

      {status.message && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: status.type === 'error' ? '#fef2f2' : '#f0fdf4',
          color: status.type === 'error' ? '#dc2626' : '#15803d',
          border: `1px solid ${status.type === 'error' ? '#fca5a5' : '#86efac'}`
        }}>
          {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
          <span style={{ fontSize: '0.875rem' }}>{status.message}</span>
        </div>
      )}
    </div>
  );
}
