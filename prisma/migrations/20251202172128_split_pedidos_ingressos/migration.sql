/*
  Warnings:

  - You are about to drop the column `filmeId` on the `registroPedidos` table. All the data in the column will be lost.
  - Made the column `alimentoId` on table `registroPedidos` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `pedidoId` to the `registroSessoes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posicao" TEXT NOT NULL,
    "salaId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Livre',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "assentos_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_assentos" ("createdAt", "id", "posicao", "salaId", "updatedAt") SELECT "createdAt", "id", "posicao", "salaId", "updatedAt" FROM "assentos";
DROP TABLE "assentos";
ALTER TABLE "new_assentos" RENAME TO "assentos";
CREATE TABLE "new_pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "precoTotal" DECIMAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "qrCode" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "pedidos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("createdAt", "id", "precoTotal", "qrCode", "status", "updatedAt") SELECT "createdAt", "id", "precoTotal", "qrCode", "status", "updatedAt" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
CREATE UNIQUE INDEX "pedidos_qrCode_key" ON "pedidos"("qrCode");
CREATE TABLE "new_registroPedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER NOT NULL,
    "alimentoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "registroPedidos_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroPedidos_alimentoId_fkey" FOREIGN KEY ("alimentoId") REFERENCES "alimentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_registroPedidos" ("alimentoId", "createdAt", "id", "pedidoId", "updatedAt") SELECT "alimentoId", "createdAt", "id", "pedidoId", "updatedAt" FROM "registroPedidos";
DROP TABLE "registroPedidos";
ALTER TABLE "new_registroPedidos" RENAME TO "registroPedidos";
CREATE TABLE "new_registroSessoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessaoId" INTEGER NOT NULL,
    "assentoId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "registroSessoes_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "sessoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroSessoes_assentoId_fkey" FOREIGN KEY ("assentoId") REFERENCES "assentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroSessoes_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_registroSessoes" ("assentoId", "createdAt", "id", "sessaoId", "updatedAt") SELECT "assentoId", "createdAt", "id", "sessaoId", "updatedAt" FROM "registroSessoes";
DROP TABLE "registroSessoes";
ALTER TABLE "new_registroSessoes" RENAME TO "registroSessoes";
CREATE UNIQUE INDEX "registroSessoes_sessaoId_assentoId_key" ON "registroSessoes"("sessaoId", "assentoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
