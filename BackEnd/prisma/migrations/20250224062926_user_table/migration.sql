-- CreateTable
CREATE TABLE "Users" (
    "Mail" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Mail_key" ON "Users"("Mail");
