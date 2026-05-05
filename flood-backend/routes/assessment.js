import express from "express";
import Assessment from "../models/Assessment.js";
import { upload } from "../middlewares/upload.js";
import jwt from "jsonwebtoken";
const router = express.Router();


router.post('/create-assessment', upload.array('photos', 10), async (req, res) => {
    const { localId, ...rest } = req.body;
    const files = req.files;

    if (localId) {
        const existing = await Assessment.findOne({ localId });
        if (existing) {
            return res.status(200).json({ success: true, message: 'Already synced', data: existing });
        }
    }
    let assessorEmail = req.body.assessorEmail
    const token = req?.headers?.authorization?.split(' ')[1]
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        assessorEmail = decoded.email
    }

    const assessment = await Assessment.create({
        localId: req.body.localId,
        lat: req.body.lat,
        lng: req.body.lng,
        address: req.body.address,
        farmName: req.body.farmName,
        farmCondition: req.body.farmCondition,
        totalChicken: req.body.totalChicken,
        firmPhotos: files.map(file => ({
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
        })),
        notes: req.body.notes,
        assessorEmail,
    });
    res.status(201).json({ success: true, data: assessment, message: 'Assessment created successfully' })
})

router.get('/get-assessments', async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        if (status === 'mine') {
            const authHeader = req?.headers?.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                filter = { assessorEmail: decoded.email };
            } catch (err) {
                return res.status(401).json({ success: false, message: 'Invalid or expired token' });
            }
        }
        const [good, moderate, bad, total] = await Promise.all([
            Assessment.countDocuments({ ...filter, farmCondition: 'Good' }),
            Assessment.countDocuments({ ...filter, farmCondition: 'Moderate' }),
            Assessment.countDocuments({ ...filter, farmCondition: 'Bad' }),
            Assessment.countDocuments(filter),
        ]);
        const assessments = await Assessment.find(filter).sort({ createdAt: -1 }).limit(5);
        res.status(200).json({
            success: true,
            data: {
                counts: { good, moderate, bad, total },
                recentAssessments: assessments,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching assessments', error: error.message });
    }
});

router.get('/get-single-assessment', async (req, res) => {
    try {
        const { id } = req.query;
        const dataExist = await Assessment.findOne({ localId: id })
        return res.status(200).json({
            success: true,
            data: {
                address: dataExist.address,
                farmCondition: dataExist.farmCondition,
                totalChicken: dataExist.totalChicken,
                farmName: dataExist.farmName,
                notes: dataExist.notes,
                assessorEmail: dataExist.assessorEmail,
                firmPhotos: dataExist.firmPhotos,
                lat: dataExist.lat,
                lng: dataExist.lng
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching assessment', error: error.message });
    }

})

router.put('/update-assessment/:id', upload.array('photos', 10), async (req, res) => {
    try {
        const { id } = req.params;
        const { existingPhotoIds: existingRaw, ...rest } = req.body;
        const existingPhotoIds = existingRaw ? JSON.parse(existingRaw) : [];

        const dataExist = await Assessment.findOne({ localId: id });

        if (!dataExist) {
            return res.status(404).json({ success: false, message: "Assessment not found" });
        }

        const keptPhotos = dataExist.firmPhotos.filter((photo) =>
            existingPhotoIds.includes(photo._id.toString())
        );

        const newPhotos = req.files?.map((file) => ({
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
        })) || [];

        const finalPhotos = [...keptPhotos, ...newPhotos];

        const updateData = await Assessment.findByIdAndUpdate(
            dataExist._id,
            { $set: { ...rest, firmPhotos: finalPhotos } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Assessment updated successfully",
            data: updateData,
        });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
export default router;