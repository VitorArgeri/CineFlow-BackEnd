import express from "express";
import AssentoController from "../controllers/assentoController.js";

const assentoRouter = express.Router();

// GET /api/assentos - Listar todos os assentos
assentoRouter.get("/", AssentoController.getAllAssentos);

// GET /api/assentos/:id - Obter um assento pelo ID
assentoRouter.get("/:id", AssentoController.getAssentoById);

// POST /api/assentos - Criar um novo assento
assentoRouter.post("/", AssentoController.createAssento);

// PUT /api/assentos/:id - Atualizar um assento
assentoRouter.put("/:id", AssentoController.updateAssento);

// DELETE /api/assentos/:id - Remover um assento
assentoRouter.delete("/:id", AssentoController.deleteAssento);

export default assentoRouter;
