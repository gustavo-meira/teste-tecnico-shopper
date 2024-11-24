-- CreateTable
CREATE TABLE "ride" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driver_id" INTEGER NOT NULL,

    CONSTRAINT "ride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ride_id_driver_id_idx" ON "ride"("id", "driver_id");

-- AddForeignKey
ALTER TABLE "ride" ADD CONSTRAINT "ride_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
