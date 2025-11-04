import express from "express";
import FilmeController from "../controllers/filmeController.js";

const filmeRouter = express.Router();

// GET /api/filmes - Listar todos os filmes
filmeRouter.get("/", FilmeController.getAllFilmes);

// GET /api/filmes/:id - Obter um filme pelo ID
filmeRouter.get("/:id", FilmeController.getFilmeById);

// POST /api/filmes - Criar um novo filme
filmeRouter.post("/", FilmeController.createFilme);

// PUT /api/filmes/:id - Atualizar um filme
filmeRouter.put("/:id", FilmeController.updateFilme);

// DELETE /api/filmes/:id - Remover um filme
filmeRouter.delete("/:id", FilmeController.deleteFilme);

export default filmeRouter;
