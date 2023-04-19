const { logger } = require("../common/log");
const { calcToken } = require("../common/auth");

const getCompany = async (request, response, pool) => {
  try {
    const result = await pool.query("SELECT * FROM company");
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

const insertCompany = async (request, response, pool) => {
  try {
    const { username, password, email, phone_number, address, register  } = request.body;
    await pool.query(
      "INSERT INTO company ( username, password, email, phone_number, address, register) values ($1, $2, $3, $4, $5, $6)",
      [ username, password, email, phone_number, address, register]
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

const updateCompany = async (request, response, pool) => {
  try {
    const { username, password, email, phone_number, address, register, id } = request.body;
    await pool.query(
      "UPDATE company SET username=COALESCE($1, username), password=COALESCE($2, password), email=COALESCE($3, email), phone_number=COALESCE($4, phone_number), address=COALESCE($5, address), register=COALESCE($6, register), where id = $7",
      [ username, password, email, phone_number, address, register, id]
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

const deleteCompany = async (request, response, pool) => {
  try {
    const { id } = request.body;
    console.log("id: ", id);
    await pool.query("DELETE FROM company WHERE id = $1", [id]);
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
  getCompany,
  insertCompany,
  deleteCompany,
  updateCompany
};
