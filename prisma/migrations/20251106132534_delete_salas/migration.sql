/*
  Warnings:

  - You are about to drop the `salas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "salas";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posicao" TEXT NOT NULL,
    "salaId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Livre',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_assentos" ("createdAt", "id", "posicao", "salaId", "status", "updatedAt") SELECT "createdAt", "id", "posicao", "salaId", "status", "updatedAt" FROM "assentos";
DROP TABLE "assentos";
ALTER TABLE "new_assentos" RENAME TO "assentos";
CREATE TABLE "new_registroSalas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filmeId" INTEGER NOT NULL,
    "salaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "registroSalas_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "filmes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_registroSalas" ("createdAt", "filmeId", "id", "salaId", "updatedAt") SELECT "createdAt", "filmeId", "id", "salaId", "updatedAt" FROM "registroSalas";
DROP TABLE "registroSalas";
ALTER TABLE "new_registroSalas" RENAME TO "registroSalas";
CREATE UNIQUE INDEX "registroSalas_filmeId_salaId_key" ON "registroSalas"("filmeId", "salaId");
CREATE TABLE "new_sessoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "salaId" INTEGER NOT NULL,
    "filmeId" INTEGER NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessoes_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "filmes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessoes" ("createdAt", "dataHora", "filmeId", "id", "salaId", "tipo", "updatedAt") SELECT "createdAt", "dataHora", "filmeId", "id", "salaId", "tipo", "updatedAt" FROM "sessoes";
DROP TABLE "sessoes";
ALTER TABLE "new_sessoes" RENAME TO "sessoes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
