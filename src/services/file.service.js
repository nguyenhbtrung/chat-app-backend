import db from '../models/index.js';

const { File } = db;

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