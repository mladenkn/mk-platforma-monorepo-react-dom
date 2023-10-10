-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "_ImageToPost" (
	"A" integer NOT NULL,
	"B" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" varchar(128) NOT NULL,
	"userId" integer NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "geography_columns" (
	"f_table_catalog" "name",
	"f_table_schema" "name",
	"f_table_name" "name",
	"f_geography_column" "name",
	"coord_dimension" integer,
	"srid" integer,
	"type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "geometry_columns" (
	"f_table_catalog" varchar(256),
	"f_table_schema" "name",
	"f_table_name" "name",
	"f_geometry_column" "name",
	"coord_dimension" integer,
	"srid" integer,
	"type" varchar(30)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Image" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"url" text NOT NULL,
	"uploadthing_key" varchar(128),
	"isMain" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Location" (
	"id" serial PRIMARY KEY NOT NULL,
	"google_id" varchar(128) NOT NULL,
	"latitude" numeric(65, 30) NOT NULL,
	"longitude" numeric(65, 30) NOT NULL,
	"name" varchar(128) NOT NULL,
	"adminAreaLevel1" varchar(128),
	"country" varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spatial_ref_sys" (
	"srid" integer PRIMARY KEY NOT NULL,
	"auth_name" varchar(256),
	"auth_srid" integer,
	"srtext" varchar(2048),
	"proj4text" varchar(2048)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"contact" varchar(256) NOT NULL,
	"location_id" integer,
	"author_id" integer NOT NULL,
	"expertEndorsement_id" integer,
	"isDeleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_CategoryToPost" (
	"A" integer NOT NULL,
	"B" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post_ExpertEndorsement" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"firstName" varchar(64) NOT NULL,
	"lastName" varchar(64) NOT NULL,
	"avatarStyle" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Category" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"label" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post_ExpertEndorsement_skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(64) NOT NULL,
	"level" integer,
	"expertEndorsement_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(32),
	"avatarStyle" jsonb NOT NULL,
	"email" varchar(64),
	"emailVerified" timestamp(3),
	"canMutate" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VerificationToken" (
	"identifier" text NOT NULL,
	"token" varchar(128) NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_ImageToPost_AB_unique" ON "_ImageToPost" ("A","B");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_ImageToPost_B_index" ON "_ImageToPost" ("B");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session" ("sessionToken");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Image_uploadthing_key_key" ON "Image" ("uploadthing_key");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Location_google_id_key" ON "Location" ("google_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Post_expertEndorsement_id_key" ON "Post" ("expertEndorsement_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_CategoryToPost_AB_unique" ON "_CategoryToPost" ("A","B");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_CategoryToPost_B_index" ON "_CategoryToPost" ("B");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Post_ExpertEndorsement_post_id_key" ON "Post_ExpertEndorsement" ("post_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Category_label_key" ON "Category" ("label");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Post_ExpertEndorsement_skill_expertEndorsement_id_label_key" ON "Post_ExpertEndorsement_skill" ("label","expertEndorsement_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_name_key" ON "User" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account" ("provider","providerAccountId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken" ("identifier","token");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_ImageToPost" ADD CONSTRAINT "_ImageToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_ImageToPost" ADD CONSTRAINT "_ImageToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_expertEndorsement_id_fkey" FOREIGN KEY ("expertEndorsement_id") REFERENCES "Post_ExpertEndorsement"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Category" ADD CONSTRAINT "Category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Category"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post_ExpertEndorsement_skill" ADD CONSTRAINT "Post_ExpertEndorsement_skill_expertEndorsement_id_fkey" FOREIGN KEY ("expertEndorsement_id") REFERENCES "Post_ExpertEndorsement"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/