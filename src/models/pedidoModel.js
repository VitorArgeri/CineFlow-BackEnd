import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma.js";

const includeConfig = {
    ingressos: {
        include: {
            assento: true,
            sessao: {
                include: {
                    filme: true,
                },
            },
        },
    },
    alimentos: {
        include: {
            alimento: true,
        },
    },
};

const buildError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

const parseInteger = (value, field) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
        throw buildError(400, `O campo '${field}' deve ser um número inteiro válido.`);
    }
    return parsed;
};

class PedidoModel {
    #include = includeConfig;

    async findAll() {
        return prisma.pedido.findMany({
            orderBy: { createdAt: "desc" },
            include: this.#include,
        });
    }

    async findById(id) {
        return prisma.pedido.findUnique({
            where: { id: parseInteger(id, "id") },
            include: this.#include,
        });
    }

    async checkout({ sessaoId, assentosIds = [], alimentosIds = [], userId }) {
        if (sessaoId === undefined) {
            throw buildError(400, "O campo 'sessaoId' é obrigatório.");
        }
        if (!Array.isArray(assentosIds) || assentosIds.length === 0) {
            throw buildError(400, "Envie ao menos um assento em 'assentosIds'.");
        }
        if (!Array.isArray(alimentosIds)) {
            throw buildError(400, "O campo 'alimentosIds' deve ser um array.");
        }

        const normalizedSessaoId = parseInteger(sessaoId, "sessaoId");
        const normalizedAssentos = assentosIds.map((assentoId, index) => parseInteger(assentoId, `assentosIds[${index}]`));

        const seatSet = new Set(normalizedAssentos);
        if (seatSet.size !== normalizedAssentos.length) {
            throw buildError(400, "Há assentos duplicados no pedido.");
        }

        const normalizedAlimentos = alimentosIds.map((alimentoId, index) =>
            parseInteger(alimentoId, `alimentosIds[${index}]`)
        );

        let normalizedUserId = null;
        if (userId !== undefined && userId !== null) {
            normalizedUserId = parseInteger(userId, "userId");
        }

        const sessao = await prisma.sessao.findUnique({
            where: { id: normalizedSessaoId },
            include: {
                ingresso: true,
                sala: true,
            },
        });
        if (!sessao) {
            throw buildError(404, "Sessão não encontrada.");
        }

        if (normalizedUserId !== null) {
            const userExists = await prisma.user.findUnique({ where: { id: normalizedUserId } });
            if (!userExists) {
                throw buildError(404, "Usuário não encontrado.");
            }
        }

        const assentos = await prisma.assento.findMany({
            where: { id: { in: normalizedAssentos } },
            select: { id: true, salaId: true },
        });
        if (assentos.length !== normalizedAssentos.length) {
            throw buildError(400, "Um ou mais assentos não existem.");
        }

        const invalidAssento = assentos.find((assento) => assento.salaId !== sessao.salaId);
        if (invalidAssento) {
            throw buildError(400, `O assento ${invalidAssento.id} não pertence à sala da sessão.`);
        }

        const uniqueAlimentos = [...new Set(normalizedAlimentos)];
        const alimentos = uniqueAlimentos.length
            ? await prisma.alimento.findMany({ where: { id: { in: uniqueAlimentos } } })
            : [];
        if (alimentos.length !== uniqueAlimentos.length) {
            throw buildError(400, "Um ou mais alimentos não existem.");
        }
        const alimentoById = new Map(alimentos.map((alimento) => [alimento.id, alimento]));

        let precoTotal = new Prisma.Decimal(0);
        if (sessao.ingresso?.preco) {
            const ingressoValor = new Prisma.Decimal(sessao.ingresso.preco);
            precoTotal = precoTotal.plus(ingressoValor.times(normalizedAssentos.length));
        }
        for (const alimentoId of normalizedAlimentos) {
            const alimento = alimentoById.get(alimentoId);
            if (alimento) {
                precoTotal = precoTotal.plus(new Prisma.Decimal(alimento.preco));
            }
        }

        try {
            const pedidoCriado = await prisma.$transaction(async (tx) => {
                const pedido = await tx.pedido.create({
                    data: {
                        precoTotal,
                        status: "Pendente",
                        qrCode: randomUUID(),
                        userId: normalizedUserId,
                    },
                });

                for (const assentoId of normalizedAssentos) {
                    await tx.registroSessao.create({
                        data: {
                            pedidoId: pedido.id,
                            sessaoId: normalizedSessaoId,
                            assentoId,
                        },
                    });
                }

                for (const alimentoId of normalizedAlimentos) {
                    await tx.registroPedido.create({
                        data: {
                            pedidoId: pedido.id,
                            alimentoId,
                        },
                    });
                }

                return pedido;
            });

            return this.findById(pedidoCriado.id);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                throw buildError(409, "Algum dos assentos já foi reservado para esta sessão.");
            }
            throw error;
        }
    }

    async update(id, data) {
        const pedido = await this.findById(id);
        if (!pedido) {
            return null;
        }

        const payload = {};
        if (data.precoTotal !== undefined) payload.precoTotal = data.precoTotal;
        if (data.status !== undefined) payload.status = data.status;
        if (data.qrCode !== undefined) payload.qrCode = data.qrCode;

        if (Object.keys(payload).length === 0) {
            return pedido;
        }

        return prisma.pedido.update({
            where: { id: pedido.id },
            data: payload,
            include: this.#include,
        });
    }

    async delete(id) {
        const pedido = await this.findById(id);
        if (!pedido) return null;
        await prisma.pedido.delete({ where: { id: pedido.id } });
        return true;
    }
}

export default new PedidoModel();
