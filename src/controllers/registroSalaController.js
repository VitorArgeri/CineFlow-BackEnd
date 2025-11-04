import RegistroSalaModel from "../models/registroSalaModel.js";

class RegistroSalaController {
    // GET /api/registros-sala
    async getAllRegistrosSala(req, res) {
        try {
            const registros = await RegistroSalaModel.findAll();
            res.json(registros);
        } catch (error) {
            console.error("Erro ao buscar registros de sala:", error);
            res.status(500).json({ error: "Erro ao buscar registros de sala" });
        }
    }

    // GET /api/registros-sala/:id
    async getRegistroSalaById(req, res) {
        try {
            const { id } = req.params;
            const registro = await RegistroSalaModel.findById(id);
            if (!registro) {
                return res.status(404).json({ error: "Registro de sala não encontrado" });
            }
            res.json(registro);
        } catch (error) {
            console.error("Erro ao buscar registro de sala:", error);
            res.status(500).json({ error: "Erro ao buscar registro de sala" });
        }
    }

    // POST /api/registros-sala
    async createRegistroSala(req, res) {
        try {
            const { filmeId, salaId } = req.body;
            if (filmeId === undefined || salaId === undefined) {
                return res.status(400).json({
                    error: "Os campos 'filmeId' e 'salaId' são obrigatórios",
                });
            }
            const novo = await RegistroSalaModel.create(filmeId, salaId);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar registro de sala" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar registro de sala:", error);
            res.status(500).json({ error: "Erro ao criar registro de sala" });
        }
    }

    // PUT /api/registros-sala/:id
    async updateRegistroSala(req, res) {
        try {
            const { id } = req.params;
            const { filmeId, salaId } = req.body;
            const atualizado = await RegistroSalaModel.update(id, filmeId, salaId);
            if (!atualizado) {
                return res.status(404).json({ error: "Registro de sala não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar registro de sala:", error);
            res.status(500).json({ error: "Erro ao atualizar registro de sala" });
        }
    }

    // DELETE /api/registros-sala/:id
    async deleteRegistroSala(req, res) {
        try {
            const { id } = req.params;
            const result = await RegistroSalaModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Registro de sala não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover registro de sala:", error);
            res.status(500).json({ error: "Erro ao remover registro de sala" });
        }
    }
}

export default new RegistroSalaController();
