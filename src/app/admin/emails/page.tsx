'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';

interface EmailLog {
  id: string;
  toAddress: string;
  subject: string;
  type: string;
  status: string;
  messageId: string | null;
  error: string | null;
  createdAt: Date;
}

export default function EmailLogsPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'sent' | 'failed'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/emails');
      if (!res.ok) throw new Error('Failed to fetch email logs');

      const data = await res.json();
      setLogs(
        data.map((log: EmailLog) => ({
          ...log,
          createdAt: new Date(log.createdAt),
        }))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load email logs'
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === 'sent') return log.status === 'sent';
    if (filter === 'failed') return log.status === 'failed';
    return true;
  });

  const sentCount = logs.filter((l) => l.status === 'sent').length;
  const failedCount = logs.filter((l) => l.status === 'failed').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-warm-gray">Loading email logs...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-navy">
          Email Log
        </h1>
        <p className="text-warm-gray mt-1">
          {sentCount} sent, {failedCount} failed
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-charcoal hover:bg-gray-200'
          }`}
        >
          All ({logs.length})
        </button>
        <button
          onClick={() => setFilter('sent')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'sent'
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-charcoal hover:bg-gray-200'
          }`}
        >
          Sent ({sentCount})
        </button>
        <button
          onClick={() => setFilter('failed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'failed'
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-charcoal hover:bg-gray-200'
          }`}
        >
          Failed ({failedCount})
        </button>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-warm-gray text-lg">No email logs found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-warm-gray">Date</th>
                <th className="px-4 py-3 text-sm font-medium text-warm-gray">To</th>
                <th className="px-4 py-3 text-sm font-medium text-warm-gray">Subject</th>
                <th className="px-4 py-3 text-sm font-medium text-warm-gray">Type</th>
                <th className="px-4 py-3 text-sm font-medium text-warm-gray">Status</th>
                <th className="px-4 py-3 text-sm font-medium text-warm-gray">Message ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <>
                  <tr
                    key={log.id}
                    className={`hover:bg-gray-50 ${log.status === 'failed' ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      if (log.status === 'failed') {
                        setExpandedId(expandedId === log.id ? null : log.id);
                      }
                    }}
                  >
                    <td className="px-4 py-3 text-sm text-charcoal whitespace-nowrap">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-sm text-charcoal">
                      {log.toAddress}
                    </td>
                    <td className="px-4 py-3 text-sm text-charcoal max-w-xs truncate">
                      {log.subject}
                    </td>
                    <td className="px-4 py-3 text-sm text-charcoal whitespace-nowrap">
                      <span className="px-2 py-1 rounded bg-gray-100 text-xs">
                        {log.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          log.status === 'sent'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-warm-gray font-mono text-xs max-w-[200px] truncate">
                      {log.messageId || '—'}
                    </td>
                  </tr>
                  {log.status === 'failed' && expandedId === log.id && (
                    <tr key={`${log.id}-error`}>
                      <td colSpan={6} className="px-4 py-3 bg-red-50">
                        <p className="text-sm text-red-800">
                          <span className="font-semibold">Error: </span>
                          {log.error}
                        </p>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
