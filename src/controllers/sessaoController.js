import SessaoModel from "../models/sessaoModel.js";

class SessaoController {
    // GET /api/sessoes
    async getAllSessoes(req, res) {
        try {
            const sessoes = await SessaoModel.findAll();
            res.json(sessoes);
        } catch (error) {
            console.error("Erro ao buscar sessões:", error);
            res.status(500).json({ error: "Erro ao buscar sessões" });
        }
    }

    // GET /api/sessoes/:id
    async getSessaoById(req, res) {
        try {
            const { id } = req.params;
            const sessao = await SessaoModel.findById(id);
            if (!sessao) {
                return res.status(404).json({ error: "Sessão não encontrada" });
            }
            res.json(sessao);
        } catch (error) {
            console.error("Erro ao buscar sessão:", error);
            res.status(500).json({ error: "Erro ao buscar sessão" });
        }
    }

    // POST /api/sessoes
    async createSessao(req, res) {
        try {
            const { tipo, dublagem, salaId, filmeId, ingressoId, dataHora } = req.body;
            if (!tipo || !dublagem || salaId === undefined || filmeId === undefined || ingressoId === undefined || !dataHora) {
                return res.status(400).json({
                    error: "Os campos 'tipo', 'dublagem', 'salaId', 'filmeId', 'ingressoId' e 'dataHora' são obrigatórios",
                });
            }
            const nova = await SessaoModel.create(tipo, dublagem, salaId, filmeId, ingressoId, dataHora);
            if (!nova) {
                return res.status(400).json({ error: "Erro ao criar sessão" });
            }
            res.status(201).json(nova);
        } catch (error) {
            console.error("Erro ao criar sessão:", error);
            res.status(500).json({ error: "Erro ao criar sessão" });
        }
    }

    // PUT /api/sessoes/:id
    async updateSessao(req, res) {
        try {
            const { id } = req.params;
            const { tipo, dublagem, salaId, filmeId, ingressoId, dataHora } = req.body;
            const atualizada = await SessaoModel.update(id, tipo, dublagem, salaId, filmeId, ingressoId, dataHora);
            if (!atualizada) {
                return res.status(404).json({ error: "Sessão não encontrada" });
            }
            res.json(atualizada);
        } catch (error) {
            console.error("Erro ao atualizar sessão:", error);
            res.status(500).json({ error: "Erro ao atualizar sessão" });
        }
    }

    // DELETE /api/sessoes/:id
    async deleteSessao(req, res) {
        try {
            const { id } = req.params;
            const result = await SessaoModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Sessão não encontrada" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover sessão:", error);
            res.status(500).json({ error: "Erro ao remover sessão" });
        }
    }
}

export default new SessaoController();
