-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alimentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'padrao',
    "imgUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_alimentos" ("createdAt", "id", "imgUrl", "nome", "preco", "updatedAt") SELECT "createdAt", "id", "imgUrl", "nome", "preco", "updatedAt" FROM "alimentos";
DROP TABLE "alimentos";
ALTER TABLE "new_alimentos" RENAME TO "alimentos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
