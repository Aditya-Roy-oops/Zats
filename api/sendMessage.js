import fs from 'fs';
import path from 'path';

export default (req, res) => {
    const { message, sender, receiver } = req.body;

    const receiverFilePath = path.join(process.cwd(), 'data', `${receiver}.json`);
    const data = JSON.parse(fs.readFileSync(receiverFilePath, 'utf-8'));
    
    data.messages.push({ from: sender, content: message });
    fs.writeFileSync(receiverFilePath, JSON.stringify(data, null, 2));

    return res.status(200).send('Message Sent');
};
