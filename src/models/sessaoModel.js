import prisma from "../../prisma/prisma.js";

class SessaoModel {
    async findAll() {
        const sessoes = await prisma.sessao.findMany({
            orderBy: { createdAt: "desc" },
            include: { sala: true, filme: true, registros: true },
        });
        return sessoes;
    }

    async findById(id) {
        const sessao = await prisma.sessao.findUnique({
            where: { id: Number(id) },
            include: { sala: true, filme: true, registros: true },
        });
        return sessao;
    }

    async create(tipo, salaId, filmeId, dataHora) {
        const nova = await prisma.sessao.create({
            data: { tipo, salaId, filmeId, dataHora },
        });
        return nova;
    }

    async update(id, tipo, salaId, filmeId, dataHora) {
        const sessao = await this.findById(id);
        if (!sessao) return null;

        const data = {};
        if (tipo !== undefined) data.tipo = tipo;
        if (salaId !== undefined) data.salaId = salaId;
        if (filmeId !== undefined) data.filmeId = filmeId;
        if (dataHora !== undefined) data.dataHora = dataHora;

        const atualizada = await prisma.sessao.update({
            where: { id: Number(id) },
            data,
        });
        return atualizada;
    }

    async delete(id) {
        const sessao = await this.findById(id);
        if (!sessao) return null;
        await prisma.sessao.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new SessaoModel();
