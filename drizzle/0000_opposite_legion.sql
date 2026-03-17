CREATE TABLE "site_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" text NOT NULL,
	"label" text,
	CONSTRAINT "site_content_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"vimeo_id" integer NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "writings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"source" text,
	"date" varchar(100),
	"reference" text,
	"author" text,
	"document" text,
	"document_name" text,
	"abstract" text
);
