import mongoose, { Schema, model, models } from "mongoose";

const ContactSXchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  message: { type: String, default: "" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const ContactX = models.ContactX || model("ContactX", ContactSXchema);
export default ContactX;
