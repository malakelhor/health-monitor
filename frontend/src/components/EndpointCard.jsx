import { useState } from 'react';
import { pingEndpoint, deleteEndpoint, getHistory } from '../api/client';
import HistoryChart from './HistoryChart';

const statusColor = { up: '#22c55e', slow: '#f59e0b', down: '#ef4444' };
const statusBg = { up: '#f0fdf4', slow: '#fffbeb', down: '#fef2f2' };

export default function EndpointCard({ endpoint, onDeleted }) {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handlePing = async () => {
    setLoading(true);
    const res = await pingEndpoint(endpoint._id);
    setResult(res.data);
    setLoading(false);
  };

  const handleHistory = async () => {
    if (!showHistory) {
      const res = await getHistory(endpoint._id);
      setHistory(res.data);
    }
    setShowHistory(!showHistory);
  };

  const handleDelete = async () => {
    await deleteEndpoint(endpoint._id);
    onDeleted();
  };

  const status = result?.status || 'up';

  return (
    <div style={{ background: statusBg[status], border: `1px solid ${statusColor[status]}`, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '15px' }}>{endpoint.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{endpoint.url}</div>
        </div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: statusColor[status] }} />
      </div>

      {result && (
        <div style={{ fontSize: '13px', color: '#444' }}>
          {result.statusCode} · {result.responseTime}ms · <strong style={{ color: statusColor[status] }}>{result.status}</strong>
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handlePing} disabled={loading}
          style={{ padding: '6px 14px', borderRadius: '8px', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
          {loading ? 'Pinging...' : 'Ping'}
        </button>
        <button onClick={handleHistory}
          style={{ padding: '6px 14px', borderRadius: '8px', background: '#e0e7ff', color: '#4f46e5', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
          {showHistory ? 'Hide' : 'History'}
        </button>
        <button onClick={handleDelete}
          style={{ padding: '6px 14px', borderRadius: '8px', background: '#fee2e2', color: '#ef4444', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
          Delete
        </button>
      </div>

      {showHistory && history.length > 0 && <HistoryChart data={history} />}
    </div>
  );
}