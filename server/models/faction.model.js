import mongoose, { model, Schema } from "mongoose";

// Set bluebrint for Factions collection in the database
const FactionSchema = new mongoose.Schema(
  {
    factionName: {
      type: String,
      required: [true, "Faction required"],
      minLength: [2, "Faction name must be at least 2 characters"],
      maxLength: [40, "Faction name cannot exceed 40 characters"]
    },
    allegiance: {
      type: String,
      required: [true, "Allegiance required"],
      enum: ['Space Marines','Imperium', 'Chaos', 'Xenos']
    },
    miniatures: [{type: mongoose.Schema.Types.ObjectId, ref: 'Miniature'}]
  }, {timestamps: true}
)

const Faction = model('Faction', FactionSchema)
export default Faction;