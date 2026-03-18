ALTER TABLE "writings" ADD COLUMN "sort_order" integer;
--> statement-breakpoint
UPDATE "writings" SET "sort_order" = subq.rn FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY id DESC) AS rn FROM writings) AS subq WHERE "writings".id = subq.id;
--> statement-breakpoint
ALTER TABLE "writings" ALTER COLUMN "sort_order" SET NOT NULL;
