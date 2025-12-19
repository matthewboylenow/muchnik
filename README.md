# Muchnik Elder Law Website Redesign - Project Specification

## Project Overview

Complete website redesign for Muchnik Elder Law P.C., a multi-location elder law firm with offices in Manhattan (NYC), Staten Island (NY), and Randolph (NJ). The site must be SEO-optimized, fully responsive, WCAG accessible, and include a custom admin panel for blog and video content management.

**Client**: Muchnik Elder Law P.C.  
**Developer**: Matthew (Adventii Media)  
**Tech Stack**: Next.js 15 (App Router), Tailwind CSS, NeonDB (Postgres), Vercel Blob, Resend  
**Deployment**: Vercel

---

## Progress Tracking

> **IMPORTANT**: Maintain a `PROGRESS.md` file in the project root. Update it after completing each major task with:
> - Date/time of completion
> - What was completed
> - Any issues encountered
> - Next steps
> - Current blockers (if any)

### Progress File Template

```markdown
# Muchnik Elder Law - Development Progress

## Current Status
[PHASE X] - [Current task description]

## Completed Tasks
- [ ] Task description - [Date] - [Notes]

## In Progress
- [ ] Current task

## Blockers
- None / [Description]

## Next Up
- [ ] Next task

## Environment Setup
- [ ] NeonDB connected
- [ ] Vercel Blob configured
- [ ] Resend API key added
- [ ] Admin credentials set

## Notes
[Any important decisions or deviations from spec]
```

---

## Phase 1: Project Setup & Configuration

### 1.1 Initialize Next.js 15 Project

```bash
npx create-next-app@latest muchnik-elderlaw --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd muchnik-elderlaw
```

### 1.2 Install Dependencies

```bash
# Database
npm install @neondatabase/serverless drizzle-orm
npm install -D drizzle-kit

# Authentication & Security
npm install bcryptjs iron-session
npm install -D @types/bcryptjs

# Rich Text Editor (for blog admin)
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder

# Email
npm install resend

# Maps
npm install react-leaflet leaflet
npm install -D @types/leaflet

# Utilities
npm install slugify date-fns clsx
npm install -D tailwind-merge

# Animations
npm install framer-motion

# CSV Export
npm install papaparse
npm install -D @types/papaparse
```

### 1.3 Environment Variables

Create `.env.local` (DO NOT COMMIT):

```env
# Database (NeonDB)
DATABASE_URL="postgresql://..."

# Vercel Blob
BLOB_READ_WRITE_TOKEN="..."

# Resend
RESEND_API_KEY="re_..."
CONTACT_EMAIL="kmuchnik@muchnikelderlaw.com"

# Admin Auth
ADMIN_SESSION_SECRET="[generate-32-char-random-string]"
SUPER_ADMIN_EMAIL="matthew@adventii.com"
SUPER_ADMIN_PASSWORD="[generate-secure-password]"

# Site
NEXT_PUBLIC_SITE_URL="https://muchnikelderlaw.com"
```

**Generate secure password for super admin:**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 1.4 Project Structure

```
src/
├── app/
│   ├── (public)/                 # Public-facing pages
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx
│   │   ├── practice-areas/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/page.tsx   # Individual post
│   │   ├── videos/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/                    # Admin panel
│   │   ├── layout.tsx            # Admin layout with auth check
│   │   ├── page.tsx              # Dashboard
│   │   ├── login/page.tsx
│   │   ├── posts/
│   │   │   ├── page.tsx          # List posts
│   │   │   ├── new/page.tsx      # Create post
│   │   │   └── [id]/edit/page.tsx
│   │   ├── videos/
│   │   │   ├── page.tsx
│   │   │   └── new/page.tsx
│   │   ├── submissions/
│   │   │   └── page.tsx          # Contact form submissions
│   │   └── users/
│   │       └── page.tsx          # Manage admin users
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── posts/route.ts
│   │   ├── videos/route.ts
│   │   ├── contact/route.ts
│   │   ├── submissions/
│   │   │   ├── route.ts
│   │   │   └── export/route.ts   # CSV export
│   │   ├── upload/route.ts       # Vercel Blob uploads
│   │   └── users/route.ts
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── PracticeAreasGrid.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── VeteransDiscount.tsx
│   │   ├── LocationsMap.tsx
│   │   ├── ContactForm.tsx
│   │   └── ...
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostContent.tsx
│   │   └── RichTextEditor.tsx
│   ├── video/
│   │   ├── VideoCard.tsx
│   │   └── VideoPlayer.tsx
│   ├── accessibility/
│   │   └── AccessibilityWidget.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── DataTable.tsx
│       └── ...
├── lib/
│   ├── db/
│   │   ├── index.ts              # Drizzle client
│   │   ├── schema.ts             # Database schema
│   │   └── migrations/
│   ├── auth.ts                   # Session management
│   ├── email.ts                  # Resend integration
│   ├── blob.ts                   # Vercel Blob helpers
│   └── utils.ts                  # Utility functions
├── hooks/
│   ├── useIntersectionObserver.ts
│   ├── useMediaQuery.ts
│   └── useAccessibility.ts
├── data/
│   ├── practiceAreas.ts          # Static practice area content
│   ├── teamMembers.ts            # Team bios
│   └── locations.ts              # Office locations
└── types/
    └── index.ts
```

---

## Phase 2: Database Schema

### 2.1 Drizzle Schema (`src/lib/db/schema.ts`)

```typescript
import { pgTable, text, timestamp, uuid, boolean, serial } from 'drizzle-orm/pg-core';

// Admin Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Blog Posts
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(), // Rich text HTML
  excerpt: text('excerpt'),
  featuredImage: text('featured_image'), // Vercel Blob URL
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  published: boolean('published').default(false),
  authorId: uuid('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  publishedAt: timestamp('published_at'),
});

// Videos
export const videos = pgTable('videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  bunnyVideoId: text('bunny_video_id').notNull(), // Bunny.net video ID or embed URL
  thumbnailUrl: text('thumbnail_url'), // Vercel Blob URL
  published: boolean('published').default(false),
  order: serial('order'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Contact Form Submissions
export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  caseDescription: text('case_description'),
  howDidYouHear: text('how_did_you_hear'),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

### 2.2 Run Migrations

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### 2.3 Seed Super Admin

Create `src/lib/db/seed.ts`:

```typescript
import { db } from './index';
import { users } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  const email = process.env.SUPER_ADMIN_EMAIL!;
  const password = process.env.SUPER_ADMIN_PASSWORD!;
  
  const passwordHash = await bcrypt.hash(password, 12);
  
  await db.insert(users).values({
    email,
    passwordHash,
    name: 'Matthew',
  }).onConflictDoNothing();
  
  console.log('Super admin seeded');
}

seed();
```

---

## Phase 3: Design System

### 3.1 Color Palette

```css
/* src/app/globals.css */
:root {
  /* Primary Colors */
  --color-navy: #1a365d;
  --color-navy-dark: #0f2442;
  --color-navy-light: #2c4a7c;
  
  /* Accent Colors */
  --color-gold: #b8860b;
  --color-gold-light: #d4a732;
  --color-gold-dark: #8b6914;
  
  /* Neutral Colors */
  --color-cream: #faf9f6;
  --color-cream-dark: #f5f3ed;
  --color-warm-gray: #6b7280;
  --color-warm-gray-light: #9ca3af;
  --color-charcoal: #374151;
  
  /* Supplementary */
  --color-sage: #7c9082;
  --color-sage-light: #a3b5a8;
  --color-burgundy: #722f37;
  
  /* Semantic */
  --color-success: #059669;
  --color-error: #dc2626;
  --color-warning: #d97706;
}
```

### 3.2 Typography

```css
/* Import in layout.tsx or globals.css */
/* Headings: Libre Baskerville (elegant, trustworthy) */
/* Body: Source Sans 3 (clean, highly readable) */

@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

:root {
  --font-heading: 'Libre Baskerville', Georgia, serif;
  --font-body: 'Source Sans 3', -apple-system, sans-serif;
}
```

### 3.3 Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a365d',
          dark: '#0f2442',
          light: '#2c4a7c',
        },
        gold: {
          DEFAULT: '#b8860b',
          light: '#d4a732',
          dark: '#8b6914',
        },
        cream: {
          DEFAULT: '#faf9f6',
          dark: '#f5f3ed',
        },
        sage: {
          DEFAULT: '#7c9082',
          light: '#a3b5a8',
        },
        burgundy: '#722f37',
        'warm-gray': {
          DEFAULT: '#6b7280',
          light: '#9ca3af',
        },
        charcoal: '#374151',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 3.4 Animation Hook

```typescript
// src/hooks/useIntersectionObserver.ts
'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
```

---

## Phase 4: Core Components

### 4.1 Accessibility Widget

```typescript
// src/components/accessibility/AccessibilityWidget.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'x-large';
  contrast: 'normal' | 'high';
  reducedMotion: boolean;
}

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    contrast: 'normal',
    reducedMotion: false,
  });

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply settings
    const html = document.documentElement;
    
    // Font size
    html.classList.remove('text-large', 'text-x-large');
    if (settings.fontSize !== 'normal') {
      html.classList.add(`text-${settings.fontSize}`);
    }
    
    // Contrast
    html.classList.toggle('high-contrast', settings.contrast === 'high');
    
    // Reduced motion
    html.classList.toggle('reduce-motion', settings.reducedMotion);
    
    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-navy text-white p-3 rounded-full shadow-lg hover:bg-navy-dark transition-colors"
        aria-label="Accessibility options"
        aria-expanded={isOpen}
      >
        <AccessibilityIcon className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-72 border border-gray-200"
          >
            <h3 className="font-heading font-bold text-navy mb-4">
              Accessibility Options
            </h3>

            {/* Font Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Text Size
              </label>
              <div className="flex gap-2">
                {(['normal', 'large', 'x-large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSettings({ ...settings, fontSize: size })}
                    className={`px-3 py-1 rounded border transition-colors ${
                      settings.fontSize === size
                        ? 'bg-navy text-white border-navy'
                        : 'border-gray-300 hover:border-navy'
                    }`}
                  >
                    {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>
            </div>

            {/* Contrast */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Contrast
              </label>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    contrast: settings.contrast === 'normal' ? 'high' : 'normal',
                  })
                }
                className={`w-full px-3 py-2 rounded border transition-colors ${
                  settings.contrast === 'high'
                    ? 'bg-navy text-white border-navy'
                    : 'border-gray-300 hover:border-navy'
                }`}
              >
                {settings.contrast === 'high' ? 'High Contrast On' : 'High Contrast Off'}
              </button>
            </div>

            {/* Reduced Motion */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) =>
                    setSettings({ ...settings, reducedMotion: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-charcoal">Reduce Motion</span>
              </label>
            </div>

            {/* Reset */}
            <button
              onClick={() =>
                setSettings({
                  fontSize: 'normal',
                  contrast: 'normal',
                  reducedMotion: false,
                })
              }
              className="mt-4 text-sm text-gold hover:text-gold-dark underline"
            >
              Reset to defaults
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### 4.2 Contact Form with Submission

```typescript
// src/components/sections/ContactForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseDescription: string;
  howDidYouHear: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    caseDescription: '',
    howDidYouHear: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
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
        caseDescription: '',
        howDidYouHear: '',
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="caseDescription" className="block text-sm font-medium text-charcoal mb-1">
          Case Description
        </label>
        <textarea
          id="caseDescription"
          rows={4}
          value={formData.caseDescription}
          onChange={(e) => setFormData({ ...formData, caseDescription: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow resize-none"
        />
      </div>

      <div>
        <label htmlFor="howDidYouHear" className="block text-sm font-medium text-charcoal mb-1">
          How Did You Hear About Us?
        </label>
        <select
          id="howDidYouHear"
          value={formData.howDidYouHear}
          onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-shadow"
        >
          <option value="">Select an option</option>
          <option value="google">Google Search</option>
          <option value="referral">Referral</option>
          <option value="social">Social Media</option>
          <option value="advertisement">Advertisement</option>
          <option value="other">Other</option>
        </select>
      </div>

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Form'}
      </motion.button>

      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-center font-medium"
        >
          Thank you! We'll be in touch soon.
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
```

---

## Phase 5: API Routes

### 5.1 Contact Form API (`src/app/api/contact/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { submissions } from '@/lib/db/schema';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, caseDescription, howDidYouHear } = body;

    // Save to database
    const [submission] = await db.insert(submissions).values({
      firstName,
      lastName,
      email,
      phone,
      caseDescription,
      howDidYouHear,
    }).returning();

    // Send email notification
    await resend.emails.send({
      from: 'Muchnik Elder Law <noreply@muchnikelderlaw.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>How they heard about us:</strong> ${howDidYouHear || 'Not specified'}</p>
        <h3>Case Description:</h3>
        <p>${caseDescription || 'Not provided'}</p>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'Muchnik Elder Law <noreply@muchnikelderlaw.com>',
      to: email,
      subject: 'Thank you for contacting Muchnik Elder Law',
      html: `
        <h2>Thank you for reaching out, ${firstName}!</h2>
        <p>We have received your message and will get back to you within 1-2 business days.</p>
        <p>If your matter is urgent, please call us directly:</p>
        <ul>
          <li>Staten Island: (718) 442-7004</li>
          <li>Manhattan: (212) 597-2427</li>
          <li>New Jersey: (201) 582-8014</li>
        </ul>
        <p>Best regards,<br>Muchnik Elder Law P.C.</p>
      `,
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
```

### 5.2 CSV Export API (`src/app/api/submissions/export/route.ts`)

```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { submissions } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Papa from 'papaparse';
import { getSession } from '@/lib/auth';

export async function GET() {
  // Check auth
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const allSubmissions = await db
    .select()
    .from(submissions)
    .orderBy(desc(submissions.createdAt));

  const csv = Papa.unparse(
    allSubmissions.map((s) => ({
      'First Name': s.firstName,
      'Last Name': s.lastName,
      Email: s.email,
      Phone: s.phone || '',
      'Case Description': s.caseDescription || '',
      'How Did You Hear': s.howDidYouHear || '',
      'Submitted At': s.createdAt.toISOString(),
      Read: s.read ? 'Yes' : 'No',
    }))
  );

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="submissions-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
```

---

## Phase 6: Static Content Data

### 6.1 Practice Areas (`src/data/practiceAreas.ts`)

```typescript
export const practiceAreas = [
  {
    id: 'elder-law',
    title: 'Elder Law & Medicaid Planning',
    shortDescription: 'Helping you keep more of what you\'ve worked so hard for',
    fullDescription: `The cost of care to recuperate from an illness can deplete funds that took you a lifetime to put aside. But with a custom-tailored plan from Muchnik Elder Law, your assets can be preserved for you and for the people in your life who matter most.

The best time to start thinking about financing long-term care is before incapacity or the need for nursing home care or home care arises. That way, you have the time to think about what's most important to you and your family . . . time to clear up problems while they are manageable, before they become major obstacles . . . and time to choose from a broad range of planning options.

At Muchnik Elder Law, our goal is not only to be your counsel and advocate, but also to serve as a link between you and your family and a network of physicians, home care agencies, nursing homes and providers of assisted living arrangements.

As a Firm, we are committed to making the Medicaid eligibility application process easy to grasp, so that individuals and families understand how their existing health care benefits work, helping them to gain the greatest possible benefits from their existing medical insurance and receive all of the medical benefits to which they are entitled.

We also help clients and their families prepare for hospital discharge, home care services or nursing home admission. With advanced planning, problems can be identified and solved, eliminating delays, inconvenience and needless financial loss.

We help you gain the greatest benefit from your health care coverage at the lowest cost.`,
    image: '/images/practice-areas/elder-law.jpg',
  },
  {
    id: 'estate-planning',
    title: 'Estate Planning, Trusts & Wills',
    shortDescription: 'For the best possible outcome, it pays to plan ahead',
    fullDescription: `Whatever your individual or family situation, we offer a full range of services designed to help you. These services include estate planning such as creating wills, trusts and advance directives such as powers of attorney, health care proxies and living wills.

At Muchnik Elder Law, we also inform as to estate and gift tax reduction strategies – as well as strategies that can help you name beneficiaries and identify the best distribution options for estates, retirement accounts, life insurance and family businesses.

We help clients plan for what they have to do, so they are free to do what they really want to do.`,
    image: '/images/practice-areas/estate-planning.jpg',
  },
  {
    id: 'estate-trust',
    title: 'Estate & Trust Settlement',
    shortDescription: 'Achieving a just and equitable result',
    fullDescription: `In the area of estate settlement we assist family members in understanding and resolving the many issues involved in settling an estate. We advise executors, trustees and Attorneys-in-Fact about the full range of their fiduciary responsibilities. We coordinate the distribution of real estate and other assets.`,
    image: '/images/practice-areas/estate-trust.jpg',
  },
  {
    id: 'special-needs',
    title: 'Special Needs Planning',
    shortDescription: 'Planning for your child\'s future',
    fullDescription: `If you are a parent of a young or adult child with disabilities, you do not have to disinherit your child to protect his or her Medicaid or other government benefits related to their disability. At Muchnik Elder Law, we offer a range of planning options to help clients address the special needs of their children and maintain the support their children deserve.`,
    image: '/images/practice-areas/special-needs.jpg',
  },
  {
    id: 'guardianships',
    title: 'Guardianships',
    shortDescription: 'Helping loved ones accomplish what they cannot accomplish independently',
    fullDescription: `A guardianship is a legal proceeding in which a Court appoints someone to act as a decision-maker for a person who is unable to manage their own affairs as a direct result of some medical condition or physical infirmity. When a guardianship is appropriate the Court will appoint a Guardian to make personal or financial decisions on behalf of a disabled adult.

Sometimes a guardianship proceeding is required when a young adult has serious developmental disabilities or traumatic brain injury. Sometimes a guardianship proceeding is required where formerly capable adults are no longer able to care for themselves or their property.

Guardianship proceedings are complex and have important consequences. At Muchnik Elder Law, we will help you successfully navigate through the guardianship process and understand your responsibilities as a court-appointed guardian.`,
    image: '/images/practice-areas/guardianships.jpg',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    shortDescription: 'For the best possible outcome, don\'t buy/sell your home alone',
    fullDescription: `From the time you make your decision to buy or sell your home (or other property) to the time you get to the closing day, there are a number of important decisions that you must make which have legal consequences. Whether you are buying or selling, it is critical that you are represented by an attorney.

In a real estate transaction, an attorney's responsibilities may include a consultation prior to signing of the contract, preparation of the contract, attorney review and modification of the contract, title examination and certification, preparation of closing and transfer documents, presiding over the closing and recording the closing documents (e.g. deed, mortgage etc.).

At Muchnik Elder Law, we will educate you on your rights and options so that you can take the appropriate steps to investigate your transaction and gain the peace of mind that comes from making an informed decision.`,
    image: '/images/practice-areas/real-estate.jpg',
  },
  {
    id: 'business-planning',
    title: 'Business Planning',
    shortDescription: 'Assisting clients in formation, purchase, or sale of a business',
    fullDescription: `Assisting clients in the formation, purchase or sale of a business; business consulting and preparation of shareholder and partnership agreements; providing for the smooth transfer of a business.`,
    image: '/images/practice-areas/business-planning.jpg',
  },
  {
    id: 'tax-law',
    title: 'Tax Law',
    shortDescription: 'Reduce or eliminate estate and capital gains taxes',
    fullDescription: `In consultation with your accountant, reduce or eliminate estate and capital gains taxes.`,
    image: '/images/practice-areas/tax-law.jpg',
  },
];
```

### 6.2 Locations (`src/data/locations.ts`)

```typescript
export const locations = [
  {
    id: 'staten-island',
    name: 'Staten Island Office',
    address: '900 South Avenue',
    addressLine2: 'Executive Suites',
    city: 'Staten Island',
    state: 'NY',
    zip: '10314',
    phone: '(718) 442-7004',
    phoneRaw: '7184427004',
    coordinates: { lat: 40.5795, lng: -74.1502 },
  },
  {
    id: 'manhattan',
    name: 'Manhattan Office',
    address: '11 Broadway',
    addressLine2: 'Suite 615',
    city: 'New York',
    state: 'NY',
    zip: '10004',
    phone: '(212) 597-2427',
    phoneRaw: '2125972427',
    coordinates: { lat: 40.7058, lng: -74.0139 },
  },
  {
    id: 'new-jersey',
    name: 'New Jersey Office',
    address: '10 West Hanover Ave',
    addressLine2: 'Suite 111',
    city: 'Randolph',
    state: 'NJ',
    zip: '07869',
    phone: '(201) 582-8014',
    phoneRaw: '2015828014',
    coordinates: { lat: 40.8423, lng: -74.5874 },
  },
];

export const firmInfo = {
  name: 'Muchnik Elder Law P.C.',
  email: 'kmuchnik@muchnikelderlaw.com',
  fax: '718-989-7378',
};
```

### 6.3 Team Members (`src/data/teamMembers.ts`)

```typescript
export const teamMembers = [
  {
    id: 'kirill-muchnik',
    name: 'Kirill Muchnik',
    title: 'Partner',
    image: '/images/team/kirill-muchnik.jpg',
    bio: `Kirill Muchnik is a partner of the Firm and concentrates in Elder Law, Special Needs Planning, Guardianship, Estate Planning, and Estate Administration. Mr. Muchnik grew up in Brooklyn, NY, arriving with his family to the United States in 1992 from the Ukraine. He is fluent in the Russian language and conversational in Ukrainian.

After receiving a Bachelor of Business Administration from Baruch College in 2009, with a major in Finance and Investments, Mr. Muchnik worked as a financial services representative for MetLife where he developed knowledge of insurance and investment products. Mr. Muchnik's passion to help guide individuals through the legal and financial challenges is the force that propelled his decision to enter law school.

During his studies at Albany Law School, he interned at The Ayco Company, L.P., A Goldman Sachs Company, assisting financial advisors with providing investment services, retirement and tax planning.

With experience in both insurance sales and wealth management, Mr. Muchnik brings to Muchnik Elder Law P.C. an understanding of complex issues that can arise in both Estate Planning and Administration.

Mr. Muchnik received his Juris Doctorate from Albany Law School in 2014 and was admitted to the Bar of the State of New York and the State of New Jersey in 2015. He is a member of the New York State Bar Association, the Richmond County Bar Association, the New Jersey State Bar Association and the American Bar Association.`,
  },
  {
    id: 'leslie-langworthy',
    name: 'Leslie M. Langworthy',
    title: 'Of Counsel',
    image: '/images/team/leslie-langworthy.jpg',
    bio: `Leslie M. Langworthy is Of Counsel to the Firm and practices in the areas of Estate Planning, Estate and Trust administration and settlement and Elder Law.

Ms. Langworthy graduated Colgate University in Hamilton, New York and Albany Law School of Union University in Albany, New York.

After admission to the Bar, she worked as a Law Assistant to the Honorable Robert Best, County Judge and Surrogate in Fulton County, New York. Thereafter, she worked as a Trust Officer for Manufacturers Hanover Bank and the Bank of New York.

She joined the legal staff of the Bank of New York and concentrated on credit facilities and Bank regulatory matters. She then became an Associate Attorney for Carella, Byrne, Bain & Gilfillan in Roseland, New Jersey. While there, she handled acquisitions and divestitures for an investment company and provided counsel to an investment advisory Firm.

In 1990, Ms. Langworthy began practicing law in her hometown, Staten Island, New York of Counsel and later a partner of predecessor firm Johnson & Langworthy, P.C. concentrating on Estate Planning, Trust and Estate Settlement and general Corporate Practice.

She was a member of the Board of Directors of the Alzheimer's Association, the Staten Island Children's Museum and the Friends of Blue Heron Park. She co-founded Staten Island Vote Yes, Inc., a grass roots organization advocating for self-government for Staten Island. She also served as Treasurer to the Staten Island Herb Society and served on the Board of the International Herb Association.

Ms. Langworthy resides on Staten Island and enjoys gardening, time spent in the Adirondacks, New York and writing about growing and using herbs.`,
  },
  {
    id: 'gary-johnson',
    name: 'Gary W. Johnson',
    title: 'Founder & Principal (1948-2014)',
    image: '/images/team/gary-johnson.jpg',
    isDeceased: true,
    bio: `Gary W. Johnson founded what is now Muchnik Elder Law P.C.

Mr. Johnson had graduated from Richmond College on Staten Island and Pace University School of Law after having served in the U.S. Army as a combat soldier in Vietnam. After school and his service in the Army, he returned to his home community to practice law.

After practicing several years in general practice and real estate matters, Mr. Johnson began concentrating in the area of Elder Law, particularly planning for seniors who might need nursing home care or in-home health care services. He helped many Staten Island and Brooklyn families and single people obtain services in their elder years. He was active in the Alzheimer's Foundation of Staten Island, Inc. and served on the Board of Directors of the Community Agency for Senior Citizens.

Interested in local government, he was a founding member of Staten Island Vote Yes, Inc., a grassroots organization advocating for self-government for Staten Island.`,
  },
  {
    id: 'tracey-marino',
    name: 'Tracey Marino',
    title: 'Office Manager and Paralegal',
    image: '/images/team/tracey-marino.jpg',
    bio: `Tracey Marino is a Paralegal of the Firm and Office Manager. After receiving an Associate's Degree in Secretarial Studies from Katherine Gibbs School in 1990, Mrs. Marino worked as an Executive Legal Assistant for large law Firms in Manhattan for 10 years specializing in corporate law and real estate.

After starting a family, Mrs. Marino joined our predecessor firm, Johnson & Langworthy, P.C., in 2001 and brings over 30 years of experience to Muchnik Elder Law P.C. in real estate transactions and experience in providing lawyers with direct assistance, such as helping to prepare the necessary documents for cases and submission of paperwork to courthouses.

Mrs. Marino resides on Staten Island with her family.`,
  },
];
```

---

## Phase 7: SEO Optimization

### 7.1 Metadata Configuration

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://muchnikelderlaw.com'),
  title: {
    default: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys',
    template: '%s | Muchnik Elder Law P.C.',
  },
  description: 'For more than 30 years, Muchnik Elder Law P.C. has helped families with Elder Law, Medicaid Planning, Estate Planning, and Guardianships across New York and New Jersey.',
  keywords: [
    'elder law attorney',
    'estate planning lawyer',
    'medicaid planning',
    'guardianship lawyer',
    'Staten Island elder law',
    'Manhattan estate attorney',
    'New Jersey elder law',
    'wills and trusts',
    'special needs planning',
  ],
  authors: [{ name: 'Muchnik Elder Law P.C.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muchnikelderlaw.com',
    siteName: 'Muchnik Elder Law P.C.',
    title: 'Muchnik Elder Law P.C. | Elder Law & Estate Planning Attorneys',
    description: 'For more than 30 years, Muchnik Elder Law P.C. has helped families with Elder Law, Medicaid Planning, Estate Planning, and Guardianships.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Muchnik Elder Law P.C.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muchnik Elder Law P.C.',
    description: 'Elder Law & Estate Planning Attorneys serving NY & NJ',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these after setting up Search Console
    // google: 'your-google-verification-code',
  },
};
```

### 7.2 JSON-LD Structured Data

```typescript
// src/components/seo/JsonLd.tsx
import { locations, firmInfo } from '@/data/locations';

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: firmInfo.name,
    description: 'Elder Law, Estate Planning, Medicaid Planning, and Guardianship attorneys serving New York and New Jersey.',
    url: 'https://muchnikelderlaw.com',
    telephone: locations[0].phone,
    email: firmInfo.email,
    faxNumber: firmInfo.fax,
    address: locations.map((loc) => ({
      '@type': 'PostalAddress',
      streetAddress: `${loc.address}${loc.addressLine2 ? ', ' + loc.addressLine2 : ''}`,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: 'US',
    })),
    geo: locations.map((loc) => ({
      '@type': 'GeoCoordinates',
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    })),
    areaServed: [
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'New Jersey' },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    sameAs: [
      // Add social media URLs when available
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### 7.3 Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { practiceAreas } from '@/data/practiceAreas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://muchnikelderlaw.com';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/practice-areas`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/videos`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  // Practice area anchors
  const practiceAreaPages = practiceAreas.map((area) => ({
    url: `${baseUrl}/practice-areas#${area.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog posts
  const publishedPosts = await db
    .select({ slug: posts.slug, updatedAt: posts.updatedAt })
    .from(posts)
    .where(eq(posts.published, true));

  const blogPages = publishedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...practiceAreaPages, ...blogPages];
}
```

---

## Phase 8: Admin Panel

### 8.1 Auth Configuration (`src/lib/auth.ts`)

```typescript
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId: string;
  email: string;
  isLoggedIn: boolean;
}

const sessionOptions = {
  password: process.env.ADMIN_SESSION_SECRET!,
  cookieName: 'muchnik-admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return session.isLoggedIn ? session : null;
}

export async function createSession(userId: string, email: string) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.userId = userId;
  session.email = email;
  session.isLoggedIn = true;
  await session.save();
}

export async function destroySession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.destroy();
}
```

### 8.2 Admin Layout with Auth Guard

```typescript
// src/app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Allow access to login page without auth
  // This check happens in the page itself for the login route
  
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
```

### 8.3 Rich Text Editor Component

```typescript
// src/components/blog/RichTextEditor.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-navy text-white' : 'hover:bg-gray-200'}`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded italic ${editor.isActive('italic') ? 'bg-navy text-white' : 'hover:bg-gray-200'}`}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-navy text-white' : 'hover:bg-gray-200'}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-navy text-white' : 'hover:bg-gray-200'}`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-navy text-white' : 'hover:bg-gray-200'}`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-navy text-white' : 'hover:bg-gray-200'}`}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-navy text-white' : 'hover:bg-gray-200'}`}
        >
          Quote
        </button>
      </div>
      
      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
}
```

---

## Phase 9: Images to Extract

Download these images from the current site and save to `/public/images/`:

### Logo
- `https://muchnikelderlaw.com/wp-content/uploads/2021/11/Muchnik-Elder-Law-Logo-150x86.png` → `/public/images/logo.png`

### Team Photos
- `https://muchnikelderlaw.com/wp-content/uploads/2019/12/180530-Kirill.jpg` → `/public/images/team/kirill-muchnik.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2019/12/Leslie-M.-Langworthy-Esq-731x1024.jpg` → `/public/images/team/leslie-langworthy.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2019/12/Gary-W.-Johnson-Esq-731x1024.jpg` → `/public/images/team/gary-johnson.jpg`

### Practice Area / General Images
- `https://muchnikelderlaw.com/wp-content/uploads/2019/12/elderly-couple.jpg` → `/public/images/hero/elderly-couple.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2019/12/IMGnewbrif-1024x778.jpg` → `/public/images/hero/family-documents.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2019/12/family-in-the-woods.jpg` → `/public/images/hero/family-woods.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2020/10/Depositphotos_281430174_xl-2015-1-1024x683.jpg` → `/public/images/practice-areas/elder-law.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2020/10/Depositphotos_23557569_xl-2015-1024x683.jpg` → `/public/images/practice-areas/estate-planning.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2021/12/Depositphotos_210660438_XL.jpg` → `/public/images/practice-areas/estate-trust.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2021/11/shutterstock_1007409607.jpg` → `/public/images/practice-areas/special-needs.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2021/11/shutterstock_1108958093.jpg` → `/public/images/practice-areas/guardianships.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2021/11/tierra-mallorca-rgJ1J8SDEAY-unsplash.jpg` → `/public/images/practice-areas/real-estate.jpg`
- `https://muchnikelderlaw.com/wp-content/uploads/2019/12/eyeglasses-bokeh.jpg` → `/public/images/about/about-hero.jpg`

---

## Phase 10: Development Checklist

### Setup (Day 1)
- [ ] Initialize Next.js 15 project
- [ ] Install all dependencies
- [ ] Set up NeonDB and create database
- [ ] Configure environment variables
- [ ] Set up Drizzle schema and run migrations
- [ ] Seed super admin user
- [ ] Download and organize all images from current site

### Core Layout (Day 2)
- [ ] Create global styles with design system
- [ ] Build Header component with navigation
- [ ] Build Footer component with all locations
- [ ] Build mobile menu with smooth animations
- [ ] Implement scroll-triggered animations hook
- [ ] Build accessibility widget

### Public Pages (Days 3-5)
- [ ] Home page with all sections
- [ ] About page with team bios
- [ ] Practice Areas page with anchor navigation
- [ ] Blog listing page
- [ ] Individual blog post page
- [ ] Videos page
- [ ] Contact page with form and Leaflet maps

### Admin Panel (Days 6-8)
- [ ] Login page and authentication flow
- [ ] Admin dashboard
- [ ] Blog post CRUD with rich text editor
- [ ] Video management
- [ ] Contact submissions viewer with CSV export
- [ ] User management (add/delete admins)

### API Routes (Day 9)
- [ ] Contact form submission + Resend integration
- [ ] Blog posts CRUD
- [ ] Videos CRUD
- [ ] Image upload to Vercel Blob
- [ ] CSV export endpoint
- [ ] Auth endpoints

### SEO & Performance (Day 10)
- [ ] Implement all metadata
- [ ] Add JSON-LD structured data
- [ ] Generate sitemap
- [ ] Create robots.txt
- [ ] Optimize images with next/image
- [ ] Test Core Web Vitals
- [ ] Accessibility audit (WCAG 2.1 AA)

### Testing & Deployment (Day 11)
- [ ] Test all forms
- [ ] Test admin panel functionality
- [ ] Test responsive design on all breakpoints
- [ ] Test accessibility widget
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Set up Vercel Analytics

---

## Key Technical Notes

### Leaflet Map Setup
Since Leaflet requires client-side rendering, use dynamic imports:

```typescript
// src/components/sections/LocationsMap.tsx
'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />,
});
```

### Vercel Blob Upload

```typescript
// src/app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
```

### Bunny.net Video Embed

Videos can be embedded using either:
1. Direct HLS URL: `https://iframe.mediadelivery.net/embed/{library_id}/{video_id}`
2. MP4 direct link for download/fallback

Store the `bunny_video_id` in the database and construct the embed URL on render.

---

## Super Admin Credentials

**Email**: matthew@adventii.com  
**Password**: `Mch8K3pLw2nX9qRt` (generated secure password)

⚠️ **Change this password after first login!**

---

## Contact

For questions about this specification, reach out to Matthew at Adventii Media.

---

*Last Updated: December 2024*
*Specification Version: 1.0*