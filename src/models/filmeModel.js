import prisma from "../../prisma/prisma.js";

class FilmeModel {
    async findAll() {
        const filmes = await prisma.filme.findMany({
            orderBy: { createdAt: "desc" },
            include: { salas: true, sessoes: true, pedidos: true },
        });
        return filmes;
    }

    async findById(id) {
        const filme = await prisma.filme.findUnique({
            where: { id: Number(id) },
            include: { salas: true, sessoes: true, pedidos: true },
        });
        return filme;
    }

    async create(nome, dataLancamento, genero, duracaoMinutos, avaliacao) {
        const novo = await prisma.filme.create({
            data: { nome, dataLancamento, genero, duracaoMinutos, avaliacao },
        });
        return novo;
    }

    async update(id, nome, dataLancamento, genero, duracaoMinutos, avaliacao) {
        const filme = await this.findById(id);
        if (!filme) return null;

        const data = {};
        if (nome !== undefined) data.nome = nome;
        if (dataLancamento !== undefined) data.dataLancamento = dataLancamento;
        if (genero !== undefined) data.genero = genero;
        if (duracaoMinutos !== undefined) data.duracaoMinutos = duracaoMinutos;
        if (avaliacao !== undefined) data.avaliacao = avaliacao;

        const atualizado = await prisma.filme.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const filme = await this.findById(id);
        if (!filme) return null;
        await prisma.filme.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new FilmeModel();
