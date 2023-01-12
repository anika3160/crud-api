import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const pathToReadFile = `${__dirname}/data.json`;

    try {
        const data = await fs.readFile(pathToReadFile, 'utf-8');
        return data;
    }
    catch(err) {
        throw new Error('FS operation failed')
    }
};

export default read;