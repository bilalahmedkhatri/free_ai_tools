'use client';

import { useVisitorStats } from '../hooks/useVisitorStats';
import { designSystem as ds } from '../lib/designSystem';
import LoadingSkeleton from './LoadingSkeleton';

const VisitorStats = () => {
  const { stats, isLoading, error } = useVisitorStats();

  if (isLoading) {
    return <LoadingSkeleton variant="table" />;
  }

  if (error) {
    return <p style={{ color: ds.colors.error, textAlign: 'center' }}>{error}</p>;
  }

  if (stats.length === 0) {
    return <p style={{ textAlign: 'center', color: ds.colors.gray[500] }}>No visitor data available yet.</p>;
  }

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: ds.typography.fonts.body,
        fontSize: ds.typography.sizes.sm,
      }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${ds.colors.gray[200]}` }}>
            <th style={{
              padding: ds.spacing.md,
              textAlign: 'left',
              fontWeight: ds.typography.weights.semibold,
              color: ds.colors.gray[600],
            }}>Country</th>
            <th style={{
              padding: ds.spacing.md,
              textAlign: 'left',
              fontWeight: ds.typography.weights.semibold,
              color: ds.colors.gray[600],
            }}>City</th>
            <th style={{
              padding: ds.spacing.md,
              textAlign: 'right',
              fontWeight: ds.typography.weights.semibold,
              color: ds.colors.gray[600],
            }}>Visitors</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={`${stat.country}-${stat.city}-${index}`} style={{ borderBottom: `1px solid ${ds.colors.gray[100]}` }}>
              <td style={{
                padding: ds.spacing.md,
                color: ds.colors.gray[800],
              }}>{stat.country}</td>
              <td style={{
                padding: ds.spacing.md,
                color: ds.colors.gray[800],
              }}>{stat.city}</td>
              <td style={{
                padding: ds.spacing.md,
                textAlign: 'right',
                color: ds.colors.gray[800],
                fontWeight: ds.typography.weights.medium,
              }}>
                {stat.count.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorStats;