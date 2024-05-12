-- CreateTable
CREATE TABLE "RestToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestToken_token_key" ON "RestToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "RestToken_email_token_key" ON "RestToken"("email", "token");
