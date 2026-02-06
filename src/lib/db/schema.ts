import { pgTable, text, timestamp, uuid, boolean, serial, integer } from 'drizzle-orm/pg-core';

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

// Testimonials / Reviews
export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  rating: integer('rating').notNull(),
  text: text('text').notNull(),
  date: text('date'), // e.g. "January 2024"
  source: text('source'), // e.g. "Google"
  published: boolean('published').default(true),
  order: serial('order'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Email Logs
export const emailLogs = pgTable('email_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  toAddress: text('to_address').notNull(),
  subject: text('subject').notNull(),
  type: text('type').notNull(), // 'contact_notification' | 'contact_confirmation'
  status: text('status').notNull(), // 'sent' | 'failed'
  messageId: text('message_id'),
  error: text('error'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
