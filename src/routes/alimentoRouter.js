import express from "express";
import AlimentoController from "../controllers/alimentoController.js";

const alimentoRouter = express.Router();

// GET /api/alimentos - Listar todos os alimentos
alimentoRouter.get("/", AlimentoController.getAllAlimentos);

// GET /api/alimentos/:id - Obter um alimento pelo ID
alimentoRouter.get("/:id", AlimentoController.getAlimentoById);

// POST /api/alimentos - Criar um novo alimento
alimentoRouter.post("/", AlimentoController.createAlimento);

// PUT /api/alimentos/:id - Atualizar um alimento
alimentoRouter.put("/:id", AlimentoController.updateAlimento);

// DELETE /api/alimentos/:id - Remover um alimento
alimentoRouter.delete("/:id", AlimentoController.deleteAlimento);

export default alimentoRouter;
