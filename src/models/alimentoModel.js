import prisma from "../../prisma/prisma.js";

class AlimentoModel {
    async findAll() {
        const alimentos = await prisma.alimento.findMany({
            orderBy: { createdAt: "desc" },
            include: { pedidos: true },
        });
        return alimentos;
    }

    async findById(id) {
        const alimento = await prisma.alimento.findUnique({
            where: { id: Number(id) },
            include: { pedidos: true },
        });
        return alimento;
    }

    async create(nome, preco, imgUrl) {
        const novo = await prisma.alimento.create({ data: { nome, preco, imgUrl } });
        return novo;
    }

    async update(id, nome, preco, imgUrl) {
        const alimento = await this.findById(id);
        if (!alimento) return null;

        const data = {};
        if (nome !== undefined) data.nome = nome;
        if (preco !== undefined) data.preco = preco;
        if (imgUrl !== undefined) data.imgUrl = imgUrl;

        const atualizado = await prisma.alimento.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const alimento = await this.findById(id);
        if (!alimento) return null;
        await prisma.alimento.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new AlimentoModel();
