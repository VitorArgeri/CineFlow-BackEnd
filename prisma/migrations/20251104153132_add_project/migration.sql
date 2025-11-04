-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posicao" TEXT NOT NULL,
    "salaId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Livre',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Assento_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assento" ("createdAt", "id", "posicao", "salaId", "status", "updatedAt") SELECT "createdAt", "id", "posicao", "salaId", "status", "updatedAt" FROM "Assento";
DROP TABLE "Assento";
ALTER TABLE "new_Assento" RENAME TO "Assento";
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "precoTotal" DECIMAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "qrCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pedido" ("createdAt", "id", "precoTotal", "qrCode", "status", "updatedAt") SELECT "createdAt", "id", "precoTotal", "qrCode", "status", "updatedAt" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
CREATE UNIQUE INDEX "Pedido_qrCode_key" ON "Pedido"("qrCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
