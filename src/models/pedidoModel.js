import { randomUUID } from "crypto";
import prisma from "../../prisma/prisma.js";

const defaultInclude = {
ingressos: {
include: { assento: true, sessao: { include: { filme: true } } },
},
alimentos: {
include: { alimento: true },
},
};

class PedidoModel {
async findAll() {
return prisma.pedido.findMany({
orderBy: { createdAt: "desc" },
include: defaultInclude,
});
}

async findById(id) {
return prisma.pedido.findUnique({
where: { id: Number(id) },
include: defaultInclude,
});
}

async checkout({ sessaoId, assentosIds = [], alimentosIds = [], userId }) {
const sessao = await prisma.sessao.findUnique({
where: { id: Number(sessaoId) },
include: { ingresso: true },
});

if (!sessao) throw new Error("Sessão não encontrada.");

const alimentos = alimentosIds.length
? await prisma.alimento.findMany({ where: { id: { in: alimentosIds.map(Number) } } })
: [];

const precoIngresso = Number(sessao.ingresso?.preco || sessao.preco || 0);
const totalIngressos = precoIngresso * assentosIds.length;
const totalAlimentos = alimentos.reduce((acc, item) => acc + Number(item.preco), 0);

const novoPedido = await prisma.pedido.create({
data: {
precoTotal: totalIngressos + totalAlimentos,
status: "Pendente",
qrCode: randomUUID(),
userId: userId ? Number(userId) : null,
ingressos: {
create: assentosIds.map((id) => ({
sessaoId: Number(sessaoId),
assentoId: Number(id),
})),
},
alimentos: {
create: alimentosIds.map((id) => ({
alimentoId: Number(id),
})),
},
},
include: defaultInclude,
});

return novoPedido;
}

async update(id, data) {
return prisma.pedido.update({
where: { id: Number(id) },
data,
include: defaultInclude,
});
}

async delete(id) {
await prisma.pedido.delete({
where: { id: Number(id) },
});
return true;
}
}

export default new PedidoModel();