-- CreateTable
CREATE TABLE "Membership" (
    "membership_id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("membership_id")
);

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("mem_id") ON DELETE RESTRICT ON UPDATE CASCADE;
