import prisma from "../../prisma/prisma.js";

class RegistroPedidoModel {
    async findAll() {
        const registros = await prisma.registroPedido.findMany({
            orderBy: { createdAt: "desc" },
            include: { pedido: true, alimento: true },
        });
        return registros;
    }

    async findById(id) {
        const registro = await prisma.registroPedido.findUnique({
            where: { id: Number(id) },
            include: { pedido: true, alimento: true },
        });
        return registro;
    }

    async create(pedidoId, alimentoId) {
        const novo = await prisma.registroPedido.create({
            data: { pedidoId, alimentoId },
        });
        return novo;
    }

    async update(id, pedidoId, alimentoId) {
        const registro = await this.findById(id);
        if (!registro) return null;

        const data = {};
        if (pedidoId !== undefined) data.pedidoId = pedidoId;
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
