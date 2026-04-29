import express from "express";
import Assessment from "../models/Assessment.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();


router.post('/create-assessment', upload.array('photos', 10), async (req, res) => {
    const files = req.files;
    const assessment = await Assessment.create({
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
        assessorName: req.body.assessorName,
    });
    res.status(201).json({ success: true, data: assessment, message: 'Assessment created successfully' })
})

router.get('/get-assessments', async (req, res) => {
    try {
        const [good, moderate, bad, total] = await Promise.all([
            Assessment.countDocuments({ farmCondition: 'Good' }),
            Assessment.countDocuments({ farmCondition: 'Moderate' }),
            Assessment.countDocuments({ farmCondition: 'Bad' }),
            Assessment.countDocuments(),
        ]);
        const assessments = await Assessment.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json({
            success: true, data: {
                counts: {
                    good,
                    moderate,
                    bad,
                    total
                },
                recentAssessments: assessments
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching assessments', error: error.message });
    }
});

export default router;