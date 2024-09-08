import fs from 'fs';
import path from 'path';

export default (req, res) => {
    const { username } = req.query;

    const filePath = path.join(process.cwd(), 'data', `${username}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    return res.json(data);
};
