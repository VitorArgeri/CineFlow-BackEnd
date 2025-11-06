import AlimentoModel from "../models/alimentoModel.js";

class AlimentoController {
    // GET /api/alimentos
    async getAllAlimentos(req, res) {
        try {
            const alimentos = await AlimentoModel.findAll();
            res.json(alimentos);
        } catch (error) {
            console.error("Erro ao buscar alimentos:", error);
            res.status(500).json({ error: "Erro ao buscar alimentos" });
        }
    }

    // GET /api/alimentos/:id
    async getAlimentoById(req, res) {
        try {
            const { id } = req.params;
            const alimento = await AlimentoModel.findById(id);
            if (!alimento) {
                return res.status(404).json({ error: "Alimento não encontrado" });
            }
            res.json(alimento);
        } catch (error) {
            console.error("Erro ao buscar alimento:", error);
            res.status(500).json({ error: "Erro ao buscar alimento" });
        }
    }

    // POST /api/alimentos
    async createAlimento(req, res) {
        try {
            const { nome, preco, imgUrl } = req.body;
            if (!nome || !preco || !imgUrl === undefined) {
                return res
                    .status(400)
                    .json({ error: "Os campos 'nome', 'preco' e 'imgUrl' são obrigatórios" });
            }
            const novo = await AlimentoModel.create(nome, preco, imgUrl);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar alimento" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar alimento:", error);
            res.status(500).json({ error: "Erro ao criar alimento" });
        }
    }

    // PUT /api/alimentos/:id
    async updateAlimento(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco, imgUrl } = req.body;
            const atualizado = await AlimentoModel.update(id, nome, preco, imgUrl);
            if (!atualizado) {
                return res.status(404).json({ error: "Alimento não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar alimento:", error);
            res.status(500).json({ error: "Erro ao atualizar alimento" });
        }
    }

    // DELETE /api/alimentos/:id
    async deleteAlimento(req, res) {
        try {
            const { id } = req.params;
            const result = await AlimentoModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Alimento não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover alimento:", error);
            res.status(500).json({ error: "Erro ao remover alimento" });
        }
    }
}

export default new AlimentoController();
