const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const login = async (request, response, pool) => {
  try {
    const { username, password } = request.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1 and password=$2",
      [username, password ]
    );

    if(result && result.rows.length == 0){
      return response.status(401).json({
        message: 'Username or password is incorrect!',
        data: {},
        token:''
      })
    }
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

const getlogin = async (request, response, pool) => {
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

const insertusers = async (request, response, pool) => {
  try {
    const { username, password, email } = request.body;
    await pool.query(
      "INSERT INTO login (username, password, email) values ($1, $2, $3)",
      [username, password, email]
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

const updateusers = async (request, response, pool) => {
  try {
    const { username, password, email, id } = request.body;
    await pool.query(
      "UPDATE login SET username=COALESCE($1, username), password=COALESCE($2, password), email=COALESCE($3, email) where id = $4",
      [username, password, email, id]
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

const deleteusers = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM login WHERE id = $1", [id]);
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
  getlogin,
  insertusers,
  updateusers,
  deleteusers,
  login,
};
