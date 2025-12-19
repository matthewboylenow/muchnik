'use client';

import { useState, useEffect } from 'react';
import { formatDate, formatPhoneNumber } from '@/lib/utils';

interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  caseDescription: string | null;
  howDidYouHear: string | null;
  read: boolean;
  createdAt: Date;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/submissions');
      if (!res.ok) throw new Error('Failed to fetch submissions');

      const data = await res.json();
      setSubmissions(
        data.map((s: Submission) => ({
          ...s,
          createdAt: new Date(s.createdAt),
        }))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load submissions'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentRead }),
      });

      if (!res.ok) throw new Error('Failed to update submission');

      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, read: !currentRead } : s))
      );

      if (selectedSubmission?.id === id) {
        setSelectedSubmission((prev) =>
          prev ? { ...prev, read: !currentRead } : null
        );
      }
    } catch (err) {
      alert(
        err instanceof Error ? err.message : 'Failed to update submission'
      );
    }
  };

  const handleExport = () => {
    window.location.href = '/api/submissions/export';
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === 'unread') return !s.read;
    if (filter === 'read') return s.read;
    return true;
  });

  const unreadCount = submissions.filter((s) => !s.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-warm-gray">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy">
            Contact Submissions
          </h1>
          <p className="text-warm-gray mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread ${
                  unreadCount === 1 ? 'message' : 'messages'
                }`
              : 'All messages read'}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="bg-navy hover:bg-navy-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Export to CSV
        </button>
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
          All ({submissions.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-charcoal hover:bg-gray-200'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'read'
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-charcoal hover:bg-gray-200'
          }`}
        >
          Read ({submissions.length - unreadCount})
        </button>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-warm-gray text-lg">No submissions found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submissions List */}
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() => setSelectedSubmission(submission)}
                className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  selectedSubmission?.id === submission.id
                    ? 'border-gold shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                } ${!submission.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-navy">
                      {submission.firstName} {submission.lastName}
                    </h3>
                    <p className="text-sm text-warm-gray">
                      {submission.email}
                    </p>
                  </div>
                  {!submission.read && (
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-warm-gray">
                  {formatDate(submission.createdAt)}
                </p>
              </div>
            ))}
          </div>

          {/* Submission Detail */}
          {selectedSubmission ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-heading font-bold text-navy">
                  {selectedSubmission.firstName} {selectedSubmission.lastName}
                </h2>
                <button
                  onClick={() =>
                    toggleRead(selectedSubmission.id, selectedSubmission.read)
                  }
                  className="text-sm text-gold hover:text-gold-dark font-medium"
                >
                  Mark as {selectedSubmission.read ? 'Unread' : 'Read'}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-warm-gray block mb-1">
                    Email
                  </label>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="text-navy hover:text-navy-dark"
                  >
                    {selectedSubmission.email}
                  </a>
                </div>

                {selectedSubmission.phone && (
                  <div>
                    <label className="text-sm font-medium text-warm-gray block mb-1">
                      Phone
                    </label>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="text-navy hover:text-navy-dark"
                    >
                      {formatPhoneNumber(selectedSubmission.phone)}
                    </a>
                  </div>
                )}

                {selectedSubmission.howDidYouHear && (
                  <div>
                    <label className="text-sm font-medium text-warm-gray block mb-1">
                      How They Heard About Us
                    </label>
                    <p className="text-charcoal">
                      {selectedSubmission.howDidYouHear}
                    </p>
                  </div>
                )}

                {selectedSubmission.caseDescription && (
                  <div>
                    <label className="text-sm font-medium text-warm-gray block mb-1">
                      Case Description
                    </label>
                    <p className="text-charcoal whitespace-pre-wrap">
                      {selectedSubmission.caseDescription}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <label className="text-sm font-medium text-warm-gray block mb-1">
                    Submitted
                  </label>
                  <p className="text-charcoal">
                    {formatDate(selectedSubmission.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center flex items-center justify-center">
              <p className="text-warm-gray">
                Select a submission to view details
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
