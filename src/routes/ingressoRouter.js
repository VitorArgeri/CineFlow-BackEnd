import express from "express";
import IngressoController from "../controllers/ingressoController.js";

const ingressoRouter = express.Router();

// GET /api/ingressos - Listar todos os ingressos
ingressoRouter.get("/", IngressoController.getAllIngressos);

// GET /api/ingressos/:id - Obter um ingresso pelo ID
ingressoRouter.get("/:id", IngressoController.getIngressoById);

// POST /api/ingressos - Criar um novo ingresso
ingressoRouter.post("/", IngressoController.createIngresso);

// PUT /api/ingressos/:id - Atualizar um ingresso
ingressoRouter.put("/:id", IngressoController.updateIngresso);

// DELETE /api/ingressos/:id - Remover um ingresso
ingressoRouter.delete("/:id", IngressoController.deleteIngresso);

export default ingressoRouter;
