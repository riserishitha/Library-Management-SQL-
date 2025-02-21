-- CreateTable
CREATE TABLE "Category" (
    "cat_id" SERIAL NOT NULL,
    "cat_name" TEXT NOT NULL,
    "sub_cat_name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("cat_id")
);
