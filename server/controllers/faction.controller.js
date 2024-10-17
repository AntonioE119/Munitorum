import Faction from "../models/faction.model.js";
import Miniature from "../models/miniature.model.js";

const FactionController = {
  create: async (req, res) => {
    try {
      const newFaction = await Faction.create(req.body);
      return res.status(201).json(newFaction);
    }
    catch(err) {
      res.status(500).json(err)
    }
  },

  getAllFactions: async (req, res) => {
    try {
      const allFactions = await Faction.find();
      return res.status(200).json(allFactions)
    }
    catch(err) {
      console.log(err);
      return res.status(500).json(err)
    }
  },

  getFactionById: async (req, res) => {
    try {
      const id = req.params.id
      const oneFaction = await Faction.findById(id).populate('miniatures')
      return res.status(200).json(oneFaction)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  },

  deleteFactionById: async (req, res) => {
    try {
      const id = req.params.id;
      // Find the faction by it's id
      const factionToDelete = await Faction.findById(id).populate('miniatures');
      // Delete the miniatures that are associated with the faction to be deleted
      await Miniature.deleteMany({_id: { $in: factionToDelete.miniatures } });
      // Now delete the faction
      await Faction.findByIdAndDelete(id);
      return res.status(204).send()
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }
}

export default FactionController;