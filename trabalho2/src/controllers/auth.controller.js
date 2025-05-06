const db = require('better-sqlite3')('dados.db');

exports.login = (req, res) => {
    const { cpf, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE cpf = ? AND password = ?').get(cpf, password);

    if (user) {
        req.session.user = { cpf: user.cpf, perfil: user.perfil };
        res.redirect('/users');
    } else {
        req.flash('error', 'CPF ou senha inválidos.');
        res.redirect('/');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao encerrar a sessão.' });
        }
        res.redirect('/');
    });
};