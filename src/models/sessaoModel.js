import prisma from "../../prisma/prisma.js";

class SessaoModel {
    async findAll() {
        const sessoes = await prisma.sessao.findMany({
            orderBy: { createdAt: "desc" },
            include: { sala: true, filme: true, registros: true, ingresso: true },
        });
        return sessoes;
    }

    async findById(id) {
        const sessao = await prisma.sessao.findUnique({
            where: { id: Number(id) },
            include: { sala: true, filme: true, registros: true, ingresso: true },
        });
        return sessao;
    }

    async create(tipo, dublagem, salaId, filmeId, ingressoId, dataHora) {
        const nova = await prisma.sessao.create({
            data: { tipo, dublagem, salaId, filmeId, ingressoId, dataHora },
        });
        return nova;
    }

    async update(id, tipo, dublagem, salaId, filmeId, ingressoId, dataHora) {
        const sessao = await this.findById(id);
        if (!sessao) return null;

        const data = {};
        if (tipo !== undefined) data.tipo = tipo;
        if (dublagem !== undefined) data.dublagem = dublagem;
        if (salaId !== undefined) data.salaId = salaId;
        if (filmeId !== undefined) data.filmeId = filmeId;
        if (ingressoId !== undefined) data.ingressoId = ingressoId;
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
