import prisma from "../../prisma/prisma.js";

class SalaModel {
    async findAll() {
        const salas = await prisma.sala.findMany({
            orderBy: { createdAt: "desc" },
            include: { filmes: true, sessoes: true, assentos: true },
        });
        return salas;
    }

    async findById(id) {
        const sala = await prisma.sala.findUnique({
            where: { id: Number(id) },
            include: { filmes: true, sessoes: true, assentos: true },
        });
        return sala;
    }

    async create(capacidade) {
        const nova = await prisma.sala.create({ data: { capacidade } });
        return nova;
    }

    async update(id, capacidade) {
        const sala = await this.findById(id);
        if (!sala) return null;

        const data = {};
        if (capacidade !== undefined) data.capacidade = capacidade;

        const atualizada = await prisma.sala.update({
            where: { id: Number(id) },
            data,
        });
        return atualizada;
    }

    async delete(id) {
        const sala = await this.findById(id);
        if (!sala) return null;
        await prisma.sala.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new SalaModel();
