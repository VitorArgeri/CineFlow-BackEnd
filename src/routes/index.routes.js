import express from "express";

// Importar todas as rotas
import authRouter from "./auth.routes.js";
import pedidoRouter from "./pedidoRouter.js";
import filmeRouter from "./filmeRouter.js";
import salaRouter from "./salaRouter.js";
import sessaoRouter from "./sessaoRouter.js";
import assentoRouter from "./assentoRouter.js";
import alimentoRouter from "./alimentoRouter.js";
import registroPedidoRouter from "./registroPedidoRouter.js";
import registroSalaRouter from "./registroSalaRouter.js";
import registroSessaoRouter from "./registroSessaoRouter.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);
router.use("/pedidos", pedidoRouter);
router.use("/filmes", filmeRouter);
router.use("/salas", salaRouter);
router.use("/sessoes", sessaoRouter);
router.use("/assentos", assentoRouter);
router.use("/alimentos", alimentoRouter);
router.use("/registros-pedido", registroPedidoRouter);
router.use("/registros-sala", registroSalaRouter);
router.use("/registros-sessao", registroSessaoRouter);

// Rotas protegidas
router.use(authMiddleware);

export default router;