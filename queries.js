const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "123456",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, result) => {
    if (error) {throw error};
    response.status(200).json(result.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
    if (error) {throw error};
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    `INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING *`,
    (error, results) => {
      if (error) {throw error};
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    `UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`,
    (error, results) => {
      if (error) {throw error};
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
    if (error) {throw error};
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
