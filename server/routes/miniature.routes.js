import { Router } from "express";
import MiniatureController from "../controllers/miniature.controller.js";

const miniatureRouter = Router();

miniatureRouter.post('/miniatures/create', MiniatureController.createMiniature)
miniatureRouter.get('/miniatures/:id', MiniatureController.getMiniById)
miniatureRouter.put('/miniatures/:id/edit', MiniatureController.editMiniById)
miniatureRouter.delete('/miniatures/:id/delete', MiniatureController.deleteMiniById)

export default miniatureRouter;