-- CreateTable
CREATE TABLE "driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "min_km_distance" INTEGER NOT NULL,
    "rate_per_km" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver_review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driver_id" INTEGER NOT NULL,

    CONSTRAINT "driver_review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "driver_id_rate_per_km_idx" ON "driver"("id", "rate_per_km");

-- CreateIndex
CREATE INDEX "driver_review_driver_id_idx" ON "driver_review"("driver_id");

-- AddForeignKey
ALTER TABLE "driver_review" ADD CONSTRAINT "driver_review_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
