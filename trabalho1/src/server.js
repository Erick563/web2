const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const router = require('./routes/routes');
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});