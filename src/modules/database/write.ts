import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async (data:string) => {
    const writeStream = fs.createWriteStream(`${__dirname}/data.json`);
    writeStream.write(data);
};

export default write;
