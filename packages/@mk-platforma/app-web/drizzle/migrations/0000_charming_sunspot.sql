CREATE TABLE `Category` (
	`id` integer PRIMARY KEY NOT NULL,
	`label` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Category_label_unique` ON `Category` (`label`);