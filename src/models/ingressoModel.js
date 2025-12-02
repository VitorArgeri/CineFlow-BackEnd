import prisma from "../../prisma/prisma.js";

class IngressoModel {
    async findAll() {
        const ingressos = await prisma.ingresso.findMany({
            orderBy: { createdAt: "desc" },
            include: { sessoes: true },
        });
        return ingressos;
    }

    async findById(id) {
        const ingresso = await prisma.ingresso.findUnique({
            where: { id: Number(id) },
            include: { sessoes: true },
        });
        return ingresso;
    }

    async create( preco, tipo ) {
        const novo = await prisma.ingresso.create({ data: { preco, tipo }});
        return novo;
    }

    async update(id, preco, tipo ) {
        const ingresso = await this.findById(id);
        if (!ingresso) return null;

        const data = {};
        if (preco !== undefined) data.preco = preco;
        if (tipo !== undefined) data.tipo = tipo;

        const atualizado = await prisma.ingresso.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const ingresso = await this.findById(id);
        if (!ingresso) return null;
        await prisma.ingresso.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new IngressoModel();
