const db = require("../config/dbConnection");

const usersDAO = {

    findById(cpf) {
        const buscaUser = "SELECT * FROM users WHERE cpf = ?;";
        const user = db.prepare(buscaUser).get(cpf);
        if (!user) {
            return null;
        }
        return user;
    },
    findAll(page = 1, limit = 5) {
        const offset = (page - 1) * limit;

        // Consulta para obter os usuários com paginação
        const listaUsers = "SELECT * FROM users LIMIT ? OFFSET ?;";
        const users = db.prepare(listaUsers).all(limit, offset);

        // Consulta para contar o total de usuários
        const totalUsersQuery = "SELECT COUNT(*) AS total FROM users;";
        const totalUsers = db.prepare(totalUsersQuery).get().total;

        // Calcula o total de páginas
        const totalPages = Math.ceil(totalUsers / limit);

        return {
            users,
            currentPage: page,
            totalPages,
        };
    },
    insert(user) {
        const insereUser = "INSERT INTO users (cpf, name, password, profile) VALUES (?,?,?,?);"
        db.prepare(insereUser).run(user.cpf, user.name, user.password, user.profile);
    },

    findByFilter(filter) {
        const buscaUser = "SELECT * FROM users WHERE name LIKE ?;";
        return db.prepare(buscaUser).all(`%${filter}%`);
    }
}

module.exports = usersDAO;