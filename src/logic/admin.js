const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const login = async (request, response, pool) => {
  try {
    const { username, password } = request.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 and password = $2",
      [username, password]
    );

    const token = calcToken({ username });

    return response.status(200).json({
      data: result.rows[0],
      token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const getUsers = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return response.status(200).json({
      data: result.rows,
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const insertUser = async (request, response, pool) => {
  try {
    const { firstname, lastname, username, email, phone_number, password, bank_account, created_day, gender } = request.body;
    await pool.query(
      "INSERT INTO users (firstname, lastname, username, email, phone_number, password, bank_account, created_day, gender) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [firstname, lastname, username, email, phone_number, password, bank_account, created_day, gender]
    );
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const updateUser = async (request, response, pool) => {
  try {
    const { firstname, lastname, username, email, phone_number, password, bank_account, created_day, gender, id } = request.body;
    await pool.query(
      "UPDATE users SET firstname=COALESCE($1, firstname), lastname=COALESCE($2, lastname), username=COALESCE($3, username), email=COALESCE($4, email), phone_number=COALESCE($5, phone_number), password=COALESCE($6, password), bank_account=COALESCE($7, bank_account), created_day=COALESCE($8, created_day), gender=COALESCE($9, gender), where id = $10",
      [firstname, lastname, username, email, phone_number, password, bank_account, created_day, gender, id]
    );
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const deleteUser = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return response.status(200).json({
      message: "success",
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  login,
};
