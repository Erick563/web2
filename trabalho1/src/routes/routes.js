const { Router } = require('express');
//const taskController = require('../controllers/tasks.controller');

const router = Router();
const Crypto = require('crypto');

// EX.01
router.get('/rotaInicio', (req, res) => {
    res.send("Bem vindo !!!");
});

// EX.02
router.get('/rotaDinamica/:nome', (req, res) => {
    const { nome } = req.params;
    res.send(`Bem vindo ${nome}!!!`);
});

// EX.03
const isAuth = (req, res, next) => {
    if (req.headers.authorization == '123')
        next();
    else
        return res.status(401).json({ error: 'Acesso não autorizado' });

}

const usuarios = [
    'Erick',
    'Vini',
    'Igor',
    'Marcio',
    'Marcos'
];

router.use('/usersComAuth', isAuth, (req, res) => {
    res.send(usuarios);
})

// EX.04
router.get('/users', (req, res) => {
    const userSearch = req.query.user;
    if (userSearch)
        res.send(usuarios.filter(user => user.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())));

    res.send(usuarios);

});

// EX.05
router.post('/users', isAuth, (req, res) => {
    req.body.id = Crypto.randomUUID();
    res.send(req.body);
});

// EX.06
const isValid = (req, res, next) => {
    const { name, email, age } = req.body;

    if (!name || name.length < 3 || name.length > 50)
        return res.status(400).json({ message: 'O nome deve ter entre 3 e 50 caracteres.' });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email))
        return res.status(400).json({ message: 'E-mail inválido.' });

    if (!age || age < 18)
        return res.status(400).json({ message: 'A idade deve ser maior que 18.' });

    next();
}

router.post('/usersComSchema', isValid, (req, res) => {
    res.send(req.body);
});

router.get('/erroProposital', isValid, (req, res) => {
    throw new Error("teste");
});

router.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo deu errado!')
})

module.exports = router;