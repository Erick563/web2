const usersDAO = require('../models/users.dao');

const usersController = {
    getIndex: (req, res) => {
        res.render('index');
    },
    getAll: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const resultado = usersDAO.findAll(page);
        res.render('users', resultado);
    },
    create: (req, res) => {
        const { name, cpf, password, profile } = req.body;
        if (!name || !cpf || !password || !profile) {
            req.flash('error', 'Nome, CPF, Senha e Perfil são obrigatórios.');
            return res.redirect('/');
        }

        const existingUser = usersDAO.findById(cpf);
        if (existingUser) {
            req.flash('error', 'Usuário já existe com este CPF.');
            return res.redirect('/');
        }

        usersDAO.insert({ name, cpf, password, profile });
        res.redirect('/');
    },
};

module.exports = usersController;