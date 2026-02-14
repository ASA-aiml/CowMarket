ALTER TABLE "users" ADD COLUMN "latitude" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "longitude" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "city" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "location_updated_at" timestamp;