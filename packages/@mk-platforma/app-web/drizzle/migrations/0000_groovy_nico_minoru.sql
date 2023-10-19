CREATE TABLE `Category` (
	`id` integer PRIMARY KEY NOT NULL,
	`parent_id` integer,
	`label` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `_CategoryToPost` (
	`A` integer NOT NULL,
	`B` integer NOT NULL,
	FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Comment` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`author_id` integer NOT NULL,
	`post_id` integer NOT NULL,
	`isDeleted` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON UPDATE cascade ON DELETE restrict,
	FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `Image` (
	`id` integer PRIMARY KEY NOT NULL,
	`post_id` integer,
	`url` text NOT NULL,
	`uploadthing_key` text(128),
	`isMain` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Location` (
	`id` integer PRIMARY KEY NOT NULL,
	`google_id` text(128) NOT NULL,
	`latitude` integer NOT NULL,
	`longitude` integer NOT NULL,
	`name` text(128) NOT NULL,
	`adminAreaLevel1` text(128),
	`country` text(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Post` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text(256) NOT NULL,
	`description` text,
	`contact` text(256) NOT NULL,
	`location_id` integer,
	`author_id` integer NOT NULL,
	`expertEndorsement_id` integer,
	`isDeleted` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON UPDATE cascade ON DELETE set null,
	FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON UPDATE cascade ON DELETE restrict,
	FOREIGN KEY (`expertEndorsement_id`) REFERENCES `Post_ExpertEndorsement`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `Post_ExpertEndorsement` (
	`id` integer PRIMARY KEY NOT NULL,
	`post_id` integer NOT NULL,
	`firstName` text(64) NOT NULL,
	`lastName` text(64) NOT NULL,
	`avatarStyle` string NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Post_ExpertEndorsement_skill` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text(64) NOT NULL,
	`level` integer,
	`expertEndorsement_id` integer NOT NULL,
	FOREIGN KEY (`expertEndorsement_id`) REFERENCES `Post_ExpertEndorsement`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(32),
	`avatarStyle` string NOT NULL,
	`email` text(64),
	`canMutate` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Category_label_unique` ON `Category` (`label`);--> statement-breakpoint
CREATE UNIQUE INDEX `Location_google_id_unique` ON `Location` (`google_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `Post_expertEndorsement_id_unique` ON `Post` (`expertEndorsement_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_name_unique` ON `User` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_email_unique` ON `User` (`email`);