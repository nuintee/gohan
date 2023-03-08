-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('REVALIDATE', 'ERROR');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "request_type" "ReportType" NOT NULL,
    "userId" TEXT,
    "body" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
