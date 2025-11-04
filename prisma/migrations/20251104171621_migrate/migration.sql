/*
  Warnings:

  - Added the required column `imgUrl` to the `filmes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_filmes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataLancamento" DATETIME NOT NULL,
    "genero" TEXT NOT NULL,
    "duracaoMinutos" INTEGER NOT NULL,
    "avaliacao" REAL,
    "imgUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_filmes" ("avaliacao", "createdAt", "dataLancamento", "duracaoMinutos", "genero", "id", "nome", "updatedAt") SELECT "avaliacao", "createdAt", "dataLancamento", "duracaoMinutos", "genero", "id", "nome", "updatedAt" FROM "filmes";
DROP TABLE "filmes";
ALTER TABLE "new_filmes" RENAME TO "filmes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
