import SalaModel from "../models/salaModel.js";

class SalaController {
    // GET /api/salas
    async getAllSalas(req, res) {
        try {
            const salas = await SalaModel.findAll();
            res.json(salas);
        } catch (error) {
            console.error("Erro ao buscar salas:", error);
            res.status(500).json({ error: "Erro ao buscar salas" });
        }
    }

    // GET /api/salas/:id
    async getSalaById(req, res) {
        try {
            const { id } = req.params;
            const sala = await SalaModel.findById(id);
            if (!sala) {
                return res.status(404).json({ error: "Sala não encontrada" });
            }
            res.json(sala);
        } catch (error) {
            console.error("Erro ao buscar sala:", error);
            res.status(500).json({ error: "Erro ao buscar sala" });
        }
    }

    // POST /api/salas
    async createSala(req, res) {
        try {
            const { capacidade } = req.body;
            if (capacidade === undefined) {
                return res
                    .status(400)
                    .json({ error: "O campo 'capacidade' é obrigatório" });
            }
            const nova = await SalaModel.create(Number(capacidade));
            if (!nova) {
                return res.status(400).json({ error: "Erro ao criar sala" });
            }
            res.status(201).json(nova);
        } catch (error) {
            console.error("Erro ao criar sala:", error);
            res.status(500).json({ error: "Erro ao criar sala" });
        }
    }

    // PUT /api/salas/:id
    async updateSala(req, res) {
        try {
            const { id } = req.params;
            const { capacidade } = req.body;
            const atualizada = await SalaModel.update(id, capacidade);
            if (!atualizada) {
                return res.status(404).json({ error: "Sala não encontrada" });
            }
            res.json(atualizada);
        } catch (error) {
            console.error("Erro ao atualizar sala:", error);
            res.status(500).json({ error: "Erro ao atualizar sala" });
        }
    }

    // DELETE /api/salas/:id
    async deleteSala(req, res) {
        try {
            const { id } = req.params;
            const result = await SalaModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Sala não encontrada" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover sala:", error);
            res.status(500).json({ error: "Erro ao remover sala" });
        }
    }
}

export default new SalaController();
