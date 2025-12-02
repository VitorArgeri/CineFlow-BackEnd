import RegistroPedidoModel from "../models/registroPedidoModel.js";

class RegistroPedidoController {
    // GET /api/registros-pedido
    async getAllRegistrosPedido(req, res) {
        try {
            const registros = await RegistroPedidoModel.findAll();
            res.json(registros);
        } catch (error) {
            console.error("Erro ao buscar registros de pedido:", error);
            res.status(500).json({ error: "Erro ao buscar registros de pedido" });
        }
    }

    // GET /api/registros-pedido/:id
    async getRegistroPedidoById(req, res) {
        try {
            const { id } = req.params;
            const registro = await RegistroPedidoModel.findById(id);
            if (!registro) {
                return res.status(404).json({ error: "Registro de pedido não encontrado" });
            }
            res.json(registro);
        } catch (error) {
            console.error("Erro ao buscar registro de pedido:", error);
            res.status(500).json({ error: "Erro ao buscar registro de pedido" });
        }
    }

    // POST /api/registros-pedido
    async createRegistroPedido(req, res) {
        try {
            const { pedidoId, alimentoId } = req.body;
            if (pedidoId === undefined || alimentoId === undefined) {
                return res.status(400).json({
                    error: "Os campos 'pedidoId' e 'alimentoId' são obrigatórios",
                });
            }
            const novo = await RegistroPedidoModel.create(pedidoId, alimentoId);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar registro de pedido" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar registro de pedido:", error);
            res.status(500).json({ error: "Erro ao criar registro de pedido" });
        }
    }

    // PUT /api/registros-pedido/:id
    async updateRegistroPedido(req, res) {
        try {
            const { id } = req.params;
            const { pedidoId, alimentoId } = req.body;
            const atualizado = await RegistroPedidoModel.update(id, pedidoId, alimentoId);
            if (!atualizado) {
                return res.status(404).json({ error: "Registro de pedido não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar registro de pedido:", error);
            res.status(500).json({ error: "Erro ao atualizar registro de pedido" });
        }
    }

    // DELETE /api/registros-pedido/:id
    async deleteRegistroPedido(req, res) {
        try {
            const { id } = req.params;
            const result = await RegistroPedidoModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Registro de pedido não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover registro de pedido:", error);
            res.status(500).json({ error: "Erro ao remover registro de pedido" });
        }
    }
}

export default new RegistroPedidoController();
