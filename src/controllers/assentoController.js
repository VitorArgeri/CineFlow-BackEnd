import AssentoModel from "../models/assentoModel.js";

class AssentoController {
    // GET /api/assentos
    async getAllAssentos(req, res) {
        try {
            const assentos = await AssentoModel.findAll();
            res.json(assentos);
        } catch (error) {
            console.error("Erro ao buscar assentos:", error);
            res.status(500).json({ error: "Erro ao buscar assentos" });
        }
    }

    // GET /api/assentos/:id
    async getAssentoById(req, res) {
        try {
            const { id } = req.params;
            const assento = await AssentoModel.findById(id);
            if (!assento) {
                return res.status(404).json({ error: "Assento não encontrado" });
            }
            res.json(assento);
        } catch (error) {
            console.error("Erro ao buscar assento:", error);
            res.status(500).json({ error: "Erro ao buscar assento" });
        }
    }

    // POST /api/assentos
    async createAssento(req, res) {
        try {
            const { posicao, salaId, status } = req.body;
            if (!posicao || salaId === undefined) {
                return res.status(400).json({
                    error: "Os campos 'posicao' e 'salaId' são obrigatórios",
                });
            }

            const novo = await AssentoModel.create(posicao, salaId, status);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar assento" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar assento:", error);
            res.status(500).json({ error: "Erro ao criar assento" });
        }
    }

    // PUT /api/assentos/:id
    async updateAssento(req, res) {
        try {
            const { id } = req.params;
            const { posicao, salaId, status } = req.body;
            const atualizado = await AssentoModel.update(id, posicao, salaId, status);
            if (!atualizado) {
                return res.status(404).json({ error: "Assento não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar assento:", error);
            res.status(500).json({ error: "Erro ao atualizar assento" });
        }
    }

    // DELETE /api/assentos/:id
    async deleteAssento(req, res) {
        try {
            const { id } = req.params;
            const result = await AssentoModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Assento não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover assento:", error);
            res.status(500).json({ error: "Erro ao remover assento" });
        }
    }
}

export default new AssentoController();
