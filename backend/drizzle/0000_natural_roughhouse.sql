CREATE TABLE IF NOT EXISTS "answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"question_id" integer NOT NULL,
	"creator_id" integer NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "answers_id_unique" UNIQUE("id"),
	CONSTRAINT "question_id_answer_id_created_at" UNIQUE("id","id","created_at"),
	CONSTRAINT "user_id_answer_id_created_at" UNIQUE("id","id","created_at")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(123),
	"description" varchar(256),
	"author_id" integer NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "questions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"birthday" date NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
