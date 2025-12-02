-- CreateTable
CREATE TABLE "ingressos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "preco" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sessoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "dublagem" TEXT NOT NULL,
    "ingressoId" INTEGER,
    "salaId" INTEGER NOT NULL,
    "filmeId" INTEGER NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessoes_ingressoId_fkey" FOREIGN KEY ("ingressoId") REFERENCES "ingressos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "sessoes_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sessoes_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "filmes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessoes" ("createdAt", "dataHora", "dublagem", "filmeId", "id", "salaId", "tipo", "updatedAt") SELECT "createdAt", "dataHora", "dublagem", "filmeId", "id", "salaId", "tipo", "updatedAt" FROM "sessoes";
DROP TABLE "sessoes";
ALTER TABLE "new_sessoes" RENAME TO "sessoes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
