import prisma from "../../prisma/prisma.js";

class AssentoModel {
    async findAll() {
        const assentos = await prisma.assento.findMany({
            orderBy: { createdAt: "desc" },
            include: { sala: true, registros: true },
        });
        return assentos;
    }

    async findById(id) {
        const assento = await prisma.assento.findUnique({
            where: { id: Number(id) },
            include: { sala: true, registros: true },
        });
        return assento;
    }

    async create(posicao, salaId, status) {
        const novo = await prisma.assento.create({
            data: { posicao, salaId, status },
        });
        return novo;
    }

    async update(id, posicao, salaId, status) {
        const assento = await this.findById(id);
        if (!assento) return null;

        const data = {};
        if (posicao !== undefined) data.posicao = posicao;
        if (salaId !== undefined) data.salaId = salaId;

        const atualizado = await prisma.assento.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const assento = await this.findById(id);
        if (!assento) return null;
        await prisma.assento.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new AssentoModel();
