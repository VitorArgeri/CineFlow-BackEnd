import express from "express";
import SalaController from "../controllers/salaController.js";

const salaRouter = express.Router();

// GET /api/salas - Listar todas as salas
salaRouter.get("/", SalaController.getAllSalas);

// GET /api/salas/:id - Obter uma sala pelo ID
salaRouter.get("/:id", SalaController.getSalaById);

// POST /api/salas - Criar uma nova sala
salaRouter.post("/", SalaController.createSala);

// PUT /api/salas/:id - Atualizar uma sala
salaRouter.put("/:id", SalaController.updateSala);

// DELETE /api/salas/:id - Remover uma sala
salaRouter.delete("/:id", SalaController.deleteSala);

export default salaRouter;
