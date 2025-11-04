import RegistroSessaoModel from "../models/registroSessaoModel.js";

class RegistroSessaoController {
    // GET /api/registros-sessao
    async getAllRegistrosSessao(req, res) {
        try {
            const registros = await RegistroSessaoModel.findAll();
            res.json(registros);
        } catch (error) {
            console.error("Erro ao buscar registros de sessão:", error);
            res.status(500).json({ error: "Erro ao buscar registros de sessão" });
        }
    }

    // GET /api/registros-sessao/:id
    async getRegistroSessaoById(req, res) {
        try {
            const { id } = req.params;
            const registro = await RegistroSessaoModel.findById(id);
            if (!registro) {
                return res.status(404).json({ error: "Registro de sessão não encontrado" });
            }
            res.json(registro);
        } catch (error) {
            console.error("Erro ao buscar registro de sessão:", error);
            res.status(500).json({ error: "Erro ao buscar registro de sessão" });
        }
    }

    // POST /api/registros-sessao
    async createRegistroSessao(req, res) {
        try {
            const { sessaoId, assentoId } = req.body;
            if (sessaoId === undefined || assentoId === undefined) {
                return res.status(400).json({
                    error: "Os campos 'sessaoId' e 'assentoId' são obrigatórios",
                });
            }
            const novo = await RegistroSessaoModel.create(sessaoId, assentoId);
            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar registro de sessão" });
            }
            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar registro de sessão:", error);
            res.status(500).json({ error: "Erro ao criar registro de sessão" });
        }
    }

    // PUT /api/registros-sessao/:id
    async updateRegistroSessao(req, res) {
        try {
            const { id } = req.params;
            const { sessaoId, assentoId } = req.body;
            const atualizado = await RegistroSessaoModel.update(id, sessaoId, assentoId);
            if (!atualizado) {
                return res.status(404).json({ error: "Registro de sessão não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar registro de sessão:", error);
            res.status(500).json({ error: "Erro ao atualizar registro de sessão" });
        }
    }

    // DELETE /api/registros-sessao/:id
    async deleteRegistroSessao(req, res) {
        try {
            const { id } = req.params;
            const result = await RegistroSessaoModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Registro de sessão não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover registro de sessão:", error);
            res.status(500).json({ error: "Erro ao remover registro de sessão" });
        }
    }
}

export default new RegistroSessaoController();
