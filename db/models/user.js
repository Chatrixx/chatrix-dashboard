import mongoose from "mongoose";

const InstagramSchema = new mongoose.Schema({
  username: String,
  name: String,
  thread_id: String,
  messages: [{ type: mongoose.Schema.Types.Mixed }],
});

const WhatsappSchema = new mongoose.Schema({
  phone: String,
  name: String,
  username: String,
  messages: [{ type: mongoose.Schema.Types.Mixed }],
});

const ChannelsSchema = new mongoose.Schema({
  instagram: InstagramSchema,
  whatsapp: WhatsappSchema,
});

const TreatmentSchema = new mongoose.Schema({
  name: String,
  date: String,
  status: String,
});

const PortfolioSchema = new mongoose.Schema({
  appointmentCount: Number,
  appointments: [mongoose.Schema.Types.Mixed], // Empty array, could be expanded
  treatments: [TreatmentSchema],
});

const PatientSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  medicasimple: mongoose.Schema.Types.Mixed,
  initial_channel: String,
  channels: ChannelsSchema,
  portfolio: PortfolioSchema,
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
