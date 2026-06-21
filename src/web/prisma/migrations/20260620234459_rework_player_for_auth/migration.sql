/*
  Warnings:

  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gamesWon` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "PlayerRole" AS ENUM ('PLAYER', 'ADMIN');

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "gamesWon",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "role" "PlayerRole" NOT NULL DEFAULT 'PLAYER',
ADD COLUMN     "status" "PlayerStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Player_id_seq";
