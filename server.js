const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Handle registration POST request
app.post('/register', (req, res) => {
    const user = req.body;
    console.log(user)
    // Read existing users from JSON file
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            let users = JSON.parse(data);
            users.push(user);

            // Update JSON file with new user
            fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send('Registration successful!');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
