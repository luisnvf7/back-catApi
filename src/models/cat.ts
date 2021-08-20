import { model, Schema } from "mongoose";
import { CatInterface } from "../interfaces/catinterface";

const catSchema = new Schema({
  breeds: [
    {
      id: String,
      name: String,
    },
  ],
  categories: [
    {
      id: String,
      name: String,
    },
  ],
  height: Number,
  id: String,
  url: String,
  width: Number,
});

export default model<CatInterface>("Cat", catSchema);
