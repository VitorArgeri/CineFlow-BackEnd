/*
  Warnings:

  - You are about to drop the column `status` on the `assentos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posicao" TEXT NOT NULL,
    "salaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "assentos_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_assentos" ("createdAt", "id", "posicao", "salaId", "updatedAt") SELECT "createdAt", "id", "posicao", "salaId", "updatedAt" FROM "assentos";
DROP TABLE "assentos";
ALTER TABLE "new_assentos" RENAME TO "assentos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
