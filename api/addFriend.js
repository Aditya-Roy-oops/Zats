import fs from 'fs';
import path from 'path';

export default (req, res) => {
    const { username, friendUsername } = req.body;

    const userFilePath = path.join(process.cwd(), 'data', `${username}.json`);
    const friendFilePath = path.join(process.cwd(), 'data', `${friendUsername}.json`);

    const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
    const friendData = JSON.parse(fs.readFileSync(friendFilePath, 'utf-8'));

    userData.friends.push(friendUsername);
    friendData.friends.push(username);

    fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));
    fs.writeFileSync(friendFilePath, JSON.stringify(friendData, null, 2));

    return res.status(200).send('Friend Added');
};
