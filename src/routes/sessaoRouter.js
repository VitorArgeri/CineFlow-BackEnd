import express from "express";
import SessaoController from "../controllers/sessaoController.js";

const sessaoRouter = express.Router();

// GET /api/sessoes - Listar todas as sessões
sessaoRouter.get("/", SessaoController.getAllSessoes);

// GET /api/sessoes/:id - Obter uma sessão pelo ID
sessaoRouter.get("/:id", SessaoController.getSessaoById);

// POST /api/sessoes - Criar uma nova sessão
sessaoRouter.post("/", SessaoController.createSessao);

// PUT /api/sessoes/:id - Atualizar uma sessão
sessaoRouter.put("/:id", SessaoController.updateSessao);

// DELETE /api/sessoes/:id - Remover uma sessão
sessaoRouter.delete("/:id", SessaoController.deleteSessao);

export default sessaoRouter;
