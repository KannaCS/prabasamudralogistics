-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "serviceType" TEXT NOT NULL,
    "cargoType" TEXT,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "shipmentDate" DATETIME NOT NULL,
    "weight" REAL,
    "dimensions" TEXT,
    "specialInstructions" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "bookingNumber" TEXT NOT NULL,
    "goodsType" TEXT,
    "hsCode" TEXT,
    "countryOrigin" TEXT,
    "countryDestination" TEXT,
    "lartas" TEXT,
    "proforma" TEXT,
    "exportImportType" TEXT,
    "portOfLoading" TEXT,
    "portOfDelivery" TEXT,
    "laycan" TEXT,
    "packingList" TEXT,
    "cargoPlan" TEXT,
    "cargo" TEXT,
    "distance" TEXT,
    "pic" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unread',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");
