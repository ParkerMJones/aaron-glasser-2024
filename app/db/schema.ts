import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

// Table for philosophical writings
export const writings = pgTable("writings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  source: text("source"),
  date: varchar("date", { length: 100 }),
  reference: text("reference"),
  author: text("author"),
  document: text("document"), // PDF path
  documentName: text("document_name"),
  abstract: text("abstract"),
  sortOrder: integer("sort_order").notNull().default(0),
});

// Table for videos
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  vimeoId: integer("vimeo_id").notNull(),
  title: text("title").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// Table for teaching courses
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  semesters: text("semesters"),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
});

// Table for works-in-progress research entries
export const worksInProgress = pgTable("works_in_progress", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// Table for editable site content (bio, email, etc.)
export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  label: text("label"), // Human-readable label for admin UI
});
