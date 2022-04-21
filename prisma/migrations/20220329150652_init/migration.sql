-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publicId" TEXT NOT NULL,
    "linkedOpenedAt" TIMESTAMP(3),
    "classifiedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "isVehicleDrivable" BOOLEAN,
    "isWindscreenShattered" BOOLEAN,
    "haveAirbagsDeployed" BOOLEAN,
    "mileage" INTEGER,
    "rating" SMALLINT,
    "damageLocations" TEXT[],
    "damagedParts" TEXT[],

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehiclePhoto" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "VehiclePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamagePhoto" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "DamagePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalPhoto" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "AdditionalPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_publicId_key" ON "Session"("publicId");

-- AddForeignKey
ALTER TABLE "VehiclePhoto" ADD CONSTRAINT "VehiclePhoto_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DamagePhoto" ADD CONSTRAINT "DamagePhoto_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalPhoto" ADD CONSTRAINT "AdditionalPhoto_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
