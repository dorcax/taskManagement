/*
  Warnings:

  - The values [INCOMPLETE] on the enum `Taskstatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Taskstatus_new" AS ENUM ('TODO', 'COMPLETE', 'IMPORTANT');
ALTER TABLE "Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "Taskstatus_new" USING ("status"::text::"Taskstatus_new");
ALTER TYPE "Taskstatus" RENAME TO "Taskstatus_old";
ALTER TYPE "Taskstatus_new" RENAME TO "Taskstatus";
DROP TYPE "Taskstatus_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'TODO';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'TODO';
