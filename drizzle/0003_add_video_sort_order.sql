ALTER TABLE "videos" ADD COLUMN "sort_order" integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
UPDATE "videos" SET "sort_order" = "id";
