import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HistoryChart({ data }) {
  const formatted = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString(),
    ms: d.responseTime,
    status: d.status
  })).reverse();

  return (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart data={formatted}>
        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} unit="ms" />
        <Tooltip formatter={(v) => `${v}ms`} />
        <Line type="monotone" dataKey="ms" stroke="#4f46e5" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}