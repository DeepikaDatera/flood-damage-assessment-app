import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    filename: String,
    path: String,
    mimetype: String,
});

const assessmentSchema = new mongoose.Schema({
    localId: { type: String, unique: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
    farmCondition: { type: String, required: true },
    farmName: { type: String, required: true },
    totalChicken: { type: Number, required: true },
    firmPhotos: [photoSchema],
    notes: { type: String },
    assessorEmail: { type: String, required: true },
}, { timestamps: true });

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;