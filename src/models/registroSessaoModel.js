import prisma from "../../prisma/prisma.js";

class RegistroSessaoModel {
    async findAll() {
        const registros = await prisma.registroSessao.findMany({
            orderBy: { createdAt: "desc" },
            include: { sessao: true, assento: true },
        });
        return registros;
    }

    async findById(id) {
        const registro = await prisma.registroSessao.findUnique({
            where: { id: Number(id) },
            include: { sessao: true, assento: true },
        });
        return registro;
    }

    async create(sessaoId, assentoId) {
        const novo = await prisma.registroSessao.create({
            data: { sessaoId, assentoId },
        });
        return novo;
    }

    async update(id, sessaoId, assentoId) {
        const registro = await this.findById(id);
        if (!registro) return null;

        const data = {};
        if (sessaoId !== undefined) data.sessaoId = sessaoId;
        if (assentoId !== undefined) data.assentoId = assentoId;

        const atualizado = await prisma.registroSessao.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const registro = await this.findById(id);
        if (!registro) return null;
        await prisma.registroSessao.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new RegistroSessaoModel();
