import prisma from "../../prisma/prisma.js";

class RegistroPedidoModel {
    async findAll() {
        const registros = await prisma.registroPedido.findMany({
            orderBy: { createdAt: "desc" },
            include: { pedido: true, filme: true, alimento: true },
        });
        return registros;
    }

    async findById(id) {
        const registro = await prisma.registroPedido.findUnique({
            where: { id: Number(id) },
            include: { pedido: true, filme: true, alimento: true },
        });
        return registro;
    }

    async create(pedidoId, filmeId, alimentoId) {
        const novo = await prisma.registroPedido.create({
            data: { pedidoId, filmeId, alimentoId },
        });
        return novo;
    }

    async update(id, pedidoId, filmeId, alimentoId) {
        const registro = await this.findById(id);
        if (!registro) return null;

        const data = {};
        if (pedidoId !== undefined) data.pedidoId = pedidoId;
        if (filmeId !== undefined) data.filmeId = filmeId;
        if (alimentoId !== undefined) data.alimentoId = alimentoId;

        const atualizado = await prisma.registroPedido.update({
            where: { id: Number(id) },
            data,
        });
        return atualizado;
    }

    async delete(id) {
        const registro = await this.findById(id);
        if (!registro) return null;
        await prisma.registroPedido.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new RegistroPedidoModel();
