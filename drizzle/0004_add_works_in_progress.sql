CREATE TABLE "works_in_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO "works_in_progress" ("title", "sort_order") VALUES
	('A paper about the representational format of relevance', 1),
	('A paper about attention norms', 2),
	('A paper about creative agency', 3),
	('A paper about intrusive thoughts', 4),
	('A paper about diagnostic trends in psychiatry', 5);
