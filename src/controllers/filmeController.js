import FilmeModel from "../models/filmeModel.js";

class FilmeController {
    // GET /api/filmes
    async getAllFilmes(req, res) {
        try {
            const filmes = await FilmeModel.findAll();
            res.json(filmes);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
            res.status(500).json({ error: "Erro ao buscar filmes" });
        }
    }

    // GET /api/filmes/:id
    async getFilmeById(req, res) {
        try {
            const { id } = req.params;
            const filme = await FilmeModel.findById(id);
            if (!filme) {
                return res.status(404).json({ error: "Filme não encontrado" });
            }
            res.json(filme);
        } catch (error) {
            console.error("Erro ao buscar filme:", error);
            res.status(500).json({ error: "Erro ao buscar filme" });
        }
    }

    // POST /api/filmes
    async createFilme(req, res) {
        try {
            const { nome, dataLancamento, genero, duracaoMinutos, avaliacao, imgUrl, classificacaoIndicativa, sinopse } = req.body;
            // Validate required fields: all must be present and non-empty
            if (!nome || !dataLancamento || !genero || !duracaoMinutos || !avaliacao || !imgUrl || !classificacaoIndicativa || !sinopse) {
                return res.status(400).json({
                    error: "Os campos 'nome', 'dataLancamento', 'genero', 'duracaoMinutos', 'avaliacao', 'imgUrl', 'classificacaoIndicativa' e 'sinopse' são obrigatórios",
                });
            }

            const novo = await FilmeModel.create(
                nome,
                dataLancamento,
                genero,
                duracaoMinutos,
                avaliacao,
                imgUrl,
                classificacaoIndicativa,
                sinopse
            );

            if (!novo) {
                return res.status(400).json({ error: "Erro ao criar filme" });
            }

            res.status(201).json(novo);
        } catch (error) {
            console.error("Erro ao criar filme:", error);
            res.status(500).json({ error: "Erro ao criar filme" });
        }
    }

    // PUT /api/filmes/:id
    async updateFilme(req, res) {
        try {
            const { id } = req.params;
            const { nome, dataLancamento, genero, duracaoMinutos, avaliacao, imgUrl, classificacaoIndicativa, sinopse } = req.body;

            const atualizado = await FilmeModel.update(
                id,
                nome,
                dataLancamento,
                genero,
                duracaoMinutos,
                avaliacao,
                imgUrl,
                classificacaoIndicativa,
                sinopse
            );

            if (!atualizado) {
                return res.status(404).json({ error: "Filme não encontrado" });
            }
            res.json(atualizado);
        } catch (error) {
            console.error("Erro ao atualizar filme:", error);
            res.status(500).json({ error: "Erro ao atualizar filme" });
        }
    }

    // DELETE /api/filmes/:id
    async deleteFilme(req, res) {
        try {
            const { id } = req.params;
            const result = await FilmeModel.delete(id);
            if (!result) {
                return res.status(404).json({ error: "Filme não encontrado" });
            }
            res.status(204).end();
        } catch (error) {
            console.error("Erro ao remover filme:", error);
            res.status(500).json({ error: "Erro ao remover filme" });
        }
    }
}

export default new FilmeController();
