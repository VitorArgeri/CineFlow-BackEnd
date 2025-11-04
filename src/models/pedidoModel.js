import prisma from "../../prisma/prisma.js";

class PedidoModel {
    async findAll() {
        const pedidos = await prisma.pedido.findMany({
            orderBy: { createdAt: "desc" },
            include: { registros: true },
        });
        return pedidos;
    }

    async findById(id) {
        const pedido = await prisma.pedido.findUnique({
            where: { id: Number(id) },
            include: { registros: true },
        });
        return pedido;
    }

    async create(precoTotal, status, qrCode) {
        const novoPedido = await prisma.pedido.create({
            data: { precoTotal, status, qrCode },
        });
        return novoPedido;
    }

    async update(id, precoTotal, status, qrCode) {
        const pedido = await this.findById(id);
        if (!pedido) return null;

        const data = {};
        if (precoTotal !== undefined) data.precoTotal = precoTotal;
        if (status !== undefined) data.status = status;
        if (qrCode !== undefined) data.qrCode = qrCode;

        const pedidoAtualizado = await prisma.pedido.update({
            where: { id: Number(id) },
            data,
        });
        return pedidoAtualizado;
    }

    async delete(id) {
        const pedido = await this.findById(id);
        if (!pedido) return null;
        await prisma.pedido.delete({ where: { id: Number(id) } });
        return true;
    }
}

export default new PedidoModel();
