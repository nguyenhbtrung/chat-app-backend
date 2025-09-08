import { FileNotFoundError } from '../errors/index.js';
import { basename, join } from 'path';
import db from '../models/index.js';
import multerConfig from '../config/multer.js';
import { promises } from 'fs';

const { File } = db;
const { UPLOADS_ROOT } = multerConfig;

export const createFileRecord = async ({ filename, originalname, size, mimetype }) => {
    const url = `/uploads/${filename}`;
    const record = await File.create({
        url,
        name: originalname,
        size,
        mimeType: mimetype,
    });
    return record;
};

export const deleteFileRecordAndPhysical = async (id) => {
    const file = await findFileById(id);
    if (!file)
        throw new FileNotFoundError();

    const fileName = basename(file.url);
    const filePath = join(UPLOADS_ROOT, fileName);

    try {
        await promises.unlink(filePath);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    await file.destroy();
};

export const findFileById = async (id) => {
    return await File.findByPk(id);
};