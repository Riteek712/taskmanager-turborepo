-- AlterEnum
ALTER TYPE "TodoStatus" ADD VALUE 'WORKING';

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "deadline" TIMESTAMP(3);
