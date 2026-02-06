'use client';

import { useState } from 'react';

interface ParsedPost {
  wpId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  status: string;
  postType: string;
  featuredImageUrl: string;
  metaTitle: string;
  metaDescription: string;
  categories: string[];
  tags: string[];
}

export default function WordPressImportPage() {
  const [posts, setPosts] = useState<ParsedPost[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [duplicateHandling, setDuplicateHandling] = useState<'skip' | 'overwrite'>('skip');
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<{
    successCount: number;
    skipCount: number;
    errorCount: number;
    errors: string[];
  } | null>(null);
  const [error, setError] = useState('');

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsing(true);
    setError('');
    setPosts([]);
    setResults(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/wordpress-import', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to parse file');
      }

      const data = await res.json();
      setPosts(data.posts);
      setSelected(new Set(data.posts.map((p: ParsedPost) => p.wpId)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
    } finally {
      setParsing(false);
    }
  }

  function toggleSelect(wpId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(wpId)) next.delete(wpId);
      else next.add(wpId);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(posts.map((p) => p.wpId)));
  }

  function deselectAll() {
    setSelected(new Set());
  }

  async function handleImport() {
    setImporting(true);
    setError('');
    setResults(null);

    const selectedPosts = posts.filter((p) => selected.has(p.wpId));

    try {
      const res = await fetch('/api/wordpress-import/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedPosts, duplicateHandling }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Import failed');
      }

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">WordPress Import</h1>

      {/* File Upload */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="font-heading text-xl font-bold text-navy mb-4">Upload WXR Export File</h2>
        <p className="text-warm-gray mb-4">
          Export your WordPress content via Tools &rarr; Export in your WordPress admin, then upload the .xml file here.
        </p>
        <input
          type="file"
          accept=".xml"
          onChange={handleFileUpload}
          disabled={parsing || importing}
          className="block w-full text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-navy file:text-white hover:file:bg-navy-dark"
        />
        {parsing && <p className="mt-2 text-warm-gray">Parsing file...</p>}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="font-heading text-lg font-bold text-green-800 mb-2">Import Complete</h3>
          <div className="space-y-1 text-green-700">
            <p>Successfully imported: {results.successCount}</p>
            <p>Skipped (duplicates): {results.skipCount}</p>
            <p>Errors: {results.errorCount}</p>
          </div>
          {results.errors.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-red-700">Errors:</p>
              <ul className="list-disc pl-5 text-sm text-red-600">
                {results.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Posts Preview */}
      {posts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold text-navy">
              Found {posts.length} posts
            </h2>
            <div className="flex items-center gap-4">
              <button onClick={selectAll} className="text-sm text-gold hover:text-gold-dark">
                Select All
              </button>
              <button onClick={deselectAll} className="text-sm text-gold hover:text-gold-dark">
                Deselect All
              </button>
            </div>
          </div>

          {/* Duplicate handling */}
          <div className="mb-4 flex items-center gap-4">
            <span className="text-sm font-medium text-charcoal">Duplicate handling:</span>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="duplicates"
                checked={duplicateHandling === 'skip'}
                onChange={() => setDuplicateHandling('skip')}
              />
              Skip duplicates
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="duplicates"
                checked={duplicateHandling === 'overwrite'}
                onChange={() => setDuplicateHandling('overwrite')}
              />
              Overwrite duplicates
            </label>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-warm-gray">
                  <th className="pb-2 pr-4 w-8"></th>
                  <th className="pb-2 pr-4">Title</th>
                  <th className="pb-2 pr-4">Slug</th>
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2 pr-4">Image</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.wpId} className="border-b hover:bg-gray-50">
                    <td className="py-2 pr-4">
                      <input
                        type="checkbox"
                        checked={selected.has(post.wpId)}
                        onChange={() => toggleSelect(post.wpId)}
                      />
                    </td>
                    <td className="py-2 pr-4 font-medium text-navy">{post.title}</td>
                    <td className="py-2 pr-4 text-warm-gray">{post.slug}</td>
                    <td className="py-2 pr-4 text-warm-gray">
                      {post.date ? new Date(post.date).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-2 pr-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      {post.featuredImageUrl ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Import Button */}
          <div className="mt-6">
            <button
              onClick={handleImport}
              disabled={importing || selected.size === 0}
              className="px-6 py-3 bg-navy text-white rounded-lg font-semibold hover:bg-navy-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {importing ? `Importing ${selected.size} posts...` : `Import ${selected.size} Selected Posts`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
