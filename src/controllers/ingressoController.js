import IngressoModel from "../models/ingressoModel.js";

class IngressoController {
    // GET /api/ingressos
    async getAllIngressos(req, res) {
        try {
            const ingressos = await IngressoModel.findAll();
            res.json(ingressos);
        } catch (error) {
            console.error("Erro ao buscar ingressos:", error);
            res.status(500).json({ error: "Erro ao buscar ingressos" });
        }
    }

    // GET /api/ingressos/:id
    async getIngressoById(req, res) {
        try {
            const { id } = req.params;
            const ingresso = await IngressoModel.findById(id);
            if (!ingresso) {
                return res.status(404).json({ error: "Ingresso não encontrado" });
            }
            res.json(ingresso);
        } catch (error) {
            console.error("Erro ao buscar ingresso:", error);
            res.status(500).json({ error: "Erro ao buscar ingresso" });
        }
    }

    // POST /api/ingressos
    async createIngresso(req, res) {
        try {
            const { preco, tipo } = req.body;
            if (!preco || !tipo  === undefined) {
                return res
                    .status(400)
                    .json({ error: "Os campos 'preco' e 'tipo' são obrigatórios" });
            }
            const novo = await IngressoModel.create( preco, tipo );
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar ingresso" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar ingresso:", error);
            res.status(500).json({ error: "Erro ao criar ingresso" });
        }
    }

    // PUT /api/ingressos/:id
    async updateIngresso(req, res) {
        try {
            const { id } = req.params;
            const { preco, tipo } = req.body;
            const atualizado = await IngressoModel.update(id, preco, tipo );
            if (!atualizado) {
                return res.status(404).json({ error: "Ingresso não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar ingresso:", error);
            res.status(500).json({ error: "Erro ao atualizar ingresso" });
        }
    }

    // DELETE /api/ingressos/:id
    async deleteIngresso(req, res) {
        try {
            const { id } = req.params;
            const result = await IngressoModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Ingresso não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover ingresso:", error);
            res.status(500).json({ error: "Erro ao remover ingresso" });
        }
    }
}

export default new IngressoController();
