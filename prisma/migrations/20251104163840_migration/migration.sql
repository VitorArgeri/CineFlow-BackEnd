/*
  Warnings:

  - You are about to drop the `Alimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Assento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Filme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegistroPedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegistroSala` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegistroSessao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sala` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sessao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Alimento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Assento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Filme";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pedido";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RegistroPedido";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RegistroSala";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RegistroSessao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Sala";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Sessao";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "precoTotal" DECIMAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "qrCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "filmes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataLancamento" DATETIME NOT NULL,
    "genero" TEXT NOT NULL,
    "duracaoMinutos" INTEGER NOT NULL,
    "avaliacao" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "salas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capacidade" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "sessoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "salaId" INTEGER NOT NULL,
    "filmeId" INTEGER NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessoes_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sessoes_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "filmes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posicao" TEXT NOT NULL,
    "salaId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Livre',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "assentos_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "alimentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "registroPedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER NOT NULL,
    "filmeId" INTEGER,
    "alimentoId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "registroPedidos_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroPedidos_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "filmes" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "registroPedidos_alimentoId_fkey" FOREIGN KEY ("alimentoId") REFERENCES "alimentos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "registroSalas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filmeId" INTEGER NOT NULL,
    "salaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "registroSalas_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "filmes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroSalas_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "salas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "registroSessoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessaoId" INTEGER NOT NULL,
    "assentoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "registroSessoes_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "sessoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registroSessoes_assentoId_fkey" FOREIGN KEY ("assentoId") REFERENCES "assentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_qrCode_key" ON "pedidos"("qrCode");

-- CreateIndex
CREATE UNIQUE INDEX "registroSalas_filmeId_salaId_key" ON "registroSalas"("filmeId", "salaId");

-- CreateIndex
CREATE UNIQUE INDEX "registroSessoes_sessaoId_assentoId_key" ON "registroSessoes"("sessaoId", "assentoId");
