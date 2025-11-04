import express from "express";
import RegistroPedidoController from "../controllers/registroPedidoController.js";

const registroPedidoRouter = express.Router();

// GET /api/registros-pedido - Listar todos os registros de pedido
registroPedidoRouter.get("/", RegistroPedidoController.getAllRegistrosPedido);

// GET /api/registros-pedido/:id - Obter um registro pelo ID
registroPedidoRouter.get("/:id", RegistroPedidoController.getRegistroPedidoById);

// POST /api/registros-pedido - Criar um novo registro
registroPedidoRouter.post("/", RegistroPedidoController.createRegistroPedido);

// PUT /api/registros-pedido/:id - Atualizar um registro
registroPedidoRouter.put("/:id", RegistroPedidoController.updateRegistroPedido);

// DELETE /api/registros-pedido/:id - Remover um registro
registroPedidoRouter.delete("/:id", RegistroPedidoController.deleteRegistroPedido);

export default registroPedidoRouter;
