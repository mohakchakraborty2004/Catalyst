-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "xprofile" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "phone" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
