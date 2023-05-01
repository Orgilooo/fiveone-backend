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
    const { firstname, lastname, password, email, phone_number, address, register  } = request.body;
    await pool.query(
      "INSERT INTO company ( firstname, lastname, password, email, phone_number, address, register) values ($1, $2, $3, $4, $5, $6, $7)",
      [ firstname, lastname, password, email, phone_number, address, register]
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
    const { firstname, lastname, password, email, phone_number, address, register, id } = request.body;
    await pool.query(
      "UPDATE company SET firstname=COALESCE($1, firstname), lastname=COALESCE($2, lastname), password=COALESCE($3, password), email=COALESCE($4, email), phone_number=COALESCE($5, phone_number), address=COALESCE($6, address), register=COALESCE($7, register) where id = $8",
      [ firstname, lastname, password, email, phone_number, address, register, id]
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
