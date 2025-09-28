import { join, extname, isAbsolute } from 'path';
import { existsSync, mkdirSync } from 'fs';
import multer, { diskStorage } from 'multer';

if (!process.env.UPLOADS_ROOT) {
    throw new Error("❌ Missing required environment variable: UPLOADS_ROOT");
}

const envPath = process.env.UPLOADS_ROOT;
const UPLOADS_ROOT = isAbsolute(envPath)
    ? envPath
    : join(process.cwd(), envPath);

// ensure uploads dir exists
if (!existsSync(UPLOADS_ROOT)) mkdirSync(UPLOADS_ROOT, { recursive: true });


const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_ROOT);
    },
    filename: (req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = extname(file.originalname) || '';
        cb(null, unique + ext);
    },
});


// optional file filter example (allow all for now)
const fileFilter = (req, file, cb) => {
    // e.g. only allow images: /image\//.test(file.mimetype)
    cb(null, true);
};


const limits = {
    fileSize: 10 * 1024 * 1024, // 10 MB
};


const upload = multer({ storage, fileFilter, limits });


export default { upload, UPLOADS_ROOT };