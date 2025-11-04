import express from "express";
import PedidoController from "../controllers/pedidoController.js";

const pedidoRouter = express.Router();

// GET /api/pedidos - Listar todos os pedidos
pedidoRouter.get("/", PedidoController.getAllPedidos);

// GET /api/pedidos/:id - Obter um pedido pelo ID
pedidoRouter.get("/:id", PedidoController.getPedidoById);

// POST /api/pedidos - Criar um novo pedido
pedidoRouter.post("/", PedidoController.createPedido);

// PUT /api/pedidos/:id - Atualizar um pedido
pedidoRouter.put("/:id", PedidoController.updatePedido);

// DELETE /api/pedidos/:id - Remover um pedido
pedidoRouter.delete("/:id", PedidoController.deletePedido);

export default pedidoRouter;
