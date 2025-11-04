import express from "express";
import RegistroSalaController from "../controllers/registroSalaController.js";

const registroSalaRouter = express.Router();

// GET /api/registros-sala - Listar todos os registros de sala
registroSalaRouter.get("/", RegistroSalaController.getAllRegistrosSala);

// GET /api/registros-sala/:id - Obter um registro pelo ID
registroSalaRouter.get("/:id", RegistroSalaController.getRegistroSalaById);

// POST /api/registros-sala - Criar um novo registro
registroSalaRouter.post("/", RegistroSalaController.createRegistroSala);

// PUT /api/registros-sala/:id - Atualizar um registro
registroSalaRouter.put("/:id", RegistroSalaController.updateRegistroSala);

// DELETE /api/registros-sala/:id - Remover um registro
registroSalaRouter.delete("/:id", RegistroSalaController.deleteRegistroSala);

export default registroSalaRouter;
