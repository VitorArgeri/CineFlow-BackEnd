import prisma from "../../prisma/prisma.js";

class RegistroSalaModel {
    async findAll() {
        const registros = await prisma.registroSala.findMany({
            orderBy: { createdAt: "desc" },
            include: { filme: true, sala: true },
        });
        return registros;
    }

    async findById(id) {
        const registro = await prisma.registroSala.findUnique({
            where: { id: Number(id) },
            include: { filme: true, sala: true },
        });
        return registro;
    }

    async create(filmeId, salaId) {
        const novo = await prisma.registroSala.create({
            data: { filmeId, salaId },
        });
        return novo;
    }

    async update(id, filmeId, salaId) {
        const registro = await this.findById(id);
        if (!registro) return null;

        const data = {};
        if (filmeId !== undefined) data.filmeId = filmeId;
        if (salaId !== undefined) data.salaId = salaId;

        const atualizado = await prisma.registroSala.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const registro = await this.findById(id);
        if (!registro) return null;
        await prisma.registroSala.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new RegistroSalaModel();
