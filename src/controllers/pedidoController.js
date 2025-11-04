import PedidoModel from "../models/pedidoModel.js";

class PedidoController {
    // GET /api/pedidos
    async getAllPedidos(req, res) {
        try {
            const pedidos = await PedidoModel.findAll();
            res.json(pedidos);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            res.status(500).json({ error: "Erro ao buscar pedidos" });
        }
    }

    // GET /api/pedidos/:id
    async getPedidoById(req, res) {
        try {
            const { id } = req.params;
            const pedido = await PedidoModel.findById(id);
            if (!pedido) {
                return res.status(404).json({ error: "Pedido não encontrado" });
            }
            res.json(pedido);
        } catch (error) {
            console.error("Erro ao buscar pedido:", error);
            res.status(500).json({ error: "Erro ao buscar pedido" });
        }
    }

    // POST /api/pedidos
    async createPedido(req, res) {
        try {
            const { precoTotal, status, qrCode } = req.body;

            if (precoTotal === undefined || !status || !qrCode) {
                return res.status(400).json({
                    error: "Os campos 'precoTotal', 'status' e 'qrCode' são obrigatórios",
                });
            }

            const novoPedido = await PedidoModel.create(precoTotal, status, qrCode);
            if (!novoPedido) {
                return res.status(400).json({ error: "Erro ao criar pedido" });
            }

            res.status(201).json(novoPedido);
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            res.status(500).json({ error: "Erro ao criar pedido" });
        }
    }

    // PUT /api/pedidos/:id
    async updatePedido(req, res) {
        try {
            const { id } = req.params;
            const { precoTotal, status, qrCode } = req.body;

            const atualizado = await PedidoModel.update(id, precoTotal, status, qrCode);
            if (!atualizado) {
                return res.status(404).json({ error: "Pedido não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar pedido:", error);
            res.status(500).json({ error: "Erro ao atualizar pedido" });
        }
    }

    // DELETE /api/pedidos/:id
    async deletePedido(req, res) {
        try {
            const { id } = req.params;
            const result = await PedidoModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Pedido não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover pedido:", error);
            res.status(500).json({ error: "Erro ao remover pedido" });
        }
    }
}

export default new PedidoController();
