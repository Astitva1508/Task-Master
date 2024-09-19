require('dotenv').config();
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found')

const PORT = 3000;

app.use(express.static('./public'));
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.use('/api/v1/tasks', tasks);


// For the routes which cannot be resolved
app.use(notFound);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();

