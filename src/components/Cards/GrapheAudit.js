import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DonneesAudit = [
  { name: 'Conformes', value: 5 },
  { name: 'Non-Conformes', value: 2 },
  { name: 'En Attente', value: 1 },
];

const COLORS = ['#00C49F', '#FF8042', '#FFD700']; // Couleurs pour Conforme, Non Conforme, En attente

export default function GrapheAudit() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={DonneesAudit}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {DonneesAudit.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
