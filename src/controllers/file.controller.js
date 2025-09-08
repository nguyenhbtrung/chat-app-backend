import { createFileRecord } from '../services/file.service.js';
import { unlink } from 'fs';

export const uploadSingle = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const { filename, originalname, size, mimetype } = req.file;
        const data = await createFileRecord({ filename, originalname, size, mimetype });
        return res.status(201).json({ data });
    } catch (error) {
        if (req.file && req.file.path) {
            unlink(req.file.path, () => { });
        }
        next(error);
    }
};