import { useState } from 'react';
import { addEndpoint } from '../api/client';

export default function AddEndpointForm({ onAdded }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !url) return;
    setLoading(true);
    await addEndpoint({ name, url });
    setName('');
    setUrl('');
    setLoading(false);
    onAdded();
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <input
        placeholder="Name (e.g. Google)"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc', flex: 1, minWidth: '140px' }}
      />
      <input
        placeholder="URL (e.g. https://google.com)"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc', flex: 2, minWidth: '200px' }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: '8px 20px', borderRadius: '8px', background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </div>
  );
}