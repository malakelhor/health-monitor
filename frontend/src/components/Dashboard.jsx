import { useEffect, useState } from 'react';
import { getEndpoints } from '../api/client';
import EndpointCard from './EndpointCard';
import AddEndpointForm from './AddEndpointForm';

export default function Dashboard() {
  const [endpoints, setEndpoints] = useState([]);

  const load = async () => {
    const res = await getEndpoints();
    setEndpoints(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>API Health Monitor</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Track uptime and response time for your endpoints</p>
      <AddEndpointForm onAdded={load} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {endpoints.map(ep => <EndpointCard key={ep._id} endpoint={ep} onDeleted={load} />)}
      </div>
    </div>
  );
}