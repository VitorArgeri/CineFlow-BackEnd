import express from "express";
import RegistroSessaoController from "../controllers/registroSessaoController.js";

const registroSessaoRouter = express.Router();

// GET /api/registros-sessao - Listar todos os registros de sessão
registroSessaoRouter.get("/", RegistroSessaoController.getAllRegistrosSessao);

// GET /api/registros-sessao/:id - Obter um registro pelo ID
registroSessaoRouter.get("/:id", RegistroSessaoController.getRegistroSessaoById);

// POST /api/registros-sessao - Criar um novo registro
registroSessaoRouter.post("/", RegistroSessaoController.createRegistroSessao);

// PUT /api/registros-sessao/:id - Atualizar um registro
registroSessaoRouter.put("/:id", RegistroSessaoController.updateRegistroSessao);

// DELETE /api/registros-sessao/:id - Remover um registro
registroSessaoRouter.delete("/:id", RegistroSessaoController.deleteRegistroSessao);

export default registroSessaoRouter;
