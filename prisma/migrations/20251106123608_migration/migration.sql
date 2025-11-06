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
    "classificacaoIndicativa" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_filmes" ("avaliacao", "classificacaoIndicativa", "createdAt", "dataLancamento", "duracaoMinutos", "genero", "id", "imgUrl", "nome", "sinopse", "updatedAt") SELECT "avaliacao", "classificacaoIndicativa", "createdAt", "dataLancamento", "duracaoMinutos", "genero", "id", "imgUrl", "nome", "sinopse", "updatedAt" FROM "filmes";
DROP TABLE "filmes";
ALTER TABLE "new_filmes" RENAME TO "filmes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
