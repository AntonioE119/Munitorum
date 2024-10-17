import Faction from "../models/faction.model.js"
import Miniature from "../models/miniature.model.js"

const MiniatureController = {

  // CREATE
  // Enter a new miniature in the database that is associated with a specific faction
  createMiniature: async (req, res) => {
    try {
      const { factionId, miniatureData } = req.body;
      miniatureData.factions = [factionId]
      const newMiniature = await Miniature.create(miniatureData)

      // Updating the faction to include the new miniature
      await Faction.findByIdAndUpdate(
        factionId,
        // addToSet will prevent duplicates
        { $addToSet: { miniatures: newMiniature._id } },
        // This will return the updated document in the collection
        { new: true }
      );
      return res.status(202).json(newMiniature)
    }
    catch (err) {
      return res.status(500).json(err);
    }
  },

  // READ
  // Get one miniature by it's ID
  getMiniById: async (req, res) => {
    try {
      const id = req.params.id
      const oneMini = await Miniature.findById(id).populate('factions')
      return res.status(200).json(oneMini)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  },

  // UPDATE
  // Update one miniature by it's ID
  editMiniById: async (req, res) => {
    try {
      // This makes mongoose return the updated doc ather than the original and run validations on the update.
      const options = { new: true, runValidators: true }
      const updatedMini = await Miniature.findByIdAndUpdate(req.params.id, req.body, options)
      return res.status(201).json(updatedMini)
    }
    catch (err) {
      return res.status(400).json(err)
    }
  },

  // DELETE
  // Delete one miniature by it's ID
  deleteMiniById: async (req, res) => {
    try {
      const id = req.params.id;  
      // Find the miniature by its ID
      const miniToDelete = await Miniature.findById(id);
      // Remove the miniature from the associated faction
      await Faction.updateMany({ _id: { $in: miniToDelete.factions } },
        { $pull: { miniatures: id } }
      );
      // Now delete the miniature
      await Miniature.findByIdAndDelete(id);
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  }

};




export default MiniatureController;