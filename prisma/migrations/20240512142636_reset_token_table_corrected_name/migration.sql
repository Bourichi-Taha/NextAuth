/*
  Warnings:

  - You are about to drop the `RestToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RestToken";

-- CreateTable
CREATE TABLE "ResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_token_key" ON "ResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_email_token_key" ON "ResetToken"("email", "token");
