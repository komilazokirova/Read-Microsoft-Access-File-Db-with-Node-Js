const express = require('express');
const cors = require('cors');
const ADODB = require('node-adodb');
const app = express();
const port = 3000;
app.use(cors());


const connection = ADODB.open('Provider=Microsoft.ACE.Oledb.12.0;Data Source=file.accdb;', process.arch.includes('64'));
app.get('/data', async (req, res) => {
    try {
        const data = await connection.query('SELECT * FROM inson');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error querying database');
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
