import { Router } from 'express';
import FactionController from '../controllers/faction.controller.js';

const factionRouter = Router();

factionRouter.get('/factions', FactionController.getAllFactions)
factionRouter.post('/factions/create', FactionController.create)
factionRouter.get('/factions/:id', FactionController.getFactionById)
factionRouter.delete('/factions/:id', FactionController.deleteFactionById)

export default factionRouter;