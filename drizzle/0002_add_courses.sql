CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"semesters" text,
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO "courses" ("name", "semesters", "sort_order") VALUES
	('Psychiatric Ethics', 'Summer, 2025', 1),
	('Introduction to Cognitive Science', 'Winter, 2024', 2),
	('Bioethics', 'Fall, 2023', 3),
	('Critical Reasoning', 'Fall 2022; Winter, 2023', 4),
	('Ways of Seeing', '', 5);
