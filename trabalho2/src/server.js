import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

import session from 'express-session';
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

import flash from 'connect-flash';
app.use(flash());

app.use((req, res, next) => {
  if (req.session.routes)
    req.session.routes.push(req.url);
  else
    req.session.routes = [req.url];

  console.log('SESSION ID ' + req.sessionID)
  console.log({ session: req.session })
  res.locals.errorMessage = req.flash('error');
  next();
})

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));    // ../public
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

import usersRouter from './routes/users.routes.js';
app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});