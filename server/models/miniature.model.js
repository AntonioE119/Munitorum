import mongoose, { model, Schema } from "mongoose";

const MiniatureSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: [true, "Unit name required"],
      minLength: [2, "Unit name must be at least 2 characters"],
      maxLength: [255, "Unit name must not exceed 255 characters"]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity required"],
      min: [1, "Must have at least 1 model"],
      max: [255, "Cannot exceed 255 miniatures"]
    },
    pointsValue: {
      type: Number,
      min: [1, "Unit must be worth at least 1 point"]
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ['Epic Hero', 'Character', 'Battleline', 'Infantry', 'Mounted', 'Vehicle', 'Dedicated Transport', 'Fortification']
    },
    battleReady: {
      type: Boolean,
      required: [true, "Battle Ready required"],
      default: false
    },
    legends: {
      type: Boolean,
      required: [true, "Legends status required"],
      default: false
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    factions: [{ type: Schema.Types.ObjectId, ref: 'Faction'}]
  }, {timestamps: true}
)

const Miniature = model('Miniature', MiniatureSchema)
export default Miniature;