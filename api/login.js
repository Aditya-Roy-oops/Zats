export default (req, res) => {
    const { username, password } = req.body;

    const users = {
        user1: 'password1',
        user2: 'password2',
        user3: 'password3',
        user4: 'password4',
        user5: 'password5',
    };

    if (users[username] === password) {
        return res.json({ success: true });
    } else {
        return res.json({ success: false });
    }
};
