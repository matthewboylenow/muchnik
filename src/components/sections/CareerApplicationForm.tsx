'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const positions = [
  'Attorney',
  'Paralegal',
  'Legal Assistant',
  'Finance Manager',
  'Administrative, HR, Operations',
  'Marketing',
  'IT Support',
  'Intern',
  'Virtual Assistant',
  'Other',
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resumeLink: string;
}

export function CareerApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resumeLink: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        message: '',
        resumeLink: '',
      });

      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <Input
          label="Last Name"
          type="text"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </div>

      <Input
        label="Email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-charcoal mb-1">
          Position of Interest
        </label>
        <select
          id="position"
          required
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
        >
          <option value="">Select a position</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Link to Resume (Google Drive, Dropbox, LinkedIn, etc.)"
        type="url"
        value={formData.resumeLink}
        onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
      />

      <Textarea
        label="Cover Letter / Additional Information"
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full"
          size="lg"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
        </Button>
      </motion.div>

      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-center font-medium"
        >
          Thank you for your application! We will review it and be in touch if your qualifications match our current needs.
        </motion.p>
      )}

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-center font-medium"
        >
          Something went wrong. Please try again.
        </motion.p>
      )}
    </form>
  );
}
